// Reveal timeline cards on scroll (once visible, keep them visible)
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.querySelectorAll(".timeline-item").forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const items = document.querySelectorAll(".timeline-item");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible"); // reveal once
          io.unobserve(entry.target);               // stop watching (keeps visible)
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => io.observe(item));
})();
