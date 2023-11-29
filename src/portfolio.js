// 
// POPUP PREVIEW
//

const popup = document.getElementById('popup');
const allImages = Array.from(document.querySelectorAll('.portfolio-img img'));

let currentImg;
let currentImgIndex = 0;
let enlargedImg;

function openPopup(element) {
    popup.classList.remove('hidden');

    currentImg = element.children[0].children[0];

    currentImgIndex = allImages.indexOf(currentImg);
    console.log(currentImgIndex);

    enlargedImg = document.getElementById('enlarged-image');
    enlargedImg.src = allImages[currentImgIndex].src;
}

function closePopup() {
    popup.classList.add('hidden');
}

function prevImg() {
    if (currentImgIndex <= 0)
        return;
    currentImgIndex--;
    enlargedImg.src = allImages[currentImgIndex - 1].src;
}

function nextImg() {
    if (currentImgIndex >= allImages.length - 1)
        return;
    currentImgIndex++;
    enlargedImg.src = allImages[currentImgIndex].src;
}