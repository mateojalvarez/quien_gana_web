import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quien-gana.app"),
  title: "¿Quién gana? — Hub de mesa para iPhone",
  description:
    "Corazones, truco, generala, anotador libre, dados, reloj, pulsador y equipos en una sola app. Sin anuncios, funciona sin conexión y con modo oscuro.",
  icons: {
    icon: [{ url: "/assets/img/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/assets/img/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "¿Quién gana? — Hub de mesa",
    description:
      "Ocho juegos y herramientas de mesa en una sola app, con grupos para tus jugadores de siempre.",
    images: ["/assets/img/icono-512.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F2" },
    { media: "(prefers-color-scheme: dark)", color: "#151110" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
