"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

// Destino de /t/<código> (public/_redirects): el enlace con el que el
// anfitrión comparte un torneo. Sólo lectura, sin sesión: lee la RPC pública
// `torneo_publico` (supabase/migrations/20261130000000_torneo_compartido.sql
// en el repo de la app) y se refresca sola cada pocos segundos.
//
// El cuadro se dibuja igual que en la app (src/components/torneo-cuadro.tsx):
// una columna por ronda y cada llave a mitad de camino entre las dos que la
// alimentan.

const APP_STORE = "https://apps.apple.com/app/id6835432271";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

type Participante = { id: string; nombre: string; equipo?: { nombre: string } | null };
type Partido = {
  id: string;
  etapa: "liga" | "grupo" | "playoff" | "desempate";
  grupo?: number;
  ronda: number;
  llave?: string;
  pierna: 1 | 2;
  local: string;
  visitante: string;
  gl: number | null;
  gv: number | null;
  penales?: { l: number; v: number } | null;
};
type Llave = { id: string; ronda: number; pos: number; a: string | null; b: string | null; bye: boolean };
type Datos = {
  deporte: string;
  formato: { tipo: "liga" | "grupos" | "playoff"; grupos?: { clasificanPorGrupo: number } };
  fase: string;
  participantes: Participante[];
  grupos?: string[][] | null;
  partidos: Partido[];
  llaves?: Llave[] | null;
  campeon?: string | null;
};
type Torneo = { title: string; data: Datos; updated_at: string };

function normalizar(raw: string | null): string | null {
  if (!raw) return null;
  const code = raw.toUpperCase().replace(/[^0-9A-Z]/g, "");
  return code.length >= 6 && code.length <= 12 ? code : null;
}

const jugado = (p: Partido) => p.gl !== null && p.gv !== null;
const letra = (g: number) => String.fromCharCode(65 + g);

/** Tabla simple: 3 por ganar, 1 por empatar, después diferencia y goles. */
function tabla(ids: string[], partidos: Partido[]) {
  const filas = new Map(ids.map((id) => [id, { id, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }]));
  for (const p of partidos.filter(jugado)) {
    const l = filas.get(p.local);
    const v = filas.get(p.visitante);
    if (!l || !v) continue;
    l.pj++; v.pj++;
    l.gf += p.gl!; l.gc += p.gv!; v.gf += p.gv!; v.gc += p.gl!;
    if (p.gl! > p.gv!) { l.g++; v.p++; l.pts += 3; }
    else if (p.gl! < p.gv!) { v.g++; l.p++; v.pts += 3; }
    else { l.e++; v.e++; l.pts++; v.pts++; }
  }
  return [...filas.values()].sort(
    (a, b) => b.pts - a.pts || b.gf - b.gc - (a.gf - a.gc) || b.gf - a.gf,
  );
}

function ganadorLlave(l: Llave, partidos: Partido[]): string | null {
  if (l.bye) return l.a;
  const propios = partidos.filter((p) => p.llave === l.id);
  if (!l.a || !l.b || propios.length === 0 || !propios.every(jugado)) return null;
  let ga = 0, gb = 0, pa = 0, pb = 0;
  for (const p of propios) {
    const aLocal = p.local === l.a;
    ga += aLocal ? p.gl! : p.gv!;
    gb += aLocal ? p.gv! : p.gl!;
    if (p.penales) { pa += aLocal ? p.penales.l : p.penales.v; pb += aLocal ? p.penales.v : p.penales.l; }
  }
  if (ga !== gb) return ga > gb ? l.a : l.b;
  if (pa !== pb) return pa > pb ? l.a : l.b;
  return null;
}

function nombreRonda(r: number, total: number) {
  return ["Final", "Semifinal", "Cuartos de final", "Octavos de final", "16avos de final"][total - 1 - r] ?? `Ronda ${r + 1}`;
}

