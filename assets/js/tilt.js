// Enable subtle 3D tilt on project cards based on mouse position
(() => {
  // Respect people who prefer reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  // Select all project cards that should tilt
  const cards = document.querySelectorAll(".project-card");
  if (!cards.length) return;

  // Configure tilt intensity (keep subtle for a professional feel)
  const MAX_TILT_X = 8;  // max rotation on X axis
  const MAX_TILT_Y = 10; // max rotation on Y axis

  cards.forEach((card) => {
    // Apply tilt as the mouse moves inside the card
    card.addEventListener("mousemove", (e) => {
      // Get card bounds for relative mouse position
      const rect = card.getBoundingClientRect();
      // Mouse position within the card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize mouse position to -0.5..0.5 range
      const dx = x / rect.width - 0.5;
      const dy = y / rect.height - 0.5;

      // Convert to degrees (invert dy for natural tilt)
      const tiltX = (-dy * MAX_TILT_X).toFixed(2);
      const tiltY = (dx * MAX_TILT_Y).toFixed(2);

      // Apply perspective + rotation + tiny lift
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
    });

    // Reset tilt when mouse leaves
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
})();
