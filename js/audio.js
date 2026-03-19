/**
 * audio.js — Gestión de audio
 * Carga los audios de config.js y expone una API simple.
 * Si el archivo no existe o falla, lo ignora silenciosamente.
 */

const Audio = (() => {
  const cache = {};

  function load(key) {
    const src = CONFIG.audio[key];
    if (!src) return null;

    if (cache[key]) return cache[key];

    const a = new window.Audio();
    a.preload = 'auto';
    a.src     = src;
    a.onerror = () => { /* ignora si no existe el archivo */ };
    cache[key] = a;
    return a;
  }

  // Pre-carga todos en cuanto se puede interactuar
  function preload() {
    Object.keys(CONFIG.audio).forEach(k => load(k));
  }

  /**
   * Reproduce un audio por su clave.
   * @param {string} key  - clave en CONFIG.audio (ambient, click, celebration, sad)
   * @param {object} opts - { loop, volume, fadeIn }
   */
  function play(key, opts = {}) {
    const a = load(key);
    if (!a || !a.src) return;

    const { loop = false, volume = 0.6, fadeIn = false } = opts;

    a.loop        = loop;
    a.currentTime = 0;

    if (fadeIn) {
      a.volume = 0;
      a.play().catch(() => {});
      let v = 0;
      const step = setInterval(() => {
        v = Math.min(v + 0.05, volume);
        a.volume = v;
        if (v >= volume) clearInterval(step);
      }, 80);
    } else {
      a.volume = volume;
      a.play().catch(() => {});
    }
  }

  function stop(key) {
    const a = cache[key];
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  }

  function stopAll() {
    Object.keys(cache).forEach(k => stop(k));
  }

  // Pre-cargar al primer gesto del usuario (política de autoplay)
  document.addEventListener('click', preload, { once: true });
  document.addEventListener('keydown', preload, { once: true });

  return { play, stop, stopAll };
})();
