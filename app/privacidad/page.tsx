import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Política de privacidad — ¿Quién gana?",
  description:
    "Qué datos usa la app ¿Quién gana?, para qué, dónde se guardan y cómo eliminarlos.",
};

// El orden manda: de acá salen el índice y el número de cada sección, así
// agregar una en el medio no obliga a renumerar nada a mano.
const secciones = [
  ["responsable", "Responsable"],
  ["datos", "Qué datos usamos"],
  ["finalidad", "Para qué"],
  ["no-hacemos", "Lo que no hacemos"],
  ["almacenamiento", "Dónde se guardan"],
  ["grupos", "Grupos y salas"],
  ["terceros", "Proveedores"],
  ["conservacion", "Conservación y borrado"],
  ["derechos", "Tus derechos"],
  ["menores", "Menores"],
  ["cambios", "Cambios"],
  ["contacto", "Contacto"],
] as const;

type Id = (typeof secciones)[number][0];

const numero = (id: Id) =>
  String(secciones.findIndex((s) => s[0] === id) + 1).padStart(2, "0");

const titulo = (id: Id) => secciones.find((s) => s[0] === id)![1];

function Seccion({ id, children }: { id: Id; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2>
        <span className="step">{numero(id)}</span>
        {titulo(id)}
      </h2>
      {children}
    </section>
  );
}

