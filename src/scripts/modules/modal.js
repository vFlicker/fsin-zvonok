const modalToggles = document.querySelectorAll('.toggle-modal');
const body = document.querySelector('body');
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const lockPadding = document.querySelectorAll('.lock-padding');
const timeout = 400;
const lockPaddingValue = `${window.innerWidth - body.offsetWidth}px`;
let unlock = true;

const bodyLock = () => {
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index += 1) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
};

const bodyUnLock = () => {
  if (unlock) {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index += 1) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
};

const onButtonCloseModalClick = (evt) => {
  evt.preventDefault();
  // eslint-disable-next-line no-use-before-define
  modalClose(evt.target.closest('.modal'));
};

const onModalEscPress = (evt) => {
  if (evt.keyCode === 27 || evt.code === 'Escape') {
    const modalActive = document.querySelector('.modal.modal--active');
    // eslint-disable-next-line no-use-before-define
    modalClose(modalActive);
  }
};

const onModalOutsideClick = (evt) => {
  if (!evt.target.closest('.modal__content')) {
    // eslint-disable-next-line no-use-before-define
    modalClose(evt.target.closest('.modal'));
  }
};

const onModalTabClick = (evt) => {
  const isTabPressed = evt.key === 'Tab' || evt.keyCode === 9;
  const firstFocusableElement = evt.target.querySelectorAll(focusableElements)[0];
  const focusableContent = evt.target.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (!isTabPressed) {
    return;
  }

  if (document.activeElement === firstFocusableElement) {
    lastFocusableElement.focus();
    evt.preventDefault();
  } else if (document.activeElement === lastFocusableElement) {
    firstFocusableElement.focus();
    evt.preventDefault();
  }
};

const modalClose = (modalActive, doUnlock = true) => {
  const buttonCloseModal = modalActive.querySelector('.modal__btn-close');

  if (unlock) {
    if (doUnlock) {
      bodyUnLock();
    }

    if (modalActive.classList.contains('modal--video')) {
      const modalVider = modalActive.querySelector('.modal__video');
      modalVider.innerHTML = '';
    }

    if (buttonCloseModal) {
      buttonCloseModal.removeEventListener('click', onButtonCloseModalClick);
    }

    modalActive.classList.remove('modal--active');
    modalActive.removeEventListener('mousedown', onModalOutsideClick);
    document.removeEventListener('keydown', onModalEscPress);
    modalActive.removeEventListener('keydown', onModalTabClick);
  }
};

const modalOpen = (curentModal, videoId = null) => {
  const modalActive = document.querySelector('.modal.modal--active');
  const buttonCloseModal = curentModal.querySelector('.modal__btn-close');
  const firstFocusableElement = curentModal.querySelectorAll(focusableElements)[0];

  if (curentModal && unlock) {
    if (videoId) {
      const videoWrapper = curentModal.querySelector('.modal__video');

      videoWrapper.innerHTML = (
        `<iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            allow="autoplay; encrypted-media"
            allowfullscreen>
        </iframe>
        `
      );
    }

    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyLock();
    }

    if (buttonCloseModal) {
      buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
    }

    curentModal.classList.add('modal--active');
    curentModal.addEventListener('mousedown', onModalOutsideClick);
    document.addEventListener('keydown', onModalEscPress);
    curentModal.addEventListener('keydown', onModalTabClick);

    setTimeout(() => {
      firstFocusableElement.focus();
      firstFocusableElement.blur();
    }, timeout);
  }
};

const onModalToggleClick = (evt) => {
  evt.preventDefault();
  const modalName = evt.target.getAttribute('data-target');
  const videoId = evt.target.getAttribute('data-video');
  const curentModal = document.querySelector(modalName);
  modalOpen(curentModal, videoId);
};

modalToggles.forEach((modalToggle) => {
  modalToggle.addEventListener('click', onModalToggleClick);
});
