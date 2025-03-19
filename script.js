const noButton = document.querySelector('.no-button');
const yesButton = document.querySelector('.yes-button');
const container = document.querySelector('.container');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
const thankYouMessage = document.querySelector('.thank-you-message');

canvas.width = 500;
canvas.height = 500;

noButton.addEventListener('mouseover', () => {
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});

function createConfetti() {
    const colors = ['#ff0', '#0f0', '#00f', '#f0f', '#f00', '#0ff'];
    const particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1,
            direction: Math.random() * 2 * Math.PI,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const particle of particles) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            particle.x += Math.cos(particle.direction) * particle.speed;
            particle.y += Math.sin(particle.direction) * particle.speed;
            particle.y += 1; 
        }
        requestAnimationFrame(draw);
    }
    draw();
}

yesButton.addEventListener('click', () => {
    createConfetti();
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    
    thankYouMessage.style.display = 'block';
});
