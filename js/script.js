let scrollInterval = null;
let scrollSpeed = 5;
let isPaused = false;

// 获取DOM元素
const teleprompter = document.getElementById('teleprompter');
const scrollContent = document.getElementById('scroll-content');
const inputText = document.getElementById('input-text');
const speedInput = document.getElementById('speed');
const fontSizeSelect = document.getElementById('font-size');

// 更新文本内容
inputText.addEventListener('input', () => {
    scrollContent.textContent = inputText.value || 'تۆۋەندە سىيرىلىدىغان تېكىستنى كىرگۈزۈڭ...';
});

// 更新字体大小
function updateFontSize() {
    const fontSize = fontSizeSelect.value + 'px';
    scrollContent.style.fontSize = fontSize;
}

// 更新滚动速度
function updateSpeed() {
    scrollSpeed = speedInput.value;
    if (!isPaused && scrollInterval) {
        stopScroll();
        startScroll();
    }
}

// 开始滚动
function startScroll() {
    if (scrollInterval) return;
    const contentHeight = scrollContent.offsetHeight;
    const containerHeight = teleprompter.offsetHeight;
    let currentPosition = parseInt(scrollContent.style.top) || containerHeight;

    scrollInterval = setInterval(() => {
        if (!isPaused) {
            currentPosition -= scrollSpeed / 2;
            scrollContent.style.top = currentPosition + 'px';

            // 如果内容完全滚出屏幕，重置位置
            if (currentPosition < -contentHeight) {
                currentPosition = containerHeight;
            }
        }
    }, 16); // 约60fps
}

// 暂停滚动
function pauseScroll() {
    isPaused = !isPaused;
}

// 停止滚动并重置
function stopScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
    isPaused = false;
    scrollContent.style.top = '100%';
}

// 初始化字体大小
updateFontSize();    