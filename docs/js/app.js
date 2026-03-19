/**
 * app.js — Lógica principal de la aplicación
 * Conecta los inputs, validación, mensajes, fuegos y photostrip.
 */

(() => {
  /* ── Elementos del DOM ── */
  const dayInput     = document.getElementById('day');
  const monthInput   = document.getElementById('month');
  const celebrateBtn = document.getElementById('celebrate-btn');
  const formSection  = document.getElementById('form-section');
  const resultSection = document.getElementById('result-section');
  const resultMsg    = document.getElementById('result-message');
  const resetBtn     = document.getElementById('reset-btn');
  const particlesEl  = document.getElementById('particles');

  /* ── Crear partículas decorativas flotantes ── */
  function initParticles() {
    const { symbols, count } = CONFIG.particles;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className    = 'particle';
      span.textContent  = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left   = `${Math.random() * 100}%`;
      span.style.top    = `${60 + Math.random() * 50}%`;
      span.style.setProperty('--dur',   `${6 + Math.random() * 10}s`);
      span.style.setProperty('--delay', `${Math.random() * 8}s`);
      span.style.fontSize = `${10 + Math.random() * 14}px`;
      span.style.opacity  = `${0.1 + Math.random() * 0.4}`;
      particlesEl.appendChild(span);
    }
  }

  /* ── Helpers de mensajes aleatorios ── */
  function randomOf(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ── Validación de fecha ── */
  function validate() {
    const day   = parseInt(dayInput.value,   10);
    const month = parseInt(monthInput.value, 10);

    // Validación básica
    if (!day || !month || day < 1 || day > 31 || month < 1 || month > 12) {
      shakeBadInput();
      return;
    }

    // Audio click previo (requiere interacción del usuario ya hecha)
    Audio.play('click', { volume: 0.4 });

    // Espera un instante para que el audio suene y luego muestra resultado
    setTimeout(() => {
      const isMatch =
        day   === CONFIG.birthday.day &&
        month === CONFIG.birthday.month;

      showResult(isMatch);
    }, 280);
  }

  /* ── Muestra el resultado ── */
  function showResult(isBirthday) {
    // Oculta formulario
    formSection.classList.add('hidden');

    // Muestra sección de resultado
    resultMsg.innerHTML = isBirthday
      ? randomOf(CONFIG.happyMessages)
      : randomOf(CONFIG.sadMessages);

    resultSection.classList.remove('hidden');

    if (isBirthday) {
      // 🎉 ¡Es cumpleaños!
      Audio.stop('ambient');   
      Audio.play('celebration', { volume: 0.65, fadeIn: true });
      Fireworks.start();    // arrancan a la vez
      Photostrip.show();    // fotos a la vez
    } else {
      // 💌 No es cumpleaños
      Audio.stop('ambient');  
      Audio.play('sad', { volume: 0.5 });
      Photostrip.hide();
    }
  }

  /* ── Reset a estado inicial ── */
  function reset() {
    Fireworks.stop();
    Audio.stopAll();
    Photostrip.hide();

    formSection.classList.remove('hidden');
    resultSection.classList.add('hidden');

    dayInput.value   = '';
    monthInput.value = '';
    dayInput.focus();
  }

  /* ── Shake suave si input inválido ── */
  function shakeBadInput() {
    const row = document.querySelector('.inputs-row');
    row.style.animation = 'none';
    void row.offsetWidth;
    row.style.animation = 'shake 0.4s ease';
  }

  // Inyecta keyframe de shake una vez
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100%{ transform:translateX(0); }
      20%{ transform:translateX(-8px); }
      40%{ transform:translateX(8px); }
      60%{ transform:translateX(-5px); }
      80%{ transform:translateX(5px); }
    }
  `;
  document.head.appendChild(style);

  /* ── Auto-avance de día → mes ── */
  dayInput.addEventListener('input', () => {
    const v = dayInput.value;
    if (v.length === 2 || parseInt(v) > 3) {
      monthInput.focus();
    }
  });

  /* ── ENTER para validar ── */
  [dayInput, monthInput].forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') validate();
    });
  });

  /* ── Botón celebrar ── */
  celebrateBtn.addEventListener('click', validate);

  /* ── Botón volver ── */
  resetBtn.addEventListener('click', reset);

  /* ── Ambient: arranca en el primer gesto del usuario ── */
  let ambientStarted = false;
  function startAmbient() {
    if (ambientStarted) return;
    ambientStarted = true;
    Audio.play('ambient', { loop: true, volume: 0.35, fadeIn: true });
  }
  document.addEventListener('click',      startAmbient, { once: true });
  document.addEventListener('keydown',    startAmbient, { once: true });
  document.addEventListener('touchstart', startAmbient, { once: true });

  /* ── Init ── */
  initParticles();
  dayInput.focus();

})();
