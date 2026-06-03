const cards = document.querySelectorAll(".floating-card");
const particles = document.querySelectorAll(".particle");

// Mouse move parallax effect on cards
window.addEventListener("mousemove", (e) => {

    cards.forEach((card, index) => {

        const speed = (index + 1) * 0.015;

        const x =
            (window.innerWidth / 2 - e.clientX)
            * speed;

        const y =
            (window.innerHeight / 2 - e.clientY)
            * speed;

        card.style.transform =
            `translate(${x}px, ${y}px)`;

    });

    // Subtle mouse effect on particles
    particles.forEach((particle, index) => {
        const speed = 0.003;
        const x = (window.innerWidth / 2 - e.clientX) * speed;
        const y = (window.innerHeight / 2 - e.clientY) * speed;
        particle.style.filter = `drop-shadow(${x}px ${y}px 10px rgba(139,92,246,.8))`;
    });

});

// Add glow effect on card hover
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.animation = "glowPulse 1.5s ease-in-out";
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.animation = `float${card.classList[1].slice(-1)} ${6 + Math.random() * 2}s ease-in-out infinite`;
    });
});