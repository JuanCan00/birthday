# 🎂 Página Interactiva de Cumpleaños
### Guía completa paso a paso

---

## 📁 Estructura de carpetas

```
birthday/
│
├── html/
│   └── index.html          ← Página principal (ábrela aquí)
│
├── css/
│   └── styles.css          ← Todos los estilos visuales
│
├── js/
│   ├── config.js           ← ⭐ Configuración principal (edita aquí)
│   ├── fireworks.js        ← Motor de fuegos artificiales (canvas)
│   ├── photostrip.js       ← Lógica de la tira de fotos
│   ├── audio.js            ← Gestión de audios
│   └── app.js              ← Lógica principal de la app
│
├── audio/                  ← Pon aquí tus archivos de audio (.mp3)
│   ├── ambient.mp3         (opcional – música de fondo suave)
│   ├── click.mp3           (opcional – sonido al presionar Celebrar)
│   ├── celebration.mp3     (opcional – sonido de celebración)
│   └── soft.mp3            (opcional – sonido suave si no es cumpleaños)
│
├── images/                 ← Pon aquí tus imágenes
│   ├── photo1.jpg          ← Foto 1 del photostrip
│   ├── photo2.jpg          ← Foto 2 del photostrip
│   ├── photo3.jpg          ← Foto 3 del photostrip
│   ├── photo4.jpg          ← Foto 4 del photostrip
│   └── background.jpg      ← (opcional) Fondo HD de la página
│
└── README.md               ← Esta guía
```

---

## ⚡ Inicio rápido

1. **Abre** `html/index.html` en tu navegador (doble clic o arrastra al navegador).
2. Listo. No requiere servidor, instalación ni frameworks.

> **Nota:** Para que los audios funcionen correctamente en Chrome/Firefox
> necesitas servir los archivos desde un servidor local o simplemente
> usarlo en Firefox que es más permisivo con archivos locales.
> Con servidor local (VS Code + extensión Live Server) todo funciona perfecto.

---

## ✏️ Personalización — Solo edita `js/config.js`

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
Reemplaza los archivos en `/audio/` con los tuyos (mismo nombre),
o cambia las rutas en config.js:
```js
audio: {
  celebration: "../audio/mi-cancion.mp3",
  // ...
}
```

### 5. Agregar fondo de imagen
En `css/styles.css`, busca `.bg-overlay` y cambia el comentario:
```css
/* Reemplaza el gradiente con: */
background: url('../images/background.jpg') center/cover no-repeat fixed;
```

---

## 🖼️ Agregar tus fotos al photostrip

1. Nombra tus fotos: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`
2. Colócalas en la carpeta `images/`
3. Tamaño recomendado: **800×1000px** (vertical, aspecto 4:5)
4. Si quieres cambiar los pies de foto o agregar más fotos,
   edita los bloques `.photo-item` en `html/index.html`:

```html
<div class="photo-item" style="--rot: -2deg; --delay: 0.2s">
  <img src="../images/mi-foto.jpg" alt="Mi foto" />
  <span class="photo-caption">mi mensaje 💕</span>
</div>
```

---

## 🎆 Personalizar los fuegos artificiales

En `config.js`:
```js
fireworks: {
  count:    6,      // Más número = más cohetes simultáneos
  duration: 12000,  // Duración en ms. 0 = infinito
  shapes: ["circle", "heart", "star", "burst"]  // Quita los que no quieras
}
```

---

## 🎨 Personalizar colores

En `css/styles.css`, cambia las variables:
```css
:root {
  --rose:       #e8a0b4;   /* color principal */
  --rose-dark:  #c96f8a;   /* botón y acentos */
  --gold:       #c9a96e;   /* detalles dorados */
  --warm-white: #fffaf6;   /* texto claro */
}
```

---

## 📱 ¿Es responsive?

Sí. Funciona en móvil, tablet y escritorio.
En móvil, el photostrip se convierte en una tira horizontal deslizable.

---

## 🔊 ¿Qué pasa si no tengo archivos de audio?

La página funciona perfectamente sin audio.
Si los archivos no existen, los errores se capturan silenciosamente
y simplemente no suena nada.

Puedes conseguir audios libres de derechos en:
- [Pixabay Music](https://pixabay.com/music/)
- [Free Music Archive](https://freemusicarchive.org/)
- [Zapsplat](https://www.zapsplat.com/)

---

## 💡 Consejos

- Para probar el cumpleaños, ingresa la fecha que pusiste en `config.js`.
- La tecla **ENTER** también valida la fecha.
- El día se avanza automáticamente al campo de mes cuando escribes 2 dígitos.
- Puedes tener **varios mensajes** en los arrays; se elige uno aleatoriamente cada vez.

---

*Hecho con 💕 — Personalízalo y sorprende a alguien especial.*
