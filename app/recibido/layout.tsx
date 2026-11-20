import type { Metadata } from "next";

// La página es un componente de cliente (lee el token de la query), así que los
// metadatos viven acá. `no-referrer` no es decorativo: el token viaja en la URL
// y sin eso se filtraría por el Referer a cualquier recurso de afuera.
export const metadata: Metadata = {
  title: "¿Te llegó tu amigo invisible? — ¿Quién gana?",
  description: "Avisá que te llegó tu amigo invisible.",
  robots: { index: false },
  referrer: "no-referrer",
};

export default function RecibidoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
