'use client';
import React, { useEffect } from 'react';

/** ---------- Helpers: save/retrieve on client ---------- */
function setCookie(name: string, value: string, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
}

export function setFingerprintToken(token: string) {
  try {
    localStorage.setItem('fp_token', token);
    setCookie('fp_token', token);
  } catch {
    /* ignore */
  }
}

export function getFingerprintToken(): string | null {
  try {
    return localStorage.getItem('fp_token') || getCookie('fp_token') || null;
  } catch {
    return getCookie('fp_token') || null;
  }
}

export function setFingerprintHash(hash: string) {
  try {
    localStorage.setItem('fp_hash', hash);
    setCookie('fp_hash', hash);
  } catch {
    /* ignore */
  }
}
/** ------------------------------------------------------ */

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256Hex(input: string) {
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return toHex(hashBuffer);
}

/** Optional canvas fingerprint (privacy sensitive) */
function canvasFingerprint(): string {
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

/** Deterministic serialization: sort keys to avoid order differences */
function deterministicStringify(obj: Record<string, unknown>) {
  const keys = Object.keys(obj).sort();
  const kv = keys.map((k) => {
    const v = obj[k];
    return `${k}:${typeof v === 'object' ? JSON.stringify(v) : String(v)}`;
  });
  return kv.join('|');
}

export default function FingerprintClient({ sendToServer = false }: { sendToServer?: boolean }) {
  // Removed unused state variable 'fp'
  useEffect(() => {
    async function makeFingerprint() {
      // If you already have a stored token, you can bail early (optional)
      const existingToken = getFingerprintToken();
      if (existingToken && !sendToServer) {
        // You could still compute locally if you want, but we return early for speed.
        return;
      }

      // Collect properties (non-exhaustive). Add/remove as needed.
      const nav = navigator as Navigator & { hardwareConcurrency?: number; deviceMemory?: number };
      const raw: Record<string, unknown> = {
        ua: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
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
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
              return null;
            }
            const glCtx = gl as WebGLRenderingContext & {
              getExtension(name: string): unknown;
            };
            const dbg = glCtx.getExtension('WEBGL_debug_renderer_info');
            if (dbg) {
              return {
                vendor: glCtx.getParameter(dbg.UNMASKED_VENDOR_WEBGL),
                renderer: glCtx.getParameter(dbg.UNMASKED_RENDERER_WEBGL),
              };
            }
            return null;
          } catch {
            return null;
          }
        })(),
        // Optional privacy-sensitive canvas fingerprint (base64 of dataURL)
        canvas: canvasFingerprint(),
      };

      // Remove empty/nulls if you want
      Object.keys(raw).forEach((k) => {
        if (raw[k] === null || raw[k] === undefined) delete raw[k];
      });

      const serialized = deterministicStringify(raw);
      const hash = await sha256Hex(serialized);
      // Persist the raw hash locally if you want to re-use it
      setFingerprintHash(hash);

      if (sendToServer) {
        try {
          const res = await fetch('/api/fingerprint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hash }),
          });
          const data = await res.json();
          // Expecting { ok: true, serverToken: string, ... }
          if (res.ok && data?.serverToken) {
            setFingerprintToken(data.serverToken as string);
          }
        } catch (e) {
          // Swallow errors to avoid breaking UX
          console.error('Failed to store/consult fingerprint:', e);
        }
      }
    }

    makeFingerprint().catch(console.error);
  }, [sendToServer]);

  return <></>;
}
