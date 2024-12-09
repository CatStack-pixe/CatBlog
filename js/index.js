window.addEventListener('load', () => {
  const progress = document.querySelector('.progress');
  const loaderWrapper = document.querySelector('.loader-wrapper');
  const pageWrapper = document.querySelector('.page-wrapper');
  const backgroundMusic = document.getElementById('background-music');

  // 播放背景音乐
  backgroundMusic.play();
  backgroundMusic.muted = false; // 解除静音

  // 模拟加载进度
  let progressWidth = 0;
  const progressInterval = setInterval(() => {
    progressWidth += 2; // 每次增加2%的进度
    progress.style.width = progressWidth + '%';

    if (progressWidth >= 100) {
      clearInterval(progressInterval);

      // 加载完成后，延迟2秒进行页面过渡动画
      setTimeout(() => {
        loaderWrapper.style.opacity = 0;  // 淡出加载动画

        // 启动页面滑入动画
        pageWrapper.classList.add('show'); // 添加 show 类触发动画

        // 延迟跳转到主页，确保动画效果完成
        setTimeout(() => {
          window.location.href = 'homepage.html'; // 跳转到主页
        }, 1000); // 延迟1秒，配合动画时间
      }, 2000);
    }
  }, 50);
});
