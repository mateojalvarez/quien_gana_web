"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteShell from "@/components/SiteShell";

// El botón "marcar como recibido" del correo del amigo invisible lleva acá.
//
// Abrir esta página no confirma nada: Outlook Safe Links, Proofpoint y Mimecast
// abren todos los enlaces de un correo para escanearlos, y si abrir confirmara,
// media oficina aparecería confirmada sola. Sólo el botón escribe.
//
// Por qué la página está acá y no en la propia Edge Function: el gateway de
// Supabase le reescribe el Content-Type a text/plain y le agrega nosniff a
// cualquier respuesta HTML de una función —a propósito, para que nadie use su
// dominio para armar un phishing— así que el navegador mostraría el código
// fuente. La función quedó como un POST que contesta JSON y acepta por CORS
// sólo este origen.

const ENDPOINT = "https://rbcchgquntdeeounhjwz.supabase.co/functions/v1/amigo-invisible-recibido";

/** El token es un HMAC de 32 bytes en base64url: 43 caracteres, ni uno más. */
function normalizar(raw: string | null): string | null {
  if (!raw) return null;
  return /^[A-Za-z0-9_-]{43}$/.test(raw) ? raw : null;
}

type Estado = "leyendo" | "preguntar" | "enviando" | "listo" | "ya" | "vencido" | "error";

const TEXTO: Record<Exclude<Estado, "leyendo" | "enviando">, { titulo: string; cuerpo: string }> = {
  preguntar: {
    titulo: "¿Te llegó tu amigo invisible?",
    cuerpo:
      "Tocá el botón y quien armó el sorteo va a ver que ya lo tenés. No le muestra a quién te tocó.",
  },
  listo: {
    titulo: "¡Listo!",
    cuerpo: "Quien armó el sorteo ya sabe que te llegó. Podés cerrar esta página.",
  },
  ya: {
    titulo: "Ya lo habías confirmado",
    cuerpo: "Quien armó el sorteo ya sabe que te llegó. Podés cerrar esta página.",
  },
  vencido: {
    titulo: "Este enlace ya no sirve",
    cuerpo:
      "Puede que el sorteo se haya borrado. Si te llegó tu amigo invisible, no hace falta hacer nada más.",
  },
  error: {
    titulo: "No se pudo avisar",
    cuerpo: "Probá de nuevo en un rato. Tu amigo invisible no cambia: esto es sólo el aviso.",
  },
};

export default function Recibido() {
  // En un export estático no hay prerender con query, así que se lee al montar.
  const [token, setToken] = useState<string | null>(null);
  const [estado, setEstado] = useState<Estado>("leyendo");

  useEffect(() => {
    const t = normalizar(new URLSearchParams(window.location.search).get("t"));
    setToken(t);
    setEstado(t ? "preguntar" : "vencido");
  }, []);

  async function confirmar() {
    if (!token) return;
    setEstado("enviando");
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      const d = (await r.json()) as { ok?: boolean; ya?: boolean; motivo?: string };
      if (d.ok) setEstado(d.ya ? "ya" : "listo");
      else if (d.motivo === "vencido") setEstado("vencido");
      else setEstado("error");
    } catch {
      // Sin conexión o la función caída. Se puede volver a intentar: el POST es
      // idempotente, confirmar dos veces no mueve la primera vez.
      setEstado("error");
    }
  }

  if (estado === "leyendo") {
    return (
      <SiteShell current="inicio">
        <div className="page-head">
          <span className="eyebrow">Amigo invisible</span>
        </div>
      </SiteShell>
    );
  }

  const enviando = estado === "enviando";
  const { titulo, cuerpo } = TEXTO[enviando ? "preguntar" : estado];
  const confirmado = estado === "listo" || estado === "ya";

  return (
    <SiteShell current="inicio">
      <div className="page-head">
        <span className="eyebrow">Amigo invisible</span>
        <h1>{titulo}</h1>
        <p>{cuerpo}</p>
      </div>

      {estado === "preguntar" || enviando ? (
        <div className="hero__cta">
          <button
            className="btn btn--solid"
            type="button"
            onClick={confirmar}
            disabled={enviando}
            aria-disabled={enviando || undefined}
          >
            {enviando ? "Avisando…" : "Sí, ya me llegó"}
          </button>
        </div>
      ) : null}

      {estado === "error" ? (
        <div className="hero__cta">
          <button className="btn btn--solid" type="button" onClick={confirmar}>
            Probar de nuevo
          </button>
        </div>
      ) : null}

      {confirmado || estado === "vencido" ? (
        <div className="hero__cta">
          <Link className="btn" href="/">
            Ir al inicio
          </Link>
        </div>
      ) : null}

      {confirmado ? (
        <div className="note" style={{ maxWidth: "52ch" }}>
          <p>
            Esto no le cuenta a nadie a quién te tocó: lo único que avisa es que el correo llegó a
            destino.
          </p>
        </div>
      ) : null}
    </SiteShell>
  );
}
