const cards = document.querySelectorAll('.card');

if (cards) {
  const cardClick = (evt) => {
    const currentCard = evt.target.closest('.card');
    currentCard.classList.toggle('card--active');
  };

  cards.forEach((card) => card.addEventListener('click', cardClick));
}
