import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Política de privacidad — ¿Quién gana?",
  description:
    "Qué datos usa la app ¿Quién gana?, para qué, dónde se guardan y cómo eliminarlos.",
};

const indice = [
  ["responsable", "Responsable"],
  ["datos", "Qué datos usamos"],
  ["finalidad", "Para qué"],
  ["no-hacemos", "Lo que no hacemos"],
  ["almacenamiento", "Dónde se guardan"],
  ["terceros", "Proveedores"],
  ["conservacion", "Conservación y borrado"],
  ["derechos", "Tus derechos"],
  ["menores", "Menores"],
  ["cambios", "Cambios"],
  ["contacto", "Contacto"],
];

export default function Privacidad() {
  return (
    <SiteShell current="privacidad">
      <div className="page-head">
        <span className="eyebrow">Vigente desde el 17 de noviembre de 2026</span>
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
            {indice.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="prose">
          <section id="responsable">
            <h2>
              <span className="step">01</span>Responsable
            </h2>
            <p>
              Esta política aplica a la app <strong>¿Quién gana?</strong> para iOS (y, si se
              publica, para Android) y a este sitio. El responsable del tratamiento de los datos es{" "}
              <strong>Mateo Álvarez</strong>, desarrollador de la app, con domicilio en la República
              Argentina. Podés escribir a{" "}
              <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a> por cualquier
              consulta.
            </p>
          </section>

          <section id="datos">
            <h2>
              <span className="step">02</span>Qué datos usamos
            </h2>
            <p>Depende de cómo entres a la app:</p>
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
                  <td>Nombre y foto de perfil</td>
                  <td>Si entrás con Apple o Google y el proveedor los comparte</td>
                  <td>Apple o Google. El nombre lo podés cambiar en la app.</td>
                </tr>
                <tr>
                  <td>Partidas</td>
                  <td>Cuando creás una partida en Anotador o Corazones</td>
                  <td>
                    Vos: título, nombres de jugadores que escribís, rondas, puntajes y fechas.
                  </td>
                </tr>
                <tr>
                  <td>Preferencias</td>
                  <td>Siempre</td>
                  <td>
                    Ajustes de la app (por ejemplo, tema claro u oscuro). Se guardan sólo en tu
                    dispositivo.
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              Dados, Pulsador y Reloj de arena funcionan enteramente en tu dispositivo y no envían
              datos.
            </p>
            <div className="note">
              <p>
                Los nombres de jugadores son los que vos escribís. Pueden ser apodos: no hace falta
                usar nombres reales.
              </p>
            </div>
          </section>

          <section id="finalidad">
            <h2>
              <span className="step">03</span>Para qué los usamos
            </h2>
            <ul>
              <li>Crear y mantener tu cuenta (o tu sesión de invitado).</li>
              <li>Guardar tus partidas y sincronizarlas entre tus dispositivos.</li>
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
          </section>

          <section id="no-hacemos">
            <h2>
              <span className="step">04</span>Lo que no hacemos
            </h2>
            <ul>
              <li>No mostramos publicidad.</li>
              <li>
                No usamos herramientas de analítica, rastreo ni perfiles publicitarios, y no te
                seguimos a través de otras apps o sitios.
              </li>
              <li>No vendemos, alquilamos ni cedemos tus datos.</li>
              <li>No accedemos a tus contactos, fotos, ubicación, micrófono ni cámara.</li>
            </ul>
            <p>
              Este sitio tampoco usa cookies ni analítica. Las tipografías se cargan desde Google
              Fonts, que recibe la dirección IP de tu navegador al servirlas.
            </p>
          </section>

          <section id="almacenamiento">
            <h2>
              <span className="step">05</span>Dónde se guardan
            </h2>
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
              cuenta sólo puede leer y modificar sus propias partidas.
            </p>
            <p>
              Los servidores de Supabase pueden estar fuera de la Argentina. Al usar la app aceptás
              esa transferencia internacional, que se hace con proveedores que aplican medidas de
              seguridad adecuadas.
            </p>
          </section>

          <section id="terceros">
            <h2>
              <span className="step">06</span>Proveedores
            </h2>
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
                  <td>Autenticación y base de datos donde se sincronizan las partidas.</td>
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
          </section>

          <section id="conservacion">
            <h2>
              <span className="step">07</span>Conservación y borrado
            </h2>
            <p>Guardamos tus datos mientras tengas una cuenta. Podés borrarla cuando quieras desde la app:</p>
            <p>
              <strong>Ajustes → Eliminar cuenta.</strong> Se borran de forma definitiva tu cuenta,
              tu perfil y todas tus partidas en nuestros servidores. Si entraste con Apple, además
              revocamos el acceso de la app a tu Apple ID.
            </p>
            <ul>
              <li>Si cerrás sesión siendo invitado, las partidas de ese dispositivo se pierden.</li>
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
          </section>

          <section id="derechos">
            <h2>
              <span className="step">08</span>Tus derechos
            </h2>
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
          </section>

          <section id="menores">
            <h2>
              <span className="step">09</span>Menores
            </h2>
            <p>
              La app es apta para todo público, pero no está dirigida específicamente a menores de
              13 años ni les pedimos datos a sabiendas. Si sos madre, padre o tutor y creés que un
              menor nos dio datos, escribinos y los borramos. Los menores pueden usar la app como
              invitados, sin vincular ninguna cuenta.
            </p>
          </section>

          <section id="cambios">
            <h2>
              <span className="step">10</span>Cambios
            </h2>
            <p>
              Si cambiamos esta política, actualizamos la fecha de vigencia arriba de todo. Si el
              cambio es importante, lo avisamos dentro de la app antes de que aplique.
            </p>
          </section>

          <section id="contacto">
            <h2>
              <span className="step">11</span>Contacto
            </h2>
            <p>
              Mateo Álvarez · <a href="mailto:contacto@quien-gana.app">contacto@quien-gana.app</a>
            </p>
            <p>
              ¿Necesitás ayuda con la app? Pasá por <Link href="/soporte/">Soporte</Link>.
            </p>
          </section>
        </article>
      </div>
    </SiteShell>
  );
}
