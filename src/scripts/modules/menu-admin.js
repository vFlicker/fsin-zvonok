const admin = document.querySelector('.admin');

if (admin) {
  const button = admin.querySelector('.header-admin__toggle');
  const menu = admin.querySelector('.admin-menu');

  const onButtonClick = () => {
    menu.classList.toggle('admin-menu--active');
  };

  button.addEventListener('click', onButtonClick);
}
