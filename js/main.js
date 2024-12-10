document.addEventListener("DOMContentLoaded", () => {
  // 获取文章数据
  const articlesData = window.articlesData;
  
  // 获取文章容器
  const articlesContainer = document.getElementById("articles-container");

  // 遍历数据并动态生成文章卡片
  articlesData.forEach(article => {
    // 创建文章卡片
    const articleCard = document.createElement("div");
    articleCard.className = "article-card";

    // 创建标题
    const titleElement = document.createElement("h3");
    titleElement.textContent = article.title;

    // 创建摘要
    const summaryElement = document.createElement("p");
    summaryElement.textContent = article.summary;

    // 创建链接按钮
    const linkElement = document.createElement("a");
    linkElement.href = article.url;
    linkElement.textContent = "阅读更多";
    linkElement.className = "read-more";

    // 组装卡片内容
    articleCard.appendChild(titleElement);
    articleCard.appendChild(summaryElement);
    articleCard.appendChild(linkElement);

    // 添加到容器
    articlesContainer.appendChild(articleCard);
  });
});

// 在页面滚动时改变导航栏透明度
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.opacity = 1;
  } else {
    header.style.opacity = 0;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // 获取所有需要自动滚动的组件
  const sections = document.querySelectorAll(".auto-scroll-section");
  
  let isScrolling = false;

  const debounceScroll = (callback, delay) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  };

  const findClosestSection = () => {
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      if (distance < closestDistance) {
        closestSection = section;
        closestDistance = distance;
      }
    });

    return closestSection;
  };

  const handleScroll = debounceScroll(() => {
    if (isScrolling) return;
    const closestSection = findClosestSection();
    if (closestSection) {
      isScrolling = true;
      closestSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => {
        isScrolling = false;
      }, 800); // 防止过于频繁的触发
    }
  }, 100);

  // 监听滚动事件
  window.addEventListener("scroll", handleScroll);
});


document.addEventListener('DOMContentLoaded', function() {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.classList.add('fade-in');
  }
});

const backgroundMusic = document.getElementById('background-music');

// 播放背景音乐
backgroundMusic.play();
backgroundMusic.muted = false; // 解除静音