export default function TorneoPublico() {
  const [code, setCode] = useState<string | null>(null);
  const [torneo, setTorneo] = useState<Torneo | null>(null);
  const [estado, setEstado] = useState<"leyendo" | "listo" | "no-existe" | "error">("leyendo");

  const cargar = useCallback(async (c: string) => {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/torneo_publico`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ code: c }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const filas = (await r.json()) as Torneo[];
      if (!filas.length) return setEstado("no-existe");
      setTorneo(filas[0]);
      setEstado("listo");
    } catch {
      setEstado((e) => (e === "listo" ? e : "error"));
    }
  }, []);

  useEffect(() => {
    const c = normalizar(new URLSearchParams(window.location.search).get("code"));
    setCode(c);
    if (!c) return setEstado("no-existe");
    cargar(c);
    // En vivo, sin sesión ni websockets: alcanza con mirar cada 15 segundos.
    const h = setInterval(() => document.visibilityState === "visible" && cargar(c), 15_000);
    return () => clearInterval(h);
  }, [cargar]);

  const d = torneo?.data;
  const nombre = (id: string | null) => (id ? d?.participantes.find((p) => p.id === id)?.nombre ?? "—" : "A definir");
  const campeon = d?.campeon ? nombre(d.campeon) : null;

  return (
    <SiteShell current="inicio">
      <div className="page-head">
        <span className="eyebrow">Torneo · se actualiza solo</span>
        <h1>{torneo?.title ?? (estado === "leyendo" ? "Cargando…" : "Torneo")}</h1>
        {estado === "no-existe" ? (
          <p>Este enlace no corresponde a ningún torneo. Pedile al anfitrión que lo vuelva a compartir.</p>
        ) : estado === "error" ? (
          <p>No pudimos traer el torneo. Revisá la conexión y recargá la página.</p>
        ) : (
          <p>Seguilo en vivo acá o abrilo en la app para tenerlo a mano.</p>
        )}
        {code && estado !== "no-existe" ? (
          <div className="hero__cta">
            <a className="btn btn--solid" href={`quiengana://t/${code}`}>Abrir en la app</a>
            <a className="btn" href={APP_STORE}>Descargar la app<ArrowRight /></a>
          </div>
        ) : estado === "no-existe" ? (
          <div className="hero__cta"><Link className="btn btn--solid" href="/">Ir al inicio</Link></div>
        ) : null}
      </div>

      {d ? (
        <div className="torneo">
          {campeon ? (
            <div className="torneo__campeon">
              <span className="eyebrow">Campeón</span>
              <strong>{campeon}</strong>
            </div>
          ) : null}

          {d.formato.tipo === "liga" ? (
            <Tabla titulo="Tabla" filas={tabla(d.participantes.map((p) => p.id), d.partidos.filter((p) => p.etapa === "liga"))} nombre={nombre} />
          ) : null}

          {d.formato.tipo === "grupos" && d.grupos?.length ? (
            <section className="torneo__grupos">
              {d.grupos.map((ids, g) => (
                <Tabla
                  key={g}
                  titulo={`Grupo ${letra(g)}`}
                  filas={tabla(ids, d.partidos.filter((p) => p.etapa === "grupo" && p.grupo === g))}
                  nombre={nombre}
                  clasifican={d.formato.grupos?.clasificanPorGrupo}
                />
              ))}
            </section>
          ) : null}

          {d.llaves?.length ? <Cuadro llaves={d.llaves} partidos={d.partidos} nombre={nombre} /> : null}
        </div>
      ) : null}
    </SiteShell>
  );
}

