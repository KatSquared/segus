let container = document.querySelector('#track');
let slides = Array.from(container.children);
let nextButton = document.querySelector('#btnRight');
let prevButton = document.querySelector('#btnLeft');

let index = 0;
let currentOffset = 0;
let direction = 1;

let slidesWidths = [];
// getting an array of slide widths
for (let i = 0; i < slides.length; i++) {
    slidesWidths.push(slides[i].clientWidth + 12);
    // console.log(container.clientWidth, (slides[i].clientWidth));
}
let amountToMove = slidesWidths[index];

// inactivating previous button on init
prevButton.classList.add('inactive');

// shifting the whole track by a slide's length
const moveToSlide = (slides) => {
    amountToMove = slidesWidths[index];
    let newOffset = currentOffset + amountToMove * direction;

    // inactivate nextButton if on last slide
    if (index >= slides.length-1) 
        nextButton.classList.add('inactive');
    else nextButton.classList.remove('inactive');
    // inactivate prevButton if on first slide
    if (index <= 0) 
        prevButton.classList.add('inactive');
    else prevButton.classList.remove('inactive');

    slides.forEach(slide => {
        slide.style.transform = 'translateX(' + newOffset + 'px)';
    });
    currentOffset = newOffset;
    
    // console.log('index:', index, 'moving:', direction * amountToMove, 'current offset:', currentOffset);
};

// slides move to the left after clicking left
prevButton.addEventListener('click', e => {
    // console.log('prev clicked');
    if (index <= 0) return;
    direction = 1;
    index--;
    moveToSlide(slides);
});

// slides move to the right after clicking right
nextButton.addEventListener('click', e => {
    if (index >= slides.length-1) return;
    // console.log('next clicked');
    direction = -1;
    index++;
    moveToSlide(slides);
});


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
    //   else // vertical
    //     direction = deltaY > 0 ? directions.UP : directions.DOWN
  
      if (direction && typeof func === 'function') func(el, direction)
  
      direction = null
    }, false)
  }
  
  function swipeLeftOrRight(el, dir) {
    if (dir === 'right') {
        if (index <= 0) return;
        direction = 1;
        index--;
        moveToSlide(slides);
    }
    
    if (dir === 'left') {
        if (index >= slides.length-1) return;
        direction = -1;
        index++;
        moveToSlide(slides);
    }
    console.log(`you swiped on element with id ${el.id} to ${dir} direction`);
  }

  detectSwipe('track', swipeLeftOrRight);