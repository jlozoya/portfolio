'use client';
import React, { useEffect, useState } from 'react';
import AchievementReporter from './AchievementReporter';

const isBrowser = typeof window !== 'undefined';

/** Safer cookie helpers (SSR-guarded) */
function setCookie(name: string, value: string, days = 180) {
  if (!isBrowser) return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
}
function getCookie(name: string) {
  if (!isBrowser) return undefined;
  const v = document.cookie
    .split('; ')
    .find((r) => r.startsWith(`${name}=`))
    ?.split('=')[1];
  return v ? decodeURIComponent(v) : undefined;
}

/** Local storage + cookie helpers for fingerprint token/hash (SSR-guarded) */
function setFingerprintToken(token: string) {
  if (isBrowser) {
    try {
      localStorage.setItem('fp_token', token);
    } catch {}
  }
  setCookie('fp_token', token);
}

function getFingerprintToken(): string | null {
  if (!isBrowser) return null;
  try {
    return localStorage.getItem('fp_token') || getCookie('fp_token') || null;
  } catch {
    return getCookie('fp_token') || null;
  }
}

function setFingerprintHash(hash: string) {
  if (isBrowser) {
    try {
      localStorage.setItem('fp_hash', hash);
    } catch {}
  }
  setCookie('fp_hash', hash);
}

/** Hash helpers (only called in browser) */
function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return toHex(hashBuffer);
}

/** Optional canvas fingerprint (privacy sensitive) */
function canvasFingerprint(): string {
  if (!isBrowser) return '';
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Fingerprint!', 2, 2);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Fingerprint!', 4, 4);
    return canvas.toDataURL();
  } catch {
    return '';
  }
}

/** Stable stringify (recursively sorts object keys) */
function stableStringify(x: unknown): string {
  if (x === null || typeof x !== 'object') return String(x);
  if (Array.isArray(x)) return `[${x.map(stableStringify).join(',')}]`;
  const entries = Object.entries(x as Record<string, unknown>).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return `{${entries.map(([k, v]) => `${k}:${stableStringify(v)}`).join('|')}}`;
}

export default function FingerprintClient({ sendToServer = false }: { sendToServer?: boolean }) {
  // 🚫 Don't read cookies/storage here (SSR). Start null and hydrate in effects.
  const [serverToken, setServerToken] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  // Hydrate serverToken from storage/cookie on client
  useEffect(() => {
    if (!isBrowser) return;
    const t = getFingerprintToken();
    if (t) setServerToken(t);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    async function makeFingerprint() {
      // If token already present and we don't need server sync, skip for speed
      const existingToken = getFingerprintToken();
      if (existingToken && !sendToServer) return;

      // Collect properties
      const nav = navigator as Navigator & { hardwareConcurrency?: number; deviceMemory?: number };
      const raw: Record<string, unknown> = {
        ua: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: (navigator as any).doNotTrack ?? null,
        hardwareConcurrency: nav.hardwareConcurrency ?? null,
        deviceMemory: nav.deviceMemory ?? null,
        screen_width: screen?.width ?? null,
        screen_height: screen?.height ?? null,
        colorDepth: screen?.colorDepth ?? null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
        timezoneOffset: new Date().getTimezoneOffset(),
        webgl: (() => {
          try {
            const canvas = document.createElement('canvas');
            const gl = (canvas.getContext('webgl') ||
              canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
            if (!gl) return null;
            interface WEBGL_debug_renderer_info {
              UNMASKED_VENDOR_WEBGL: number;
              UNMASKED_RENDERER_WEBGL: number;
            }
            const dbg = gl.getExtension(
              'WEBGL_debug_renderer_info',
            ) as WEBGL_debug_renderer_info | null;
            if (dbg) {
              return {
                vendor: gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL),
              };
            }
            return null;
          } catch {
            return null;
          }
        })(),
        canvas: canvasFingerprint(),
      };

      // Drop null/undefined
      for (const k of Object.keys(raw)) {
        if (raw[k] === null || raw[k] === undefined) delete raw[k];
      }

      const serialized = stableStringify(raw);
      const h = await sha256Hex(serialized);
      setFingerprintHash(h);
      setHash(h);

      if (sendToServer) {
        try {
          const res = await fetch('/api/fingerprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hash: h }),
          });
          const data = await res.json();
          if (res.ok && data?.serverToken) {
            setServerToken(String(data.serverToken));
            setFingerprintToken(String(data.serverToken));
          }
        } catch (e) {
          // non-fatal
          console.error('Failed to store/consult fingerprint:', e);
        }
      }
    }

    // Run soon after interactivity
    const run = () => void makeFingerprint();
    if ('requestIdleCallback' in window)
      (window as any).requestIdleCallback(run, { timeout: 1500 });
    else setTimeout(run, 0);
  }, [sendToServer]);

  return (
    <>
      <AchievementReporter serverToken={serverToken ?? undefined} hash={hash ?? undefined} />
    </>
  );
}
