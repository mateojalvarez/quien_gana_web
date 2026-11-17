import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Mail } from "@/components/icons";

export const metadata: Metadata = {
  title: "Soporte — ¿Quién gana?",
  description:
    "Ayuda y contacto para la app ¿Quién gana?: cuentas, sincronización, partidas y eliminación de cuenta.",
};

const asunto = "mailto:contacto@quien-gana.app?subject=Soporte%20%C2%BFQui%C3%A9n%20gana%3F";

const temas = [
  ["cuenta", "Cuenta"],
  ["partidas", "Partidas"],
  ["juegos", "Juegos"],
  ["eliminar", "Eliminar cuenta"],
];

export default function Soporte() {
  return (
    <SiteShell current="soporte">
      <div className="page-head">
        <span className="eyebrow">Ayuda y contacto</span>
        <h1>Soporte</h1>
        <p>
          Si algo no anda, tenés una duda o una idea para la app, escribinos. Antes, fijate si la
          respuesta ya está acá abajo.
        </p>
      </div>

      <div className="contact">
        <div className="contact__card contact__card--accent">
          <span className="eyebrow">Escribinos</span>
          <a className="contact__email" href={asunto}>
            contacto@quien-gana.app
          </a>
          <div>
            <a className="btn" href={asunto}>
              <Mail />
              Enviar un email
            </a>
          </div>
        </div>
        <div className="contact__card contact__card--plain">
          <span className="eyebrow">Para ayudarte más rápido, contanos</span>
          <dl>
            <div>
              <dt>Versión</dt>
              <dd>La ves al pie de Ajustes (ej. v1.0.0).</dd>
            </div>
            <div>
              <dt>Dispositivo</dt>
              <dd>Modelo de iPhone y versión de iOS.</dd>
            </div>
            <div>
              <dt>Cuenta</dt>
              <dd>Invitado, Apple o Google.</dd>
            </div>
            <div>
              <dt>Qué pasó</dt>
              <dd>Qué hiciste, qué esperabas y qué viste. Una captura ayuda mucho.</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="section" aria-labelledby="h-faq">
        <div className="section__head">
          <span className="eyebrow">Preguntas frecuentes</span>
          <h2 id="h-faq">Lo que más nos preguntan</h2>
        </div>

        <div className="doc">
          <aside className="toc" aria-label="Temas">
            <ol>
              {temas.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="prose">
            <section id="cuenta">
              <h2>
                <span className="step">01</span>Cuenta
              </h2>
              <div className="faq">
                <details>
                  <summary>¿Necesito crear una cuenta para usar la app?</summary>
                  <div className="answer">
                    <p>
                      No. Podés entrar como invitado y usar todo. La cuenta (Apple o Google) sirve
                      para no perder tus partidas y verlas en otro dispositivo.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Empecé como invitado. ¿Cómo guardo mis partidas?</summary>
                  <div className="answer">
                    <p>
                      Andá a <strong>Ajustes</strong> y vinculá Apple o Google. Tus partidas de
                      invitado pasan a esa cuenta.
                    </p>
                    <p>
                      Ojo: si cerrás sesión siendo invitado sin vincular, las partidas de ese
                      dispositivo se pierden.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Me dice que ese Apple o Google “ya tiene una cuenta”.</summary>
                  <div className="answer">
                    <p>Significa que ya lo usaste para entrar antes. La app te ofrece dos opciones:</p>
                    <p>
                      <strong>Si sos invitado:</strong> entrás a esa cuenta y te llevás tus partidas
                      de invitado, que se suman a las que ya tenía.
                    </p>
                    <p>
                      <strong>Si ya tenés cuenta:</strong> podés combinar las dos. Las partidas pasan
                      a la cuenta en la que estás y la otra se elimina. Esto no se puede deshacer.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>Elegí “Ocultar mi email” con Apple. ¿Pasa algo?</summary>
                  <div className="answer">
                    <p>
                      No. Funciona igual. Apple nos da una dirección de reenvío en lugar de tu email
                      real.
                    </p>
                  </div>
                </details>
              </div>
            </section>

            <section id="partidas">
              <h2>
                <span className="step">02</span>Partidas
              </h2>
              <div className="faq">
                <details>
                  <summary>¿Funciona sin internet?</summary>
                  <div className="answer">
                    <p>
                      Sí. Todo se guarda primero en el teléfono. Cuando vuelve la conexión, las
                      partidas se sincronizan solas con tu cuenta.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>No veo mis partidas en otro dispositivo.</summary>
                  <div className="answer">
                    <p>
                      Revisá que en los dos hayas entrado con la <strong>misma</strong> cuenta (mismo
                      Apple o mismo Google) y que ambos tengan conexión. Abrí la app en el
                      dispositivo donde jugaste para que termine de sincronizar.
                    </p>
                    <p>Si estabas como invitado, primero vinculá una cuenta en Ajustes.</p>
                  </div>
                </details>
                <details>
                  <summary>Edité la misma partida en dos teléfonos. ¿Cuál queda?</summary>
                  <div className="answer">
                    <p>
                      Queda la versión modificada por última vez. Para evitar sorpresas, anotá cada
                      partida desde un solo dispositivo.
                    </p>
                  </div>
                </details>
              </div>
            </section>

            <section id="juegos">
              <h2>
                <span className="step">03</span>Juegos
              </h2>
              <div className="faq">
                <details>
                  <summary>¿Cómo se cuentan los puntos en Corazones?</summary>
                  <div className="answer">
                    <p>
                      Acertar tu pedido suma un base fijo más las bazas que hiciste; desde la ronda
                      de bonus, el base es mayor. Si no acertás, sumás sólo las bazas. El repartidor
                      rota cada ronda, pide último y no puede hacer que la suma de pedidos iguale
                      las cartas de la ronda.
                    </p>
                    <p>
                      Al crear la partida podés ajustar la cantidad de mazos, desde qué ronda corre
                      el bonus y cuántas rondas se juegan.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>¿Cómo funciona el Pulsador?</summary>
                  <div className="answer">
                    <p>
                      La pantalla se divide en una zona por jugador. Esperen a que diga{" "}
                      <strong>¡YA!</strong>: el primero que toca su zona se queda con el turno. Quien
                      toque antes de tiempo queda descalificado en esa ronda.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>La pantalla se apaga mientras corre el reloj.</summary>
                  <div className="answer">
                    <p>
                      El Reloj de arena y el Pulsador mantienen la pantalla encendida mientras están
                      abiertos. Si igual se apaga, revisá que el Modo de bajo consumo no esté
                      limitando el bloqueo automático.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>No siento la vibración.</summary>
                  <div className="answer">
                    <p>
                      La app usa la respuesta háptica del sistema. Verificá en Ajustes de iOS →
                      Sonidos y vibración que la “Respuesta háptica del sistema” esté activada.
                    </p>
                  </div>
                </details>
              </div>
            </section>

            <section id="eliminar">
              <h2>
                <span className="step">04</span>Eliminar cuenta
              </h2>
              <p>
                Desde la app: <strong>Ajustes → Eliminar cuenta</strong>. Se borran de forma
                definitiva tu cuenta y todas tus partidas. Si entraste con Apple, además revocamos
                el acceso de la app a tu Apple ID.
              </p>
              <p>
                Si ya no tenés la app instalada, escribinos a{" "}
                <a href="mailto:contacto@quien-gana.app?subject=Eliminar%20mi%20cuenta">
                  contacto@quien-gana.app
                </a>{" "}
                desde el email de tu cuenta y la borramos dentro de los 30 días.
              </p>
              <p>
                Más detalles en la <Link href="/privacidad/">Política de privacidad</Link>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
