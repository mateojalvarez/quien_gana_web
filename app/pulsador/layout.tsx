import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sala del Pulsador — ¿Quién gana?",
  description: "Entrá a una sala del Pulsador de ¿Quién gana?",
  robots: { index: false },
};

export default function PulsadorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
