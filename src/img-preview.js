// 
// POPUP PREVIEW
//

const popupContainer = document.getElementById('popup-container');
const popup = document.getElementById('popup');
const prevBtn = document.querySelector('.prev-preview');
const nextBtn = document.querySelector('.next-preview');
const allImages = Array.from(document.querySelectorAll('.testimonials .slider-item > img'));
const sliderBtnLeft = document.getElementById('btnLeft');
const sliderBtnRight = document.getElementById('btnRight');
const toTopBtn = document.querySelector('.to-top');

let currentImg;
let currentImgIndex = 0;
let enlargedImg;
let isPopupOpen = false;

function openPopup(element) {
    popupContainer.classList.remove('hidden');
    popup.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    prevBtn.classList.remove('hidden');

    sliderBtnLeft.classList.add('hidden');
    sliderBtnRight.classList.add('hidden');
    toTopBtn.classList.add('hidden');

    currentImg = element.children[1];

    currentImgIndex = allImages.indexOf(currentImg);

    enlargedImg = document.getElementById('enlarged-image');
    enlargedImg.src = allImages[currentImgIndex].src;
    
    if (currentImgIndex >= allImages.length - 1)
        nextBtn.classList.add('hidden');
    if (currentImgIndex <= 0)
        prevBtn.classList.add('hidden');
    
    setTimeout(() => {
            isPopupOpen = true;
        }, 250);
}

function closePopup() {
    popupContainer.classList.add('hidden');
    popup.classList.add('hidden');

    sliderBtnLeft.classList.remove('hidden');
    sliderBtnRight.classList.remove('hidden');
    toTopBtn.classList.remove('hidden');

    isPopupOpen = false;
}

function prevImg() {
    if (currentImgIndex <= 0)
        return;
    currentImgIndex--;
    enlargedImg.src = allImages[currentImgIndex].src;
    nextBtn.classList.remove('hidden');
    if (currentImgIndex <= 0)
        prevBtn.classList.add('hidden');
}

function nextImg() {
    if (currentImgIndex >= allImages.length - 1)
        return;
    currentImgIndex++;
    enlargedImg.src = allImages[currentImgIndex].src;
    prevBtn.classList.remove('hidden');
    if (currentImgIndex >= allImages.length - 1)
        nextBtn.classList.add('hidden');
}

// Close on clicking outside the element

 document.addEventListener('click', (e) => {
        if (isPopupOpen) 
            if (!e.target.closest('#popup') && !e.target.closest('#imgNav')) 
            closePopup();
    })