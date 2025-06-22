const btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      btn.textContent = document.body.classList.contains('dark') ? '☀️ Mode clair' : '🌙 Mode sombre';
    });

    
  document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fade-in');

    function checkFade() {
      const triggerBottom = window.innerHeight * 0.85;

      faders.forEach(fader => {
        const top = fader.getBoundingClientRect().top;

        if (top < triggerBottom) {
          fader.style.opacity = 1;
          fader.style.transform = 'translateY(0)';
          fader.style.animationPlayState = 'running';
        }
      });
    }

    window.addEventListener('scroll', checkFade);
    checkFade(); // vérifie aussi au chargement
  });
