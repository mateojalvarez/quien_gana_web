# ¿Quién gana? — sitio institucional

Webapp en **Next.js 15** (App Router, TypeScript) de la app **¿Quién gana?**.
Se exporta como sitio estático (`output: "export"`), así que se publica en cualquier hosting sin servidor.

| Ruta | Uso |
| --- | --- |
| `/` | Landing |
| `/privacidad/` | Política de privacidad → **Privacy Policy URL** en App Store Connect |
| `/soporte/` | Ayuda y contacto → **Support URL** en App Store Connect |
| `404.html` | Página de error (sale de `app/not-found.tsx`) |

## Estructura

```
app/
  layout.tsx          metadatos, tipografía y globals
  page.tsx            landing
  privacidad/page.tsx
  soporte/page.tsx
  not-found.tsx       404
  globals.css         tokens y componentes (píldoras, tarjetas, FAQ…)
components/
  SiteShell.tsx       header + main + footer
  icons.tsx           íconos SVG inline
public/assets/        imágenes (incluye la arcilla en assets/img/clay)
```

## Probar en local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Publicar

```bash
npm run build   # genera out/
```

`out/` es el sitio completo; no hace falta servidor. Lleva `.nojekyll` para GitHub Pages.

**GitHub Pages**

```bash
git init && git add . && git commit -m "Sitio institucional en Next.js"
gh repo create quien-gana-web --public --source=. --push
```

Después, un workflow que corra `npm ci && npm run build` y publique `out/`, o subí `out/` a la rama `gh-pages`.

**Dominio propio (`quien-gana.app`)**: agregá `public/CNAME` con `quien-gana.app`, configurá el DNS y activá *Enforce HTTPS*.
`metadataBase` ya apunta a `https://quien-gana.app` en `app/layout.tsx`.

En App Store Connect:

- Privacy Policy URL → `https://quien-gana.app/privacidad/`
- Support URL → `https://quien-gana.app/soporte/`
- Marketing URL (opcional) → `https://quien-gana.app/`

## Mantener

- **Email de contacto**: `contacto@quien-gana.app` aparece en las tres páginas (`grep -rl contacto@ app components`).
- **Política de privacidad**: si la app empieza a usar analítica, crash reporting, push o nuevos datos,
  actualizá la política, la fecha de vigencia y las *App Privacy* de App Store Connect.
- **Lanzamiento**: cuando la app esté en la tienda, cambiá el botón “Próximamente en App Store” de
  `app/page.tsx` por el link real (`https://apps.apple.com/app/id<APP_ID>`).
- **Imágenes**: `public/assets/img/clay/*.webp` salen de `quien_gana/assets/clay/*.png` reducidas a 320 px (640 px la composición).

## Estilo

Los mismos tokens que la app (ver el canvas de pantallas):

- Marfil `#FBF8F2`, tinta `#151110`, apagado `#5A4A40`, línea `#D9CDBE`, crema `#EFE6D8`.
- Acentos de tarjeta: mostaza `#F4B740`, tomate `#EF7A57`, salvia `#86C1B7`, rosa `#F3C2C9`.
  Las tarjetas de color y la arcilla **no cambian** en modo oscuro: el texto sobre ellas siempre es tinta.
- Oscuro: fondo `#151110`, texto marfil, apagado `#B4A79C`, líneas `#3A322D`, sección `#2A221E`.
  La acción principal se invierte a marfil con texto tinta.
- **Jost** en todo (400–800). Títulos en 800 con `letter-spacing` negativo; números con `font-variant-numeric: tabular-nums`.
- Píldoras con borde de 1.5 px y radio 999; tarjetas de 28–32 px de radio; la arcilla puede salirse de la tarjeta, nunca tapar texto.
- Modo oscuro automático con `prefers-color-scheme`.
