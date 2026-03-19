# 🎂 Página Interactiva de Cumpleaños
### Guía completa paso a paso

---

## 📁 Estructura de carpetas

```
birthday/
│
└── docs/                       ← Todo vive aquí (GitHub Pages)
    ├── index.html              ← Página principal
    ├── css/
    │   └── styles.css          ← Todos los estilos visuales
    ├── js/
    │   ├── config.js           ← ⭐ Configuración principal (edita aquí)
    │   ├── fireworks.js        ← Motor de fuegos artificiales (canvas)
    │   ├── photostrip.js       ← Lógica de la galería de fotos
    │   ├── audio.js            ← Gestión de audios
    │   └── app.js              ← Lógica principal de la app
    ├── audio/                  ← Archivos de audio (.mp3)
    │   ├── ambient.mp3         (música de fondo suave)
    │   ├── click.mp3           (sonido al presionar Celebrar)
    │   ├── celebration.mp3     (sonido de celebración)
    │   └── soft.mp3            (sonido suave si no es cumpleaños)
    └── images/                 ← Fotos del photostrip
        ├── photo1.jpg
        ├── photo2.jpg
        │   ...
        └── photo31.jpg
```

---

## 🌐 GitHub Pages

La página está publicada en:
**https://juancan00.github.io/birthday/**

Configuración en Settings → Pages:
- Branch: `main`
- Folder: `/docs`

---

## ✏️ Personalización — Solo edita `docs/js/config.js`

### 1. Cambiar la fecha del cumpleaños
```js
birthday: {
  day:   15,   // ← día
  month:  8    // ← mes (número)
}
```

### 2. Cambiar los mensajes de cumpleaños
```js
happyMessages: [
  `<span class="emoji-big">🎂</span>
   ¡Tu mensaje aquí!`,
  // Agrega más mensajes separados por comas
]
```

### 3. Cambiar los mensajes cuando NO es cumpleaños
```js
sadMessages: [
  `<span class="emoji-big">🌷</span>
   Tu mensaje aquí.`,
]
```

### 4. Cambiar los audios
Reemplaza los archivos en `docs/audio/` con los tuyos (mismo nombre),
o cambia las rutas en config.js:
```js
audio: {
  celebration: "audio/mi-cancion.mp3",
}
```

### 5. Agregar fondo de imagen
En `docs/css/styles.css`, busca `.bg-overlay` y reemplaza el gradiente:
```css
background: url('images/background.jpg') center/cover no-repeat fixed;
```

---

## 🖼️ Agregar o editar fotos

1. Nombra tus fotos `photo1.jpg` hasta `photo31.jpg`
2. Colócalas en `docs/images/`
3. Tamaño recomendado: **800×1000px** (vertical, aspecto 4:5)
4. Para cambiar los pies de foto edita los bloques `.photo-item` en `docs/index.html`:

```html
<div class="photo-item" style="--rot: -2deg; --delay: 0.2s">
  <img src="images/mi-foto.jpg" alt="Mi foto" />
  <span class="photo-caption">mi mensaje 💕</span>
</div>
```

---

## 🎆 Personalizar los fuegos artificiales

```js
fireworks: {
  count:    6,      // cohetes simultáneos
  duration: 12000,  // duración en ms (0 = infinito)
  shapes: ["circle", "heart", "star", "burst"]
}
```

---

## 🎨 Personalizar colores

En `docs/css/styles.css`:
```css
:root {
  --rose:       #e8a0b4;   /* color principal */
  --rose-dark:  #c96f8a;   /* botón y acentos */
  --gold:       #c9a96e;   /* detalles dorados */
  --warm-white: #fffaf6;   /* texto claro */
}
```

---

## 🔊 Audios

| Archivo | Cuándo suena |
|---|---|
| `ambient.mp3` | Música de fondo al abrir la página |
| `click.mp3` | Al presionar el botón "Celebrar" |
| `celebration.mp3` | Al confirmar que es cumpleaños 🎉 |
| `soft.mp3` | Cuando no es cumpleaños |

Audios gratuitos en:
- [Pixabay Music](https://pixabay.com/music/)
- [Freesound](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)

---

## 💡 Consejos

- La tecla **ENTER** también valida la fecha.
- El día avanza automáticamente al campo de mes al escribir 2 dígitos.
- Puedes tener varios mensajes en los arrays; se elige uno al azar cada vez.
- La galería de fotos se divide en 4 tiras de 8 fotos navegables con flechas ‹ ›.
- En móvil puedes deslizar entre tiras con swipe.

---

*Hecho con 💕 — Personalízalo y sorprende a alguien especial.*
