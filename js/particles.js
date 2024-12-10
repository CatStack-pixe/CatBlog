const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// 动态调整画布大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 粒子数组
const particles = [];
const maxParticles = 200; // 最大粒子数
const mouseRadius = 120; // 鼠标或触摸点的作用半径
const mouse = { x: null, y: null, isActive: false };

// 鼠标事件监听
window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  mouse.isActive = true;
});

window.addEventListener('mouseleave', () => {
  mouse.isActive = false; // 鼠标移出时禁用效果
});

// 触摸事件监听（支持移动端）
window.addEventListener('touchmove', (event) => {
  const touch = event.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
  mouse.isActive = true;
});

window.addEventListener('touchend', () => {
  mouse.isActive = false; // 触摸结束时禁用效果
});

// 监听窗口大小变化
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 粒子类
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.lifeSpan = Math.random() * 5 + 3;
    this.opacity = 0;
    this.opacityStep = 1 / (this.lifeSpan * 60);
    this.directionAngle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 2 + 1;
    this.vx = Math.cos(this.directionAngle) * this.speed;
    this.vy = Math.sin(this.directionAngle) * this.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 透明度变化
    this.opacity += this.opacityStep;
    this.lifeSpan -= 1 / 60;

    // 边界处理
    if (this.x > canvas.width || this.x < 0) this.vx *= -1;
    if (this.y > canvas.height || this.y < 0) this.vy *= -1;

    // 鼠标或触摸点引力效果
    if (mouse.x && mouse.y && mouse.isActive) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        this.vx -= force * (dx / distance) * 0.1;
        this.vy -= force * (dy / distance) * 0.1;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, this.opacity))})`;
    ctx.fill();
  }

  isDead() {
    return this.lifeSpan <= 0 || this.opacity <= 0;
  }
}

// 创建粒子
function createParticle() {
  if (particles.length < maxParticles) {
    particles.push(new Particle());
  }
}

// 更新粒子数组
function updateParticles() {
  const activeParticles = [];
  particles.forEach((particle) => {
    particle.update();
    if (!particle.isDead()) {
      activeParticles.push(particle);
    }
  });
  particles.splice(0, particles.length, ...activeParticles);
}

// 连接粒子
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      if (distance < mouseRadius) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / mouseRadius})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  }
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createParticle();
  updateParticles();
  particles.forEach((particle) => particle.draw());
  connectParticles();
  requestAnimationFrame(animate);
}

// 启动动画
animate();
