import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneo — ¿Quién gana?",
  description: "Seguí un torneo de ¿Quién gana?: tablas, partidos y cuadro en vivo.",
  robots: { index: false },
};

export default function TorneoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
