import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { Mail } from "@/components/icons";

export const metadata: Metadata = {
  title: "Soporte — ¿Quién gana?",
  description:
    "Ayuda y contacto para la app ¿Quién gana?: cuentas, grupos, sincronización, juegos y eliminación de cuenta.",
};

const asunto = "mailto:contacto@quien-gana.app?subject=Soporte%20%C2%BFQui%C3%A9n%20gana%3F";

// El orden manda: de acá salen el índice y el número de cada tema.
const temas = [
  ["cuenta", "Cuenta"],
  ["grupos", "Grupos"],
  ["partidas", "Partidas"],
  ["juegos", "Juegos"],
  ["eliminar", "Eliminar cuenta"],
] as const;

type Id = (typeof temas)[number][0];

function Tema({ id, children }: { id: Id; children: React.ReactNode }) {
  const i = temas.findIndex((t) => t[0] === id);
  return (
    <section id={id}>
      <h2>
        <span className="step">{String(i + 1).padStart(2, "0")}</span>
        {temas[i][1]}
      </h2>
      {children}
    </section>
  );
}

function P({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details>
      <summary>{q}</summary>
      <div className="answer">{children}</div>
    </details>
  );
}

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
              <dd>La ves al pie de Perfil (ej. v1.0.0).</dd>
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
            <Tema id="cuenta">
              <div className="faq">
                <P q="¿Necesito crear una cuenta para usar la app?">
                  <p>
                    No. Podés entrar como invitado y jugar a todo. La cuenta (Apple o Google) sirve
                    para no perder tus partidas, verlas en otro dispositivo y armar grupos.
                  </p>
                </P>
                <P q="Empecé como invitado. ¿Cómo guardo mis partidas?">
                  <p>
                    Andá a <strong>Perfil</strong> y vinculá Apple o Google. Tus partidas de
                    invitado pasan a esa cuenta.
                  </p>
                  <p>
                    Ojo: si cerrás sesión siendo invitado sin vincular, las partidas de ese
                    dispositivo se pierden.
                  </p>
                </P>
                <P q="Me dice que ese Apple o Google “ya tiene una cuenta”.">
                  <p>Significa que ya lo usaste para entrar antes. La app te ofrece dos opciones:</p>
                  <p>
                    <strong>Si sos invitado:</strong> entrás a esa cuenta y te llevás tus partidas
                    de invitado, que se suman a las que ya tenía.
                  </p>
                  <p>
                    <strong>Si ya tenés cuenta:</strong> podés combinar las dos. Las partidas pasan
                    a la cuenta en la que estás y la otra se elimina. Esto no se puede deshacer.
                  </p>
                </P>
                <P q="¿Cómo cambio mi nombre o mi foto?">
                  <p>
                    Desde <strong>Perfil</strong>. El nombre y la foto son los que ve el resto de tu
                    grupo. Si no ponés una foto propia se usa la de Google, y si entraste con Apple
                    no hay ninguna, porque Apple no la comparte.
                  </p>
                </P>
                <P q="Elegí “Ocultar mi email” con Apple. ¿Pasa algo?">
                  <p>
                    No. Funciona igual. Apple nos da una dirección de reenvío en lugar de tu email
                    real.
                  </p>
                </P>
              </div>
            </Tema>

            <Tema id="grupos">
              <div className="faq">
                <P q="¿Para qué sirve un grupo?">
                  <p>
                    Para no volver a escribir los mismos nombres cada vez. Cargás una vez a los que
                    juegan siempre y después los elegís al armar la partida.
                  </p>
                </P>
                <P q="Quiero crear un grupo y me pide vincular una cuenta.">
                  <p>
                    Es a propósito: un grupo es compartido y tiene que vivir en algún lado más que
                    tu teléfono. Como invitado, todo lo tuyo se pierde al cerrar sesión. Vinculá
                    Apple o Google desde <strong>Perfil</strong> y volvé a Grupos.
                  </p>
                </P>
                <P q="¿Cómo invito a alguien?">
                  <p>
                    Desde el grupo, con un enlace o un QR. El que lo recibe lo abre y entra. Si
                    todavía no tiene la app, primero la instala y después vuelve a tocar el enlace.
                  </p>
                  <p>
                    El código <strong>vence a los 7 días</strong> y podés darlo de baja antes. Si se
                    venció, generá uno nuevo.
                  </p>
                </P>
                <P q="¿Puedo sumar a alguien que no tiene la app?">
                  <p>
                    Sí, con <strong>Agregar sin cuenta</strong>: lo anotás a mano para usarlo en las
                    partidas. Ese nombre queda sólo en tu teléfono y no lo ve el resto del grupo.
                  </p>
                </P>
                <P q="Toqué la invitación y no pasó nada.">
                  <p>
                    Revisá que tengas la app instalada y que el enlace no esté vencido. Siempre
                    podés abrir la app, ir a <strong>Grupos</strong> y pegar el código a mano.
                  </p>
                </P>
              </div>
            </Tema>

            <Tema id="partidas">
              <div className="faq">
                <P q="¿Funciona sin internet?">
                  <p>
                    Para anotar, sí: todo se guarda primero en el teléfono y cuando vuelve la
                    conexión se sincroniza solo con tu cuenta.
                  </p>
                  <p>
                    Lo que sí necesita conexión es lo compartido: crear o entrar a un grupo, las
                    invitaciones y las salas del Pulsador.
                  </p>
                </P>
                <P q="No veo mis partidas en otro dispositivo.">
                  <p>
                    Revisá que en los dos hayas entrado con la <strong>misma</strong> cuenta (mismo
                    Apple o mismo Google) y que ambos tengan conexión. Abrí la app en el dispositivo
                    donde jugaste para que termine de sincronizar.
                  </p>
                  <p>Si estabas como invitado, primero vinculá una cuenta en Perfil.</p>
                </P>
                <P q="Edité la misma partida en dos teléfonos. ¿Cuál queda?">
                  <p>
                    Queda la versión modificada por última vez. Para evitar sorpresas, anotá cada
                    partida desde un solo dispositivo.
                  </p>
                </P>
                <P q="Me equivoqué en una ronda.">
                  <p>
                    Desde <strong>Opciones</strong>, arriba a la derecha de la partida, podés
                    deshacer la última ronda, terminar la partida o eliminarla.
                  </p>
                </P>
              </div>
            </Tema>

            <Tema id="juegos">
              <div className="faq">
                <P q="¿Cómo se cuentan los puntos en Corazones?">
                  <p>
                    Acertar tu pedido suma un base fijo más las bazas que hiciste; desde la ronda de
                    bonus, el base es mayor. Si no acertás, sumás sólo las bazas. El repartidor rota
                    cada ronda, pide último y no puede hacer que la suma de pedidos iguale las
                    cartas de la ronda.
                  </p>
                  <p>
                    Al crear la partida podés ajustar la cantidad de mazos, desde qué ronda corre el
                    bonus y cuántas rondas se juegan.
                  </p>
                </P>
                <P q="¿El Truco se puede anotar desde la pantalla bloqueada?">
                  <p>
                    Sí. Mientras hay una partida en curso aparece en la pantalla bloqueada y en la
                    Dynamic Island, y los botones funcionan con la app cerrada: lo que anotás afuera
                    entra a la partida al volver.
                  </p>
                  <p>
                    Por ahora es sólo para Truco. Reloj, Corazones y Generala van a llegar en una
                    próxima versión.
                  </p>
                </P>
                <P q="¿Qué hace Generala además de anotar?">
                  <p>
                    Tiene los dados y la planilla en la misma pantalla: tirás, fijás los que te
                    sirven, volvés a tirar y la app te sugiere dónde conviene anotar.
                  </p>
                </P>
                <P q="¿Cómo funciona el Pulsador?">
                  <p>
                    De dos maneras. En <strong>un solo teléfono</strong>, la pantalla se divide en
                    una zona por jugador: esperen el <strong>¡YA!</strong> y gana el primero que
                    toca su zona. Quien toque antes de tiempo queda afuera de esa ronda.
                  </p>
                  <p>
                    En <strong>varios teléfonos</strong>, el anfitrión abre una sala y pasa el
                    código; los demás entran desde Pulsador y cada uno pulsa en el suyo. Antes de
                    empezar, la app sincroniza los relojes para que el orden de los toques sea
                    fiel; si la conexión viene inestable te avisa y conviene pasar a wifi.
                  </p>
                </P>
                <P q="¿Para qué sirve Equipos?">
                  <p>
                    Reparte a los jugadores al azar en la cantidad de equipos que le digas, y podés
                    marcar quiénes no pueden quedar juntos antes de sortear.
                  </p>
                </P>
                <P q="La pantalla se apaga mientras corre el reloj.">
                  <p>
                    El Reloj y el Pulsador mantienen la pantalla encendida mientras están abiertos.
                    Si igual se apaga, revisá que el Modo de bajo consumo no esté limitando el
                    bloqueo automático.
                  </p>
                </P>
                <P q="No siento la vibración.">
                  <p>
                    La app usa la respuesta háptica del sistema. Verificá en Ajustes de iOS →
                    Sonidos y vibración que la “Respuesta háptica del sistema” esté activada.
                  </p>
                </P>
              </div>
            </Tema>

            <Tema id="eliminar">
              <p>
                Desde la app: <strong>Perfil → Eliminar cuenta</strong>. Se borran de forma
                definitiva tu cuenta, tu foto y todas tus partidas, y salís de los grupos en los que
                estabas. Si entraste con Apple, además revocamos el acceso de la app a tu Apple ID.
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
            </Tema>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
