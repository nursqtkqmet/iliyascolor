function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('show');
        }
    });
}

let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.hide');

for (let elm of elements) {
    observer.observe(elm);
}

//Scroll
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll("nav ul li a");

    menuLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const yOffset = -60;
                window.scrollTo({
                    top: targetSection.offsetTop + yOffset,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Scroll to top
const scrollToTopButton = document.getElementById("scrollToTopButton");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
//Collage
// const collageSlider = document.querySelector(".collage-slider");
// let images = collageSlider.querySelectorAll("img");
//
// // Дублируем изображения для заполнения пустого пространства
// images.forEach((image) => {
//     const copy = image.cloneNode(true);
//     collageSlider.appendChild(copy);
// });
const collageSlider = document.querySelector('.collage-slider');

function copyImages() {
    const images = collageSlider.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
        const clone = images[i].cloneNode(true);
        collageSlider.appendChild(clone);
    }
}

copyImages();

const imageWidth = collageSlider.querySelector('img').clientWidth;
let scrollDirection = 1;

function scrollImages() {
    const currentScroll = collageSlider.scrollLeft;
    if (scrollDirection === 1 && currentScroll >= imageWidth) {
        scrollDirection = -1;
    } else if (scrollDirection === -1 && currentScroll <= 0) {
        scrollDirection = 1;
    }
    collageSlider.scrollLeft = currentScroll + 10 * scrollDirection;
}

setInterval(scrollImages, 100);