// 获取文章数据
const articles = window.articlesData;

// 获取文章容器
const articlesContainer = document.getElementById("articles-container");

// 动态生成文章卡片
articles.forEach(article => {
  const card = document.createElement("div");
  card.classList.add("article-card");

  card.innerHTML = `
    <h3>${article.title}</h3>
    <p>${article.summary}</p>
    <a href="${article.url}">阅读更多 &raquo;</a>
  `;

  articlesContainer.appendChild(card);
});

// 粒子背景效果
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, radius, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 115, 230, 0.7)';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 反弹效果
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY *= -1;
    }

    this.draw();
  }
}

// 初始化粒子
function initParticles() {
  for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 5 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;

    particles.push(new Particle(x, y, radius, speedX, speedY));
  }
}

// 动画循环
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => p.update());

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// 页面加载时的渐入效果
document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.querySelector('.fade-in');
  if (mainContent) {
    mainContent.classList.add('fade-in');
  }
});

// 点击链接时触发粒子效果
document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', (event) => {
    // 在点击时调用粒子效果
    createParticles(event);
  });
});