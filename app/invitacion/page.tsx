"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

// Esta página es el destino de /g/<código> (lo manda public/_redirects).
// El sitio es un export estático: no hay ruta dinámica posible, así que el
// código viaja como query y se lee en el navegador.

const APP_STORE = "https://apps.apple.com/app/id6835432271";

/** Mismo criterio que codeFromInput en la app: 10 alfanuméricos, sin guiones. */
function normalizar(raw: string | null): string | null {
  if (!raw) return null;
  const code = raw.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
  return code.length === 10 ? code : null;
}

export default function Invitacion() {
  // En un export estático no hay prerender con query, así que se lee al montar.
  const [code, setCode] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    setCode(normalizar(new URLSearchParams(window.location.search).get("code")));
    setListo(true);
  }, []);

  return (
    <SiteShell current="inicio">
      <div className="page-head">
        <span className="eyebrow">Invitación a un grupo</span>
        <h1>Te invitaron a jugar</h1>
        <p>
          {listo && !code
            ? "Ese enlace no tiene un código válido. Pedile al grupo que te mande uno nuevo."
            : "Abrí la invitación en ¿Quién gana? y vas a entrar al grupo. Si todavía no tenés la app, instalala y volvé a tocar el enlace."}
        </p>
      </div>

      {listo && code ? (
        <>
          <p className="num" style={{ fontSize: "26px", letterSpacing: "0.08em" }}>
            {code.replace(/(.{4})(?=.)/g, "$1-")}
          </p>
          <div className="hero__cta">
            {/* El esquema propio abre la app aunque los enlaces universales no
                estén activos todavía. Si la app no está instalada, iOS avisa
                que no pudo abrir la página: para eso está el botón de al lado. */}
            <a className="btn btn--solid" href={`quiengana://g/${code}`}>
              Abrir en la app
            </a>
            <a className="btn" href={APP_STORE}>
              Descargar la app
              <ArrowRight />
            </a>
          </div>
          <p style={{ marginTop: "18px", color: "var(--muted)", maxWidth: "52ch" }}>
            También podés abrir ¿Quién gana?, ir a Grupos y pegar el código a mano.
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
