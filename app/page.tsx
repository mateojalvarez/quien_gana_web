import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

type Juego = {
  kind: string;
  name: string;
  desc: string;
  img: string;
  tone: "mostaza" | "tomate" | "salvia" | "rosa" | "crema";
  grande?: boolean;
};

// Mismo catálogo, colores y orden que la pestaña Juegos de la app.
const juegos: Juego[] = [
  {
    kind: "Anotador",
    name: "Corazones",
    desc: "Pedidos, bazas y bonus con las reglas ya armadas: el puntaje se cuenta solo.",
    img: "/assets/img/clay/corazon.webp",
    tone: "mostaza",
    grande: true,
  },
  {
    kind: "Anotador",
    name: "Truco",
    desc: "A 15 o a 30, con fósforos. Y en la pantalla bloqueada: cantás desde ahí sin abrir la app.",
    img: "/assets/img/clay/carta-espada.webp",
    tone: "salvia",
    grande: true,
  },
  {
    kind: "Anotador",
    name: "Generala",
    desc: "Dados y planilla juntos: fijás los que te sirven y te sugiere dónde anotar.",
    img: "/assets/img/clay/dado.webp",
    tone: "crema",
  },
  {
    kind: "Libre",
    name: "Anotador libre",
    desc: "Puntos por ronda para cualquier juego. Los totales se calculan solos.",
    img: "/assets/img/clay/lapiz.webp",
    tone: "rosa",
  },
  {
    kind: "Azar",
    name: "Dados",
    desc: "De 4 a 20 caras, hasta seis a la vez. Ninguno se cae abajo del sillón.",
    img: "/assets/img/clay/dado.webp",
    tone: "tomate",
  },
  {
    kind: "Turnos",
    name: "Reloj",
    desc: "Turnos con cuenta regresiva, a la vista de todos. La pantalla no se apaga.",
    img: "/assets/img/clay/reloj-arena.webp",
    tone: "crema",
  },
  {
    kind: "Rapidez",
    name: "Pulsador",
    desc: "El primero que toca gana. En un teléfono o en varios, con una sala por código.",
    img: "/assets/img/clay/pulsador.webp",
    tone: "salvia",
  },
  {
    kind: "Organizar",
    name: "Equipos",
    desc: "Reparte a los jugadores al azar y respeta quiénes no pueden quedar juntos.",
    img: "/assets/img/clay/esferas.webp",
    tone: "rosa",
  },
];

const conQuien = [
  {
    title: "Grupos",
    desc: "Armás el grupo una vez e invitás por enlace o QR. Los nombres quedan cargados para todas las partidas.",
  },
  {
    title: "También sin cuenta",
    desc: "Podés sumar a alguien que no tiene la app: queda sólo en tu teléfono y no lo ve nadie más del grupo.",
  },
  {
    title: "Pulsador compartido",
    desc: "Abrís una sala con código y cada uno pulsa desde su teléfono, con los relojes sincronizados.",
  },
];

const datos = [
  {
    num: "0",
    title: "Registros obligatorios",
    desc: "Entrás como invitado y jugás. Si querés, después vinculás tu cuenta.",
  },
  {
    num: "2",
    title: "Formas de guardar",
    desc: "Con Apple o Google tus partidas se sincronizan y las ves en otro dispositivo.",
  },
  {
    num: "∞",
    title: "Partidas sin conexión",
    desc: "Anotás offline y se sincroniza solo. Los grupos y las salas del pulsador sí piden internet.",
  },
  {
    num: "0",
    title: "Anuncios y rastreo",
    desc: "No hay publicidad ni herramientas de seguimiento. Y tiene modo oscuro.",
  },
];

export default function Home() {
  return (
    <SiteShell current="inicio">
      <section className="hero" aria-labelledby="titulo">
        <div className="hero__text">
          <div className="hero__chips">
            <span className="chip chip--fill">Hub de mesa</span>
            <span className="chip">iPhone · iOS</span>
            <span className="chip num">8 juegos</span>
          </div>
          <h1 id="titulo">
            ¿Quién <span className="mark">gana</span>?
          </h1>
          <p className="hero__lede">
            <strong>Corazones, truco, generala, anotador libre, dados, reloj, pulsador y equipos</strong>{" "}
            en una sola app. Para la sobremesa, la noche de juegos o la partida que nunca termina.
          </p>
          <div className="hero__cta">
            <span className="btn btn--solid" aria-disabled="true">
              Próximamente en App Store
            </span>
            <Link className="btn" href="/soporte/">
              Ayuda y contacto
              <ArrowRight />
            </Link>
          </div>
        </div>
        <div className="hero__art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/clay/composicion.webp"
            alt="Figuras de arcilla: cartas, dados y esferas de colores"
            width={640}
            height={640}
          />
        </div>
      </section>

      <section className="section" id="juegos" aria-labelledby="h-juegos">
        <div className="section__head">
          <span className="eyebrow">Tus juegos · 8 de 8</span>
          <h2 id="h-juegos">Todo lo que va arriba de la mesa</h2>
        </div>
        <ul className="tools">
          {juegos.map((j) => (
            <li
              className={`tool tool--${j.tone}${j.grande ? " tool--lg" : ""}`}
              key={j.name}
            >
              <span className="tool__kind">{j.kind}</span>
              <h3>{j.name}</h3>
              <p>{j.desc}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={j.img} alt="" aria-hidden="true" width={128} height={128} loading="lazy" />
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="h-grupos">
        <div className="section__head">
          <span className="eyebrow">Con quién jugás</span>
          <h2 id="h-grupos">Los de siempre, ya cargados</h2>
          <p>
            Los grupos guardan a tus jugadores habituales, así no escribís los mismos nombres cada
            viernes.
          </p>
        </div>
        <div className="facts facts--3">
          {conQuien.map((c) => (
            <div className="fact" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="h-como">
        <div className="section__head">
          <span className="eyebrow">Cómo funciona</span>
          <h2 id="h-como">Simple, sin vueltas</h2>
        </div>
        <div className="facts">
          {datos.map((d) => (
            <div className="fact" key={d.title}>
              <span className="fact__num num">{d.num}</span>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="band" aria-label="Ayuda">
        <h2>¿Una duda, un error o una idea para la próxima versión?</h2>
        <Link className="btn" href="/soporte/">
          Ir a soporte
          <ArrowRight />
        </Link>
      </section>
    </SiteShell>
  );
}
