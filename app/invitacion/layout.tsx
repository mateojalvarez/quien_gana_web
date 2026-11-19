import type { Metadata } from "next";

// La página es un componente de cliente (lee el código de la query), así que
// los metadatos viven acá. No se indexa: cada visita es una invitación suelta.
export const metadata: Metadata = {
  title: "Invitación a un grupo — ¿Quién gana?",
  description: "Abrí tu invitación a un grupo de ¿Quién gana?",
  robots: { index: false },
};

export default function InvitacionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
