const body = document.querySelector('body');
const mainNav = body.querySelector('.main-nav');
const toggleButton = body.querySelector('.main-nav__toggle');

if (mainNav) {
  const toggleButtonClickHandler = (evt) => {
    evt.preventDefault();
    mainNav.classList.toggle('main-nav--open');
    body.classList.toggle('scroll-lock');
  };

  toggleButton.addEventListener('click', toggleButtonClickHandler);
}
