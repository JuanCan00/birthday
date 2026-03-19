/**
 * config.js — Configuración central
 * ✏️  Edita aquí las frases, fecha y colores sin tocar el resto del código.
 */

const CONFIG = {

  /* ──────────────────────────────────────────
     🎂  FECHA DEL CUMPLEAÑOS
     Pon el día y mes de la persona que festeja.
  ────────────────────────────────────────── */
  birthday: {
    day:   19,   // ← cambia el día
    month:  3    // ← cambia el mes (8 = agosto)
  },

  /* ──────────────────────────────────────────
     🎉  MENSAJES SI ES CUMPLEAÑOS
     Puedes tener varios; se elige uno al azar.
  ────────────────────────────────────────── */
  happyMessages: [
    `<span class="emoji-big">🎂✨</span>
     ¡Feliz cumpleaños, amor mío!<br/>
     Que este día brille tanto<br/>
     como tú lo haces siempre. 🌸`,

    `<span class="emoji-big">🥂🌸</span>
     ¡Hoy el universo entero<br/>
     celebra que existes!<br/>
     Que tengas un día mágico. ✨`,

    `<span class="emoji-big">🎊💖</span>
     Un año más de risas,<br/>
     aventuras y momentos bonitos.<br/>
     ¡Feliz cumpleaños! 🎈`
  ],

  /* ──────────────────────────────────────────
     💌  MENSAJES SI NO ES CUMPLEAÑOS
     También se elige uno al azar.
  ────────────────────────────────────────── */
  sadMessages: [
    `<span class="emoji-big">🌷</span>
     Hmmm… hoy no es tu cumpleaños,<br/>
     ¡pero igual eres especial<br/>
     cada día del año! 💕`,

    `<span class="emoji-big">🤍</span>
     Esa fecha no está en nuestra lista,<br/>
     pero te mandamos amor<br/>
     de todas formas. 🌙`,

    `<span class="emoji-big">🌙✨</span>
     No es tu día oficial,<br/>
     pero ya sabes que tú mereces<br/>
     celebración todos los días. 🫶`
  ],

  /* ──────────────────────────────────────────
     🔊  AUDIOS
     Coloca tus archivos en /audio/
     Si no tienes audio, déjalos en "" y se omitirá.
  ────────────────────────────────────────── */
  audio: {
    ambient:     "audio/ambient.mp3",      // suena al abrir la página
    click:       "audio/click.mp3",         // suena al presionar Celebrar
    celebration: "audio/celebration.mp3",   // suena si ES cumpleaños
    sad:         "audio/soft.mp3"           // suena si NO es cumpleaños
  },

  /* ──────────────────────────────────────────
     🎆  FUEGOS ARTIFICIALES
  ────────────────────────────────────────── */
  fireworks: {
    count:        6,      // cohetes simultáneos
    duration:     12000,  // ms que duran los fuegos (0 = infinito)
    shapes: ["circle", "heart", "star", "burst"]  // formas posibles
  },

  /* ──────────────────────────────────────────
     🌸  PARTÍCULAS FLOTANTES
  ────────────────────────────────────────── */
  particles: {
    symbols: ["✦", "·", "✿", "◦", "✸", "⋆", "°", "♡"],
    count: 18
  }
};
