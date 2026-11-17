import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Página no encontrada — ¿Quién gana?",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SiteShell current="inicio">
      <div className="notfound">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="notfound__art"
          src="/assets/img/clay/esfera-tomate.webp"
          alt=""
          aria-hidden="true"
          width={148}
          height={148}
        />
        <span className="eyebrow">Error 404</span>
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: "clamp(42px, 7vw, 74px)",
            lineHeight: 0.98,
            letterSpacing: "-0.04em",
          }}
        >
          Nadie gana acá.
        </h1>
        <p style={{ margin: 0, maxWidth: "46ch", fontSize: "18.5px", color: "var(--muted)" }}>
          Esta página no existe. Volvé al inicio o andá directo a soporte.
        </p>
        <div className="hero__cta">
          <Link className="btn btn--solid" href="/">
            Ir al inicio
          </Link>
          <Link className="btn" href="/soporte/">
            Soporte
            <ArrowRight />
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
