// Subtle 3D tilt for project cards (mouse/trackpad only)
(() => {
  // Respect reduced motion preferences
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  // Only enable tilt on devices that support hover and have a fine pointer (mouse/trackpad)
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

// Configuration (tuned to avoid jitter)
  const MAX_TILT_X = 7;     //7 degrees
  const MAX_TILT_Y = 9;     //9 degrees
  const EDGE_DEADZONE = 0.12; //12 % of card near edges where tilt stops. try 15-20 if glitchy

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  cards.forEach((card) => {
    let rafId = null;

    const updateTilt = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      if (px < EDGE_DEADZONE || px > 1 - EDGE_DEADZONE || py < EDGE_DEADZONE || py > 1 - EDGE_DEADZONE) {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        return;
      }

      const dx = px - 0.5;
      const dy = py - 0.5;

      const tiltX = clamp(-dy * MAX_TILT_X * 2, -MAX_TILT_X, MAX_TILT_X);
      const tiltY = clamp(dx * MAX_TILT_Y * 2, -MAX_TILT_Y, MAX_TILT_Y);

      card.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-2px)`;
    };

    card.addEventListener("mousemove", (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateTilt(e);
        rafId = null;
      });
    });

    card.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
})();
