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
