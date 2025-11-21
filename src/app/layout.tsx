import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'C.S.E. Juan Fernando Lozoya Valdez',
  description: "Fernando Lozoya's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/img/favicon.ico" sizes="any" />

        <meta
          name="google-site-verification"
          content="ihDso097s_g3PxYsbJ4uofVuFomY7J2o2HxJ1vyC2AU"
        />
        <meta
          name="keywords"
          content="tecnología, eventos, programacion, programación, full stack"
        />
        <meta
          name="description"
          content="On this page, you can find and explore specialized services in computer systems engineering, IT, and technology solutions."
        />

        <link rel="canonical" href="https://lozoya.org/" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Lozoya" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Lozoya" />
        <meta name="facebook-domain-verification" content="6u243x060k7j3aatlynkhe0uzcis13" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@JuanLozoyaV" />
        <meta name="twitter:creator" content="@JuanLozoyaV" />
        <meta name="twitter:title" content="Juan Fernando Lozoya Valdez" />
        <meta
          name="twitter:description"
          content="Full Stack Developer with strong expertise in frontend frameworks"
        />
        <meta
          name="twitter:image"
          content="https://lozoya.org/assets/img/juan-lozoya-banner-1200x630.png"
        />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:alt" content="Juan Fernando Lozoya Valdez" />

        <meta property="fb:app_id" content="1087778961384662" />
        <meta property="og:title" content="Juan Fernando Lozoya Valdez" />
        <meta property="og:site_name" content="lozoya.org" />
        <meta property="og:type" content="business" />
        <meta property="og:url" content="https://lozoya.org" />
        <meta
          property="og:description"
          content="Full Stack Developer with strong expertise in frontend frameworks"
        />
        <meta
          property="og:image:url"
          content="https://lozoya.org/assets/img/juan-lozoya-banner-1200x630.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://lozoya.org/assets/img/juan-lozoya-banner-1200x630.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Juan Fernando Lozoya Valdez" />
        <meta property="business:contact_data:locality" content="Durango" />
        <meta property="business:contact_data:postal_code" content="34000" />
        <meta property="business:contact_data:country_name" content="México" />

        <meta name="theme-color" content="#343a40" />
        <meta httpEquiv="Cache-control" content="public" max-age="2592000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
