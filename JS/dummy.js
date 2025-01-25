const menu = document.querySelector('.menu');
const open_menu_btn = document.querySelector('.open-menu-btn');
const close_menu_btn = document.querySelector('.close-menu-btn');

[open_menu_btn, close_menu_btn].forEach(btn => {
    btn.addEventListener('click', () => {
        menu.classList.toggle("open");
        menu.style.transition = "transform 0.5s ease";
    });
});

menu.addEventListener("transitionend", function() {
    this.removeAttribute("style");
});

menu.querySelectorAll(".dropdown > i").forEach((arrow) => {
    arrow.addEventListener("click", function() {
        // arrow.parentElement.classList.toggle("open");
        this.closest(".dropdown").classList.toggle("active");
    });
});

