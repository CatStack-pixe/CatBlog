// 粒子效果函数
function createParticles(event) {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.appendChild(particlesContainer);
  
    const count = 30;
    const colors = ['#ff5722', '#00bcd4', '#4caf50', '#ffeb3b', '#9c27b0'];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${event.pageX - 10 + Math.random() * 20}px`;
      particle.style.top = `${event.pageY - 10 + Math.random() * 20}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
      particlesContainer.appendChild(particle);
  
      // 动画效果
      setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
        particle.style.opacity = 0;
      }, 50);
  
      // 删除粒子
      setTimeout(() => {
        particlesContainer.removeChild(particle);
      }, 1000);
    }
  
    // 移除粒子容器
    setTimeout(() => {
      document.body.removeChild(particlesContainer);
    }, 1200);
  }
  
  // 为链接添加点击事件，触发粒子效果
  document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('click', createParticles);
  });
  