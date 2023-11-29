const container = document.querySelector('.testimonials__track-container');
const track = document.querySelector('.testimonials__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.testimonials__button--right');
const prevButton = document.querySelector('.testimonials__button--left');
const dotsNav = document.querySelector('.testimonials__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

let index = 1;

track.style.transform = 'translateX(' + (-100/slides.length) + '%)';

// shifting the whole track by a slide's length and changing 
// the current slide class to the next/prev slide that gets there
const moveToSlide = (track) => {
    track.style.transform = 'translateX(' + (index*-100/slides.length) + '%)';
};

// to update which dot is the "current" one - the one in positon left: 0
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const moveForwards = (track) => {
    // prevents a bug when user moves too fast for a transition to finish
    if (index >= slides.length-1) return;
    // returns transition to normal after jumping from one edge to another
    track.style.transition = 'transform 500ms ease-in-out';
    // determines what the slide and dot to jump to as next will be
    const currentDot = dotsNav.children[index];
    const nextDot = currentDot.nextElementSibling;

    index++;
    moveToSlide(track);
    updateDots(currentDot, nextDot);
}

const moveBackwards = () => {
    // prevents a bug when user moves too fast for a transition to finish
    if (index <= 0) return;
    // returns transition to normal after jumping from one edge to another
    track.style.transition = 'transform 500ms ease-in-out';
    // determines what the slide and dot to jump to as previous will be
    const currentDot = dotsNav.children[index];
    const prevDot = currentDot.previousElementSibling;

    index--;
    moveToSlide(track);
    updateDots(currentDot, prevDot);
}

// slides move to the left after clicking left
prevButton.addEventListener('click', e => {
    moveBackwards(track);
});

// slides move to the right after clicking right
nextButton.addEventListener('click', e => {
    moveForwards(track);
});

// when nav indicators are clicked, move to that slide
dotsNav.addEventListener('click', e => {
    // what indicator was clicked on? 
    // as in, did we hit a dot at all and then which one was it?
    const targetDot = e.target.closest('button');
    // if you clicked anywhere on the div that's not a dot, it does nothing
    if (!targetDot) return;

    track.style.transition = 'transform 500ms ease-in-out';
    // the elements that we are on NOW
    const currentSlide = slides[index];
    const currentDot = dotsNav.children[index];
    // finds the index of a dot that we will jump to (next OR prev)
    index = dots.findIndex(dot => dot === targetDot);
    // target slide index is the same as the dot we are jumping to
    const targetSlide = slides[index];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// looping
track.addEventListener('transitionend', e => {
    if (index === slides.length-1) {
        // deleting transition so that we can jump seamlessly from 
        // copy of first slide at the end to first proper slide
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-100/slides.length) + '%)';
        const currentDot = dotsNav.children[index];
        index = 1;
        const targetDot = dotsNav.children[index];
        updateDots(currentDot, targetDot);
    } else if (index === 0) {
        // deleting transition so that we can jump seamlessly from 
        // copy of last slide at the beginning to last proper slide
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-100*(slides.length-2)/slides.length) + '%)';
        const currentDot = dotsNav.children[index];
        index = slides.length-2;
        const targetDot = dotsNav.children[index];
        updateDots(currentDot, targetDot);
    } else return;
}, false)


//
/// SCROLL-INTO-VIEW ANIMATION ///
//
const trackObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
		  setTimeout(() => {
        moveForwards(track);
      }, 500);
		}
		else return
	});
});
trackObserver.observe(track);

//
/// MOBILE SWIPING ///
//

function detectSwipe(id, func, deltaMin = 30) {
    // Tune deltaMin according to your needs. Near 0 it will almost
    // always trigger, with a big value it can never trigger.
    const swipe_det = {
      sX: 0,
      sY: 0,
      eX: 0,
      eY: 0
    }
    // Directions enumeration
    const directions = Object.freeze({
      UP: 'up',
      DOWN: 'down',
      RIGHT: 'right',
      LEFT: 'left'
    })
    let direction = null
    const el = document.getElementById(id)
    el.addEventListener('touchstart', function(e) {
      const t = e.touches[0]
      swipe_det.sX = t.screenX
      swipe_det.sY = t.screenY
    }, false)
    el.addEventListener('touchmove', function(e) {
      // Prevent default will stop user from scrolling, use with care
    //   e.preventDefault();
      const t = e.touches[0]
      swipe_det.eX = t.screenX
      swipe_det.eY = t.screenY
    }, false)
    el.addEventListener('touchend', function(e) {
      const deltaX = swipe_det.eX - swipe_det.sX
      const deltaY = swipe_det.eY - swipe_det.sY
      // Min swipe distance, you could use absolute value rather
      // than square. It just felt better for personnal use
      if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return
      // horizontal
      if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
        direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
      else // vertical
        direction = deltaY > 0 ? directions.UP : directions.DOWN
  
      if (direction && typeof func === 'function') func(el, direction)
  
      direction = null
    }, false)
  }
  
  function swipeLeftOrRight(el,dir) {
    if (dir === 'right') {
        moveBackwards(track);
    }

    if (dir === 'left') {
        moveForwards(track);
    }
    // console.log(`you swiped on element with id ${el.id} to ${dir} direction`);
  }

  detectSwipe('swipeTarget', swipeLeftOrRight);
  