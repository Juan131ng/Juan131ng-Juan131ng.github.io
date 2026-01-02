// JavaScript 功能实现

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 首页轮播图功能
    initSlider();
    
    // 作品画廊自动播放功能
    initGalleryAutoPlay();
    
    // 联系表单验证功能
    initContactForm();
});

// 轮播图功能
function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;
    
    // 显示指定幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // 自动轮播
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // 初始化
    showSlide(currentSlide);
    startAutoSlide();
    
    // 按钮事件监听
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    // 鼠标悬停时停止自动轮播
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

// 作品画廊自动播放功能
function initGalleryAutoPlay() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!playBtn || !pauseBtn || galleryItems.length === 0) return;
    
    let autoPlayInterval;
    let currentIndex = 0;
    
    // 高亮显示当前图片
    function highlightItem(index) {
        galleryItems.forEach((item, i) => {
            item.style.transform = i === index ? 'scale(1.1)' : 'scale(1)';
            item.style.boxShadow = i === index ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // 下一张图片
    function nextGalleryItem() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        highlightItem(currentIndex);
    }
    
    // 开始自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextGalleryItem, 1500);
        playBtn.disabled = true;
        pauseBtn.disabled = false;
    }
    
    // 暂停自动播放
    function pauseAutoPlay() {
        clearInterval(autoPlayInterval);
        playBtn.disabled = false;
        pauseBtn.disabled = true;
        // 恢复所有图片的初始状态
        galleryItems.forEach(item => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // 按钮事件监听
    playBtn.addEventListener('click', startAutoPlay);
    pauseBtn.addEventListener('click', pauseAutoPlay);
}

// 联系表单验证功能
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // 表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 重置错误信息
        resetErrors();
        
        // 获取表单数据
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // 表单验证
        let isValid = true;
        
        if (name === '') {
            showError('name', '请输入您的姓名');
            isValid = false;
        }
        
        if (email === '') {
            showError('email', '请输入您的邮箱');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', '请输入有效的邮箱地址');
            isValid = false;
        }
        
        if (subject === '') {
            showError('subject', '请输入留言主题');
            isValid = false;
        }
        
        if (message === '') {
            showError('message', '请输入您的留言内容');
            isValid = false;
        }
        
        // 表单验证通过，显示成功信息
        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
            
            // 3秒后隐藏成功信息
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        }
    });
    
    // 邮箱格式验证
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 显示错误信息
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // 重置错误信息
    function resetErrors() {
        const fields = ['name', 'email', 'subject', 'message'];
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(fieldName + 'Error');
            
            field.classList.remove('error');
            errorElement.style.display = 'none';
        });
    }
    
    // 输入框焦点事件，移除错误状态
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.remove('error');
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
}

// 添加一些页面交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});