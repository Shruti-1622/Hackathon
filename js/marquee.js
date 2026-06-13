(function () {
  const outer = document.getElementById('marqueeOuter');
  const belt  = document.getElementById('marqueeBelt');
  if (!outer || !belt) return;

  const clone = belt.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  outer.appendChild(clone);

  let offset = 0;
  let paused = false;

  outer.addEventListener('mouseenter', () => paused = true);
  outer.addEventListener('mouseleave', () => paused = false);

  function tick() {
    if (!paused) {
      offset -= 0.8;
      const beltW = belt.offsetWidth;
      if (Math.abs(offset) >= beltW) offset = 0;
      belt.style.transform  = `translateX(${offset}px)`;
      clone.style.transform = `translateX(${offset + beltW}px)`;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();