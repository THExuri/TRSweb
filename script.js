// 页面导航功能
function navigateTo(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(pageId).classList.add('active');
    
    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 初始化导航链接点击事件
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('data-page');
        navigateTo(pageId);
    });
});

// 背景音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isMusicPlaying = false;

// 尝试自动播放音乐（可能会被浏览器阻止）
function tryAutoPlay() {
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isMusicPlaying = true;
            musicIcon.textContent = '♫';
        })
        .catch(error => {
            isMusicPlaying = false;
            musicIcon.textContent = '♪';
        });
    }
}

// 页面加载后尝试自动播放
window.addEventListener('DOMContentLoaded', () => {
    tryAutoPlay();
});

// 音乐切换函数
function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '♪';
    } else {
        bgMusic.play();
        musicIcon.textContent = '♫';
    }
    isMusicPlaying = !isMusicPlaying;
}
window.addEventListener('scroll', updateTailPositions);
// 鼠标拖尾效果
function updateTailPositions() {
    points.forEach(point => {
        point.x = point.originalX + window.scrollX;
        point.y = point.originalY + window.scrollY;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#FFC107', '#4CAF50', '#2196F3', '#9C27B0'];
    let mouseX = 0;
    let mouseY = 0;
    let tails = [];
    
    // 跟踪鼠标位置
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 创建拖尾元素
    function createTail() {
        const tail = document.createElement('div');
        tail.className = 'tail';
        tail.originalX = mouseX;
        tail.originalY = mouseY;
        // 随机选择颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        tail.style.backgroundColor = color;
        
        // 随机大小
        const size = Math.random() * 10 + 5;
        tail.style.width = `${size}px`;
        tail.style.height = `${size}px`;
        
        // 设置初始位置
        tail.style.left = `${mouseX}px`;
        tail.style.top = `${mouseY}px`;
        
        document.body.appendChild(tail);
        
        // 添加到tails数组以便后续移除
        tails.push({
            element: tail,
            x: mouseX,
            y: mouseY,
            opacity: 0.6,
            size: size
        });
        
        // 限制tails数量
        if (tails.length > 20) {
            const oldTail = tails.shift();
            oldTail.element.remove();
        }

    }
    
    // 动画拖尾元素
    function animateTails() {
        tails.forEach((tail, index) => {
            // 减小不透明度
            tail.opacity -= 0.02;
            tail.element.style.opacity = tail.opacity;
            
            // 减小大小
            tail.size *= 0.98;
            tail.element.style.width = `${tail.size}px`;
            tail.element.style.height = `${tail.size}px`;
            
            // 如果完全透明，移除元素
            if (tail.opacity <= 0) {
                tail.element.remove();
                tails.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateTails);
    }
    
    // 开始动画
    animateTails();
    
    // 创建拖尾的间隔
    setInterval(createTail, 50);
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});