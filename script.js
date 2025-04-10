// 全局变量，用于控制滚动状态和速度
let scrollInterval = null;
// 初始滚动速度设为最小值 1
let scrollSpeed = 1;
// 滚动暂停状态标识
let isPaused = false;

// 获取页面 DOM 元素
const teleprompter = document.getElementById('teleprompter');
const scrollContent = document.getElementById('scroll-content');
const inputText = document.getElementById('input-text');
const speedInput = document.getElementById('speed');
const fontSizeSelect = document.getElementById('font-size');
// 获取全屏按钮和容器元素
const fullscreenBtn = document.getElementById('fullscreen-btn');
const container = document.querySelector('.container');

// 事件监听器：更新滚动内容文本
inputText.addEventListener('input', () => {
    // 若输入框有内容则显示输入内容，否则显示提示信息
    scrollContent.textContent = inputText.value || 'تۆۋەندە سىيرىلىدىغان تېكىستنى كىرگۈزۈڭ...';
});

// 函数：更新滚动内容字体大小
function updateFontSize() {
    const fontSize = fontSizeSelect.value + 'px';
    scrollContent.style.fontSize = fontSize;
}

// 函数：更新滚动速度
function updateSpeed() {
    // 将速度输入框的值转换为整数
    scrollSpeed = parseInt(speedInput.value, 10);
    // 若滚动未暂停且滚动定时器存在，停止并重新开始滚动
    if (!isPaused && scrollInterval) {
        stopScroll();
        startScroll();
    }
}

// 函数：开始滚动
function startScroll() {
    // 若滚动定时器已存在则不执行
    if (scrollInterval) return;

    // 获取滚动内容高度和容器高度
    const contentHeight = scrollContent.offsetHeight;
    const containerHeight = teleprompter.offsetHeight;
    // 设置初始滚动位置
    let currentPosition = parseInt(scrollContent.style.top) || containerHeight;

    // 滚动开始时隐藏输入框
    inputText.style.display = 'none';

    // 设置滚动定时器
    scrollInterval = setInterval(() => {
        if (!isPaused) {
            // 更新滚动位置
            currentPosition -= scrollSpeed / 2;
            scrollContent.style.top = currentPosition + 'px';

            // 若内容完全滚出屏幕，重置位置
            if (currentPosition < -contentHeight) {
                currentPosition = containerHeight;
            }
        }
    }, 16);
}

// 函数：暂停滚动
function pauseScroll() {
    // 切换暂停状态
    isPaused = !isPaused;
}

// 函数：停止滚动并重置
function stopScroll() {
    // 清除滚动定时器
    clearInterval(scrollInterval);
    scrollInterval = null;
    // 重置暂停状态
    isPaused = false;
    // 重置滚动内容位置
    scrollContent.style.top = '100%';

    // 停止滚动时显示输入框
    inputText.style.display = 'block';
}

// 全屏功能
fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullscreenBtn.textContent = 'پۈتۈن ئىكران';
        // 退出全屏时重置滚动内容位置
        scrollContent.style.top = '100%';
    } else {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
        fullscreenBtn.textContent = 'چىكىنىش';
        // 进入全屏时重置滚动内容位置
        scrollContent.style.top = '100%';
        // 确保提词器内容仅显示一屏
        const containerHeight = teleprompter.offsetHeight;
        const contentHeight = scrollContent.offsetHeight;
        if (contentHeight > containerHeight) {
            scrollContent.style.height = containerHeight + 'px';
            scrollContent.style.overflow = 'hidden';
        }
    }
});

// 初始化字体大小
updateFontSize();    