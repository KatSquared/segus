//
// SCROLL-INTO-VIEW ANIMATIONS 
//
const viewportWidth = window.innerWidth

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.target.classList.contains('animate') && !entry.target.classList.contains('animated')) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animating');
                entry.target.classList.add('animated');
            }
            else return;
        } else return;
    });
});

const elementsToAnimate = document.querySelectorAll('.animate');
elementsToAnimate.forEach((el) => observer.observe(el));
// console.log(elementsToAnimate);

