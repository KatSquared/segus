//
// SCROLL-INTO-VIEW ANIMATIONS 
//
const viewportWidth = window.innerWidth

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.target.classList.contains('animate')) {
            if (entry.isIntersecting) 
                entry.target.classList.add('animating');
            else return;
        } else return;
    });
});

const elementsToAnimate = document.querySelectorAll('.animate');
elementsToAnimate.forEach((el) => observer.observe(el));
console.log(elementsToAnimate);

