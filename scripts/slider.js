/* -------------------------------------------------------------------------- */
/*                             slider (section 2)                             */
/* -------------------------------------------------------------------------- */

let carousel = d.querySelector('.carousel');

let sliderSection, sliderContainer, slider, sliderTitle, sliderButtons, sliderButtonPrev, sliderButtonNext, iconPrev, iconNext, sliderTrackUl, slideLi, slideItem, wrapperSlideImg, slideImg, slideContent, sliderP, sliderPrice, sliderDetailButton;

// This function generates 8 random numbers between 0 and  48 (the length of the "products" array) and pushes them into "randomIndexes"

let randomIndexes = [];
while (randomIndexes.length < 8) {
    let index = Math.floor(Math.random() * products.length);
    if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
    }
}

sliderSection = d.createElement('section');
sliderSection.setAttribute('class', 'slider');

sliderContainer = d.createElement('div');
sliderContainer.setAttribute('class', 'sliderContainer');

slider = d.createElement('div');
slider.setAttribute('class', 'slider');

sliderTitle = d.createElement('div');
sliderTitle.setAttribute('class', 'sliderTitle');

sliderButtons = d.createElement('div');
sliderButtons.setAttribute('class', 'sliderButtons');

sliderButtonPrev = d.createElement('button');
sliderButtonPrev.setAttribute('class', 'sliderButtonArrow');
sliderButtonPrev.setAttribute('data-slider-prev', '');

iconPrev = d.createElement('i');
iconPrev.setAttribute('class', 'fa fa-angle-left');

sliderButtonNext = d.createElement('button');
sliderButtonNext.setAttribute('class', 'sliderButtonArrow');
sliderButtonNext.setAttribute('data-slider-next', '');

iconNext = d.createElement('i');
iconNext.setAttribute('class', 'fa fa-angle-right');

sliderTrackUl = d.createElement('ul');
sliderTrackUl.setAttribute('class', 'sliderTrack');
sliderTrackUl.setAttribute('data-slider-track', '');

// This loop takes the indexes from randomIndexes and based on the product that has that index, generates the slides of a slider. 
// Along with a listener to call the openModal() function and generate a modal

for (let index of randomIndexes) {

    let product = products[index];

    slideLi = d.createElement('li');

    slideItem = d.createElement('div');
    slideItem.setAttribute('class', 'slideItem');

    wrapperSlideImg = d.createElement('div');
    wrapperSlideImg.setAttribute('class', 'wrapperSlideImg');

    slideImg = d.createElement('img');
    slideImg.setAttribute('src', `assets/images/${product.category}/${product.brand}/${product.images[0]}`);
    slideImg.setAttribute('class', 'slideImg');
    slideImg.setAttribute('alt', product.name);

    slideContent = d.createElement('div');
    slideContent.setAttribute('class', 'slideContent');

    sliderP = d.createElement('p');
    sliderP.innerHTML = product.name;

    sliderPrice = d.createElement('p');
    sliderPrice.innerHTML = `$${product.price}`;

    sliderDetailButton = d.createElement('button');
    sliderDetailButton.setAttribute('class', 'sliderButton');
    sliderDetailButton.innerHTML = 'More Details';
    sliderDetailButton.addEventListener('click', () => openModal(product));

    slideContent.append(sliderP, sliderPrice);
    wrapperSlideImg.append(slideImg);
    slideItem.append(wrapperSlideImg, slideContent, sliderDetailButton);
    slideLi.append(slideItem);
    sliderTrackUl.append(slideLi);
    slider.append(sliderTrackUl);

}

sliderButtonPrev.append(iconPrev);
sliderButtonNext.append(iconNext);
sliderButtons.append(sliderButtonPrev, sliderButtonNext);
sliderTitle.append(sliderButtons);
slider.append(sliderTitle, sliderTrackUl);
sliderContainer.append(slider);
sliderSection.append(sliderContainer);

carousel.after(sliderSection);



/* -------------------------------------------------------------------------- */
/*                         slider movement management                         */
/* -------------------------------------------------------------------------- */
const prevButton = document.querySelector('[data-slider-prev]');
const nextButton = document.querySelector('[data-slider-next]');
const sliderTrack = document.querySelector('[data-slider-track]');


let slides = Array.from(sliderTrack.querySelectorAll('li'));

const updateSlider = (count) => {
    sliderTrack.innerHTML = ""; //clear current content
    slides.forEach((slide) => {
        sliderTrack.appendChild(slide.cloneNode(true));
    });
    addSliderButtonListeners(count);
};

prevButton.addEventListener("click", () => {
    slides.unshift(slides.pop().cloneNode(true));
    let lessCount = -1;
    updateSlider(lessCount);
});

nextButton.addEventListener("click", () => {
    slides.push(slides.shift().cloneNode(true));
    let moreCount = +1;
    updateSlider(moreCount);
});

let indexUpdate = 0;
function addSliderButtonListeners(count) {
    let sliderButtonListeners = document.querySelectorAll('.sliderButton');

    console.log(sliderButtonListeners);
    indexUpdate += count;

    if (indexUpdate === -1){
        indexUpdate = 7;
    }
    
    sliderButtonListeners.forEach((button, index) => {
        let ultimateIndex = (indexUpdate + index) % 8;
        console.log(indexUpdate, ultimateIndex);
        button.addEventListener('click', () => openModal(products[randomIndexes[ultimateIndex]]));
    });
    
console.log("asdas" + indexUpdate);
}




