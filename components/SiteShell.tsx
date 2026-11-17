import Link from "next/link";

type Page = "inicio" | "soporte" | "privacidad";

function SiteHeader({ current }: { current: Page }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="¿Quién gana? — inicio">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/img/icono.webp" alt="" width={34} height={34} />
        ¿Quién gana?
      </Link>
      <nav className="nav" aria-label="Principal">
        <Link className="hide-sm" href="/#juegos">
          Juegos
        </Link>
        <Link href="/soporte/" aria-current={current === "soporte" ? "page" : undefined}>
          Soporte
        </Link>
        <Link href="/privacidad/" aria-current={current === "privacidad" ? "page" : undefined}>
          Privacidad
        </Link>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="num">© 2026 Mateo Álvarez · ¿Quién gana?</span>
      <nav aria-label="Pie">
        <Link href="/">Inicio</Link>
        <Link href="/soporte/">Soporte</Link>
        <Link href="/privacidad/">Privacidad</Link>
        <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a>
      </nav>
    </footer>
  );
}

export default function SiteShell({
  current,
  children,
}: {
  current: Page;
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="shell">
        <SiteHeader current={current} />
        <main id="contenido">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
