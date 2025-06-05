const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Star properties
const numStars = 500; // Number of stars
const stars = [];

// Create stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
    });
}

// Draw stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000'; // Space background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });
}

// Update star positions
function updateStars() {
    stars.forEach(star => {
        star.y += star.speed; // Move stars downward
        if (star.y > canvas.height) {
            star.y = 0; // Reset star to the top
            star.x = Math.random() * canvas.width; // Randomize horizontal position
        }
    });
}

// Animation loop
function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});