window.addEventListener('load', () => {
    const progress = document.querySelector('.progress');
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const backgroundMusic = document.getElementById('background-music');
  
    // 播放背景音乐
    backgroundMusic.play();
  
    // 模拟加载进度
    let progressWidth = 0;
    const progressInterval = setInterval(() => {
      progressWidth += 2; // 每次增加2%的进度
      progress.style.width = progressWidth + '%';
  
      if (progressWidth >= 100) {
        clearInterval(progressInterval);
  
        // 加载完成后，延迟2秒跳转到主页
        setTimeout(() => {
          loaderWrapper.style.opacity = 0;
          setTimeout(() => {
            window.location.href = 'homepage.html'; // 跳转到主页
          }, 1000); // 延迟1秒，让淡出动画生效
        }, 1000);
      }
    }, 50); // 每50ms增加进度
  
  });

  // 页面加载完毕后，播放背景音乐，并在加载完成时跳转
window.addEventListener("load", () => {
  const audio = document.getElementById('background-music');
  audio.play();  // 播放背景音乐
  
  setTimeout(() => {
    window.location.href = "homepage.html";  // 加载完毕后跳转到主页
  }, 5000);  // 加载动画持续5秒，之后跳转
});

  