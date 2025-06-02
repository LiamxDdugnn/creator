const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

const stars = [];
for (let i = 0; i < 500; i++) {
  stars.push(new Star(
    Math.random() * canvas.width,
    Math.random() * canvas.height,
    Math.random() * 2,
    'white'
  ));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    star.draw();
  }
  requestAnimationFrame(animate);
}
animate();
