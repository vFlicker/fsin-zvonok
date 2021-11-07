const slider = document.querySelector('.section-slider');

if (slider) {
  const slides = slider.querySelectorAll('.slide');
  const buttons = slider.querySelectorAll('.slider-footer__switchers .slider-footer__button');

  const onSliderButtonClick = (evt) => {
    const index = [...buttons].findIndex((button) => button === evt.target);
    const activeButton = slider.querySelector('.slider-footer__button--active');

    if (activeButton !== evt.target) {
      buttons.forEach((button) => button.classList.remove('slider-footer__button--active'));
      slides.forEach((slide) => slide.classList.remove('slide--active'));
    }

    buttons[index].classList.add('slider-footer__button--active');
    slides[index].classList.add('slide--active');
  };

  buttons.forEach((button) => button.addEventListener('click', onSliderButtonClick));
}