function Tabla({
  titulo,
  filas,
  nombre,
  clasifican,
}: {
  titulo: string;
  filas: ReturnType<typeof tabla>;
  nombre: (id: string) => string;
  clasifican?: number;
}) {
  return (
    <div className="torneo__tabla">
      <h3>{titulo}</h3>
      <table>
        <thead>
          <tr><th>#</th><th className="nombre">Equipo</th><th>PJ</th><th>DG</th><th>Pts</th></tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={f.id} className={clasifican && i < clasifican ? "clasifica" : undefined}>
              <td>{i + 1}</td>
              <td className="nombre">{nombre(f.id)}</td>
              <td>{f.pj}</td>
              <td>{f.gf - f.gc > 0 ? `+${f.gf - f.gc}` : f.gf - f.gc}</td>
              <td><strong>{f.pts}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const COL = 190, GAP = 40, CARD = 72, SEP = 14, HEAD = 30;

function Cuadro({ llaves, partidos, nombre }: { llaves: Llave[]; partidos: Partido[]; nombre: (id: string | null) => string }) {
  const total = Math.max(...llaves.map((l) => l.ronda)) + 1;
  const n0 = llaves.filter((l) => l.ronda === 0).length;
  const centros: number[][] = [Array.from({ length: n0 }, (_, i) => i * (CARD + SEP) + CARD / 2)];
  for (let r = 1; r < total; r++) {
    const prev = centros[r - 1];
    centros.push(Array.from({ length: prev.length / 2 }, (_, i) => (prev[2 * i] + prev[2 * i + 1]) / 2));
  }
  const alto = HEAD + n0 * (CARD + SEP) - SEP;
  const ancho = total * COL + (total - 1) * GAP;
  const x = (r: number) => r * (COL + GAP);
  const llave = (r: number, pos: number) => llaves.find((l) => l.ronda === r && l.pos === pos);

  const lineas: { d: string; fuerte: boolean }[] = [];
  for (let r = 1; r < total; r++) {
    centros[r].forEach((cy, pos) => {
      const destino = llave(r, pos);
      [2 * pos, 2 * pos + 1].forEach((hijo, lado) => {
        const origen = llave(r - 1, hijo);
        const g = origen ? ganadorLlave(origen, partidos) : null;
        const llego = lado === 0 ? destino?.a : destino?.b;
        const x1 = x(r - 1) + COL;
        lineas.push({
          d: `M${x1} ${HEAD + centros[r - 1][hijo]} H${x1 + GAP / 2} V${HEAD + cy} H${x(r)}`,
          fuerte: !!g && g === llego,
        });
      });
    });
  }

  return (
    <section className="torneo__cuadro">
      <h3>Cuadro</h3>
      <div className="cuadro" role="img" aria-label="Cuadro del playoff">
        <div className="cuadro__lienzo" style={{ width: ancho, height: alto }}>
          <svg width={ancho} height={alto} aria-hidden="true">
            {lineas.map((l, i) => (
              <path key={i} d={l.d} className={l.fuerte ? "fuerte" : undefined} />
            ))}
          </svg>
          {Array.from({ length: total }, (_, r) => (
            <span key={r} className="cuadro__ronda" style={{ left: x(r), width: COL }}>{nombreRonda(r, total)}</span>
          ))}
          {llaves.map((l) => {
            const g = ganadorLlave(l, partidos);
            const propios = partidos.filter((p) => p.llave === l.id && jugado(p));
            const goles = (id: string | null) =>
              propios.reduce((s, p) => s + (p.local === id ? p.gl! : p.visitante === id ? p.gv! : 0), 0);
            return (
              <div key={l.id} className="cuadro__llave" style={{ left: x(l.ronda), top: HEAD + centros[l.ronda][l.pos] - CARD / 2, width: COL, height: CARD }}>
                {[l.a, l.bye ? null : l.b].map((id, i) =>
                  i === 1 && l.bye ? (
                    <span key={i} className="cuadro__bye">Pasa directo</span>
                  ) : (
                    <span key={i} className={`cuadro__fila${g && g === id ? " gana" : g ? " pierde" : ""}`}>
                      <span className="n">{nombre(id)}</span>
                      {propios.length ? <span className="g">{goles(id)}</span> : null}
                    </span>
                  ),
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
