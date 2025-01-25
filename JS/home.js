
// marquee
document.addEventListener('DOMContentLoaded', () => {
    const marqueeContainer = document.querySelector('.marquee-container'); 
    const marqueeTexts = document.querySelectorAll('.marquee-text'); 

    marqueeContainer.addEventListener('mouseenter', () => {
        marqueeTexts.forEach(text => text.style.animationPlayState = 'paused');
    });

    marqueeContainer.addEventListener('mouseleave', () => {
        marqueeTexts.forEach(text => text.style.animationPlayState = 'running');
    });
});

// carousel
window.onload = function() { 
    sliderContainer = document.getElementById('slider-container'); 
};
const sliderItems = document.querySelectorAll('.slider-item');
const totalItems = sliderItems.length;
let currentIndex = 0;

function auto_slide() {
    if (sliderContainer) 
    {
        currentIndex = (currentIndex + 1) % totalItems;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    } 
}
setInterval(auto_slide, 3000);