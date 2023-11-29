const cardsList = document.querySelector('.places__list'); // list of cards
const cardTemplate = document.querySelector('#card-template').content; // card template

function prepareCard(cardData, removeCallback) { // add card function
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent  = cardData.name;

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', (event) => {
    removeCallback(event.target);
  });

  return cardElement;
}

function addCard(cardElement) {
  cardsList.append(cardElement);
}

function removeCard(removeButton) { // remove card callback
  const cardToRemove = removeButton.closest('.card');
  cardToRemove.remove();
}

initialCards.forEach((card_data) => { // add all cards from array loop
  addCard(prepareCard(card_data, removeCard));
});
