# Web oficial de THE LION — Lo que esconde el león

HTML, CSS y JS sin frameworks y sin compilar. Se sube tal cual a cualquier hosting gratis.

## Qué hay en la carpeta
| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página (portada, historia, el juego, descargas, devlog, requisitos, controles). |
| `css/estilo.css` | Todo el estilo (colores del juego: crema sobre negro, brasa y sangre). |
| `js/web.js` | Lee `devlog.json`: arma el devlog y los botones de descarga. |
| `devlog.json` | **Lo único que tocas en cada actualización.** Versión actual, descargas y notas. |
| `downloads/` | Los archivos que la gente descarga. |
| `img/` | Portada, banner, ícono, favicon e imagen para compartir en redes (`og.jpg`). Originales grandes en `img/src/`. |
| `ver-web.bat` | Abre la web en tu PC con el devlog funcionando (necesita Python). |
| `.nojekyll` | Para que GitHub Pages sirva todo sin tocar nada. |

> Si abres `index.html` con doble clic, se ve todo menos el devlog (el navegador no deja leer `devlog.json` desde el disco).
> Usa `ver-web.bat`, o mírala ya publicada.

## Cómo sacar una versión nueva (ej. v0.4.0)
1. Copia los archivos nuevos a `downloads/` (ej. `TheLion-v0.4.0-win64.zip` y `THE-LION-v0.4.0.zip`).
2. Abre `devlog.json` y:
   - cambia `"actual": "v0.4.0"`;
   - en `descargas`, cambia `archivo` y `peso` de cada uno (`"disponible": false` muestra «Muy pronto»);
   - agrega la versión **arriba de todo** en `versiones`:
     ```json
     {
       "version": "v0.4.0",
       "fecha": "28 nov 2026",
       "titulo": "Un título corto que dé ganas",
       "resumen": "Una frase.",
       "cambios": [
         "Cambio 1, escrito para jugadores.",
         "Cambio 2."
       ]
     },
     ```
3. Cuida las comas: entre versiones va coma; después de la última, no. Si la web dice «No se pudo cargar el devlog», falta o sobra una coma
   (pega el archivo en https://jsonlint.com para encontrarla).
4. Si cambiaste `css/estilo.css` o `js/web.js`, sube el número en `?v=0.4.0` dentro de `index.html` (así nadie ve la versión vieja guardada).
5. Vuelve a subir la carpeta (o solo `devlog.json` y `downloads/`).

**Sin spoilers en el devlog:** no reveles el misterio (el canon está en `the-lion/DISENO.md`).
Describe lo que el jugador va a sentir, no lo que va a descubrir.

## Publicada en GitHub Pages
- Web: https://onnhhy.github.io/the-lion/
- Repositorio: https://github.com/OnnHhy/the-lion (esta carpeta es ese repositorio).
- Para actualizar después de cambiar `devlog.json` o `downloads/`, en PowerShell dentro de esta carpeta:
  `git add -A; git commit -m "v0.4.0"; git push` → en 1–2 minutos se ve en la web.

## Otras opciones de hosting gratis
- **Netlify Drop** (lo más fácil): entrar a app.netlify.com/drop y arrastrar la carpeta `the-lion-web`. Da un enlace tipo `algo.netlify.app`.
  Para actualizar: arrastrar la carpeta otra vez en el mismo sitio.
- **GitHub Pages**: crear un repositorio, subir el contenido de `the-lion-web/`, y en *Settings → Pages* elegir la rama `main`.
  Enlace tipo `usuario.github.io/the-lion`. Límite: archivos de hasta 100 MB (si el juego crece, el .zip va en *GitHub Releases*
  y se pega ese enlace en `devlog.json`).
- **itch.io**: es la tienda de juegos indie (gratis). Ahí se sube el juego como proyecto y esta web puede enlazar a esa página.
  Tiene su propia página, así que sirve más como segundo lugar de descarga.

## Imágenes
Portada, banner e ícono son originales, hechos con Gemini a partir de la idea (sin copiar ninguna imagen existente).
El ícono del .exe es `img/icon-512.png` / `img/THE-LION.ico`.
