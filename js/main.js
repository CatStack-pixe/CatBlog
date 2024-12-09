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
  // 页面滚动时触发渐入效果
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const isElementInView = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const handleScroll = () => {
    fadeElements.forEach(element => {
      if (isElementInView(element)) {
        element.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初次加载时检查元素是否已在视野中
});

document.addEventListener('DOMContentLoaded', function() {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.classList.add('fade-in');
  }
});