export default function Privacidad() {
  return (
    <SiteShell current="privacidad">
      <div className="page-head">
        <span className="eyebrow">Vigente desde el 19 de noviembre de 2026</span>
        <h1>Política de privacidad</h1>
        <p>
          La versión corta: guardamos lo mínimo para que tus partidas no se pierdan. No hay
          publicidad, no hay rastreo y no vendemos ni compartimos tus datos con nadie para fines
          comerciales.
        </p>
      </div>

      <div className="doc">
        <aside className="toc" aria-label="Índice">
          <ol>
            {secciones.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="prose">
          <Seccion id="responsable">
            <p>
              Esta política aplica a la app <strong>¿Quién gana?</strong> para iOS (y, si se
              publica, para Android) y a este sitio. El responsable del tratamiento de los datos es{" "}
              <strong>Mateo Álvarez</strong>, desarrollador de la app, con domicilio en la República
              Argentina. Podés escribir a{" "}
              <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a> por cualquier
              consulta.
            </p>
          </Seccion>

          <Seccion id="datos">
            <p>Depende de cómo entres a la app y de qué uses:</p>
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Dato</th>
                  <th scope="col">Cuándo</th>
                  <th scope="col">Origen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Identificador interno de usuario</td>
                  <td>Siempre, incluso como invitado</td>
                  <td>
                    Se genera al abrir la app por primera vez. No te identifica por sí solo.
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>Si entrás con Apple o Google</td>
                  <td>
                    Lo comparte Apple o Google al iniciar sesión. Con Apple podés elegir “Ocultar
                    mi email” y recibimos una dirección de reenvío.
                  </td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td>Si entrás con Apple o Google</td>
                  <td>
                    Lo comparte el proveedor y lo podés cambiar en la app. Es el nombre que ve el
                    resto de tu grupo.
                  </td>
                </tr>
                <tr>
                  <td>Foto de perfil</td>
                  <td>Si elegís una, o si la comparte Google</td>
                  <td>
                    La que subas se guarda en un depósito de lectura pública: quien tenga la URL
                    puede verla. Apple no comparte foto. Podés quitarla cuando quieras.
                  </td>
                </tr>
                <tr>
                  <td>Partidas</td>
                  <td>
                    Cuando creás una partida en Anotador libre, Corazones, Truco o Generala
                  </td>
                  <td>
                    Vos: título, nombres de jugadores que escribís, rondas, puntajes y fechas.
                  </td>
                </tr>
                <tr>
                  <td>Grupos</td>
                  <td>Cuando creás un grupo o entrás a uno</td>
                  <td>
                    El nombre del grupo, quién lo creó, quiénes lo integran y los códigos de
                    invitación. Hace falta tener una cuenta vinculada.
                  </td>
                </tr>
                <tr>
                  <td>Preferencias</td>
                  <td>Siempre</td>
                  <td>
                    Lo que elegís en la app (por ejemplo, tema claro u oscuro, juegos favoritos). Se
                    guardan sólo en tu dispositivo.
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Dados</strong>, <strong>Reloj</strong> y <strong>Equipos</strong> funcionan
              enteramente en tu dispositivo y no envían nada. El <strong>Pulsador</strong> en un
              solo teléfono también; la sala compartida se explica en{" "}
              <a href="#grupos">{numero("grupos")} · {titulo("grupos")}</a>.
            </p>
            <div className="note">
              <p>
                Los nombres de jugadores son los que vos escribís. Pueden ser apodos: no hace falta
                usar nombres reales.
              </p>
            </div>
          </Seccion>

          <Seccion id="finalidad">
            <ul>
              <li>Crear y mantener tu cuenta (o tu sesión de invitado).</li>
              <li>Guardar tus partidas y sincronizarlas entre tus dispositivos.</li>
              <li>
                Armar grupos, mostrar a cada integrante con su nombre y su foto, y procesar las
                invitaciones.
              </li>
              <li>Hacer funcionar las salas compartidas del Pulsador mientras están abiertas.</li>
              <li>
                Vincular una cuenta de invitado con Apple o Google, o combinar dos cuentas cuando lo
                pedís.
              </li>
              <li>Responder tus consultas de soporte.</li>
            </ul>
            <p>
              La base para tratarlos es tu consentimiento al usar la app y la necesidad de prestarte
              el servicio que pediste.
            </p>
          </Seccion>

          <Seccion id="no-hacemos">
            <ul>
              <li>No mostramos publicidad.</li>
              <li>
                No usamos herramientas de analítica, rastreo ni perfiles publicitarios, y no te
                seguimos a través de otras apps o sitios.
              </li>
              <li>No vendemos, alquilamos ni cedemos tus datos.</li>
              <li>No accedemos a tus contactos, ubicación, micrófono ni cámara.</li>
              <li>
                De tus fotos sólo usamos la que elegís como foto de perfil, y únicamente para eso.
              </li>
            </ul>
            <p>
              Este sitio tampoco usa cookies ni analítica. Las tipografías se cargan desde Google
              Fonts, que recibe la dirección IP de tu navegador al servirlas.
            </p>
          </Seccion>

          <Seccion id="almacenamiento">
            <p>
              La app es <em>local-first</em>: tus partidas y preferencias se guardan primero en tu
              dispositivo, así funciona sin conexión. Cuando hay internet, las partidas se
              sincronizan con nuestra base de datos alojada en{" "}
              <a href="https://supabase.com/privacy" rel="noopener">
                Supabase
              </a>
              .
            </p>
            <p>
              La conexión viaja cifrada (HTTPS) y la base aplica reglas de acceso por fila: cada
              cuenta sólo puede leer y modificar sus propias partidas, y los datos de un grupo sólo
              los ven sus integrantes.
            </p>
            <p>
              Las fotos de perfil son la excepción: viven en un depósito de archivos de{" "}
              <strong>lectura pública</strong>, en una carpeta por cuenta, para poder mostrarlas sin
              firmar cada pedido. No están listadas en ningún lado, pero quien tenga la URL exacta
              puede abrirla. Si eso no te cierra, no subas una foto propia.
            </p>
            <p>
              Los servidores de Supabase pueden estar fuera de la Argentina. Al usar la app aceptás
              esa transferencia internacional, que se hace con proveedores que aplican medidas de
              seguridad adecuadas.
            </p>
          </Seccion>

          <Seccion id="grupos">
            <h3>Grupos</h3>
            <p>
              Un grupo guarda su nombre, quién lo creó y quiénes lo integran. Cada integrante
              aparece con el nombre y la foto de su propio perfil, así que lo que cambiás en
              Perfil lo ve el resto del grupo.
            </p>
            <p>
              Las invitaciones son un código que <strong>vence a los 7 días</strong> y que podés dar
              de baja antes. Quien tiene el código sólo puede usarlo para entrar: no le deja ver
              nada del grupo hasta que entra.
            </p>
            <p>
              A alguien sin cuenta lo podés sumar a mano para anotarlo en las partidas. Ese nombre{" "}
              <strong>queda sólo en tu teléfono</strong> y no se sube a ningún servidor: son datos
              de una persona que no aceptó nada, así que no los compartimos con el resto del grupo.
            </p>

            <h3>Salas del Pulsador</h3>
            <p>
              La sala compartida es efímera y no toca la base de datos. Mientras está abierta, el
              nombre que escribís y tus toques viajan por el canal en tiempo real de Supabase para
              que el teléfono anfitrión pueda ordenarlos y decidir quién llegó primero. Al cerrarse
              la sala no queda nada guardado, ni en tu teléfono ni en el servidor.
            </p>
            <p>Para entrar a una sala no hace falta cuenta: se puede jugar como invitado.</p>
          </Seccion>

          <Seccion id="terceros">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Para qué</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href="https://supabase.com/privacy" rel="noopener">
                      Supabase
                    </a>
                  </td>
                  <td>
                    Autenticación, base de datos donde se sincronizan partidas y grupos, depósito de
                    las fotos de perfil y canal en tiempo real de las salas.
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://www.apple.com/legal/privacy/" rel="noopener">
                      Apple
                    </a>
                  </td>
                  <td>Iniciar sesión con Apple y distribución por App Store.</td>
                </tr>
                <tr>
                  <td>
                    <a href="https://policies.google.com/privacy" rel="noopener">
                      Google
                    </a>
                  </td>
                  <td>Iniciar sesión con Google. Google Fonts para este sitio.</td>
                </tr>
              </tbody>
            </table>
            <p>
              Cada uno trata los datos según su propia política. Sólo compartiríamos datos con
              terceros distintos si lo exigiera una ley o una autoridad competente.
            </p>
          </Seccion>

          <Seccion id="conservacion">
            <p>Guardamos tus datos mientras tengas una cuenta. Podés borrarla cuando quieras desde la app:</p>
            <p>
              <strong>Perfil → Eliminar cuenta.</strong> Se borran de forma definitiva tu cuenta,
              tu perfil, tu foto y todas tus partidas en nuestros servidores. Si entraste con Apple,
              además revocamos el acceso de la app a tu Apple ID.
            </p>
            <ul>
              <li>Si cerrás sesión siendo invitado, las partidas de ese dispositivo se pierden.</li>
              <li>
                Al borrar tu cuenta salís de los grupos en los que estabas. Si creaste un grupo, el
                grupo y sus invitaciones se eliminan con él.
              </li>
              <li>
                Si combinás dos cuentas, las partidas pasan a la cuenta que conservás y la otra se
                elimina.
              </li>
              <li>Si borrás la app, se eliminan los datos guardados en el dispositivo.</li>
            </ul>
            <p>
              También podés pedir el borrado por email a{" "}
              <a href="mailto:contacto@quien-gana.app?subject=Eliminar%20mi%20cuenta">
                contacto@quien-gana.app
              </a>
              . Lo hacemos dentro de los 30 días.
            </p>
          </Seccion>

          <Seccion id="derechos">
            <p>
              De acuerdo con la Ley 25.326 de Protección de Datos Personales, podés pedir acceso,
              rectificación, actualización o supresión de tus datos escribiendo a{" "}
              <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a>. El acceso es
              gratuito si lo pedís con intervalos de al menos seis meses, salvo que acredites un
              interés legítimo para hacerlo antes.
            </p>
            <div className="note">
              <p>
                La Agencia de Acceso a la Información Pública, como órgano de control de la Ley
                25.326, atiende las denuncias y reclamos de quienes resulten afectados en sus
                derechos por incumplimiento de las normas vigentes sobre protección de datos
                personales.
              </p>
            </div>
            <p>
              Si vivís fuera de la Argentina, también podés ejercer los derechos que te reconozca la
              ley de tu país (por ejemplo, portabilidad u oposición) por el mismo medio.
            </p>
          </Seccion>

          <Seccion id="menores">
            <p>
              La app es apta para todo público, pero no está dirigida específicamente a menores de
              13 años ni les pedimos datos a sabiendas. Si sos madre, padre o tutor y creés que un
              menor nos dio datos, escribinos y los borramos. Los menores pueden usar la app como
              invitados, sin vincular ninguna cuenta.
            </p>
          </Seccion>

          <Seccion id="cambios">
            <p>
              Si cambiamos esta política, actualizamos la fecha de vigencia arriba de todo. Si el
              cambio es importante, lo avisamos dentro de la app antes de que aplique.
            </p>
          </Seccion>

          <Seccion id="contacto">
            <p>
              Mateo Álvarez · <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a>
            </p>
            <p>
              ¿Necesitás ayuda con la app? Pasá por <Link href="/soporte/">Soporte</Link>.
            </p>
          </Seccion>
        </article>
      </div>
    </SiteShell>
  );
}
