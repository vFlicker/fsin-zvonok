const card = document.querySelector('.card');

if (card) {
  const cardTitles = card.querySelectorAll('.card__title');

  const onCardTitleClick = (evt) => {
    const cardHeader = evt.target.closest('.card__header');
    const cardContent = evt.target
      .closest('.card')
      .querySelector('.card__content');

    cardHeader.classList.toggle('card__header--active');
    cardContent.classList.toggle('card__content--active');
  };

  cardTitles.forEach((cardTitle) => cardTitle.addEventListener('click', onCardTitleClick));
}
