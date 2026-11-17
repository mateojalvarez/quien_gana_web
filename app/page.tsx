import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { ArrowRight } from "@/components/icons";

const juegos = [
  {
    kind: "Cartas",
    name: "Corazones",
    desc: "Pedidos, bazas y bonus con las reglas ya armadas: rota el repartidor y el puntaje se cuenta solo.",
    img: "/assets/img/clay/corazon.webp",
  },
  {
    kind: "Libre",
    name: "Anotador",
    desc: "Puntos por ronda para cualquier juego. Cargás jugadores y los totales se calculan solos.",
    img: "/assets/img/clay/lapiz.webp",
  },
  {
    kind: "Azar",
    name: "Dados",
    desc: "Tocá los dados o el botón y tirá. Ninguno se cae abajo del sillón.",
    img: "/assets/img/clay/dado.webp",
  },
  {
    kind: "Rapidez",
    name: "Pulsador",
    desc: "Un teléfono, varios jugadores: el primero que toca su zona se queda con el turno.",
    img: "/assets/img/clay/pulsador.webp",
  },
  {
    kind: "Turnos",
    name: "Reloj de arena",
    desc: "Tiempo por turno, a la vista de todos. Elegís la duración y la pantalla no se apaga.",
    img: "/assets/img/clay/reloj-arena.webp",
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
    title: "Sin conexión",
    desc: "Todo funciona offline. Cuando vuelve la señal, se sincroniza solo.",
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
            <span className="chip num">v1.0</span>
          </div>
          <h1 id="titulo">
            ¿Quién <span className="mark">gana</span>?
          </h1>
          <p className="hero__lede">
            <strong>Anotador, Corazones, dados, pulsador y reloj de arena</strong> en una sola app.
            Para la sobremesa, la noche de juegos o la partida que nunca termina.
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
          <span className="eyebrow">Tus juegos · 5 de 5</span>
          <h2 id="h-juegos">Todo lo que va arriba de la mesa</h2>
        </div>
        <ul className="tools">
          {juegos.map((j) => (
            <li className="tool" key={j.name}>
              <span className="tool__kind">{j.kind}</span>
              <h3>{j.name}</h3>
              <p>{j.desc}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={j.img} alt="" aria-hidden="true" width={128} height={128} loading="lazy" />
            </li>
          ))}
        </ul>
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
