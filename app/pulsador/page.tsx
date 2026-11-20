"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

// Destino de /p/<código> (public/_redirects): el QR que muestra el anfitrión
// en la sala del Pulsador. Con la app instalada iOS abre la app directo; esto
// es para quien todavía no la tiene.

const APP_STORE = "https://apps.apple.com/app/id6835432271";

/** Mismo criterio que normalizeCode en la app: 4 letras. */
function normalizar(raw: string | null): string | null {
  if (!raw) return null;
  const code = raw.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
  return code.length === 4 ? code : null;
}

export default function Pulsador() {
  const [code, setCode] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setCode(normalizar(new URLSearchParams(window.location.search).get("code")));
    setListo(true);
  }, []);

  return (
    <SiteShell current="inicio">
      <div className="page-head">
        <span className="eyebrow">Pulsador · Varios equipos</span>
        <h1>Te esperan en una sala</h1>
        <p>
          {listo && !code
            ? "Ese QR no tiene un código de sala válido. Pedile al anfitrión que te lo muestre de nuevo."
            : "Abrí la sala en ¿Quién gana? con tu teléfono: cada uno toca el suyo y gana el que tocó antes. Si no tenés la app, instalala y volvé a escanear."}
        </p>
      </div>

      {listo && code ? (
        <>
          <p className="num" style={{ fontSize: "34px", letterSpacing: "0.18em" }}>
            {code}
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href={`quiengana://p/${code}`}>
              Abrir en la app
            </a>
            <a className="btn" href={APP_STORE}>
              Descargar la app
              <ArrowRight />
            </a>
          </div>
          <p style={{ marginTop: "18px", color: "var(--muted)", maxWidth: "52ch" }}>
            También podés abrir ¿Quién gana?, ir a Pulsador → Varios equipos y escribir el código. Si están en el
            mismo wifi y el anfitrión la hizo visible, la sala aparece sola.
          </p>
        </>
      ) : listo ? (
        <div className="hero__cta">
          <Link className="btn btn--solid" href="/">
            Ir al inicio
          </Link>
        </div>
      ) : null}
    </SiteShell>
  );
}
