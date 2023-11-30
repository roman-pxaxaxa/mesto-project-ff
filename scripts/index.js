const cardsList = document.querySelector('.places__list'); // list of cards
const cardTemplate = document.querySelector('#card-template').content; // card template

function prepareCard(cardData, removeCallback) { // add card function
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.textContent  = cardData.name;

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', () => {
    removeCallback(cardElement);
  });

  return cardElement;
}

function addCard(cardElement) {
  cardsList.append(cardElement);
}

function removeCard(element) { // remove card callback
  element.remove();
}

initialCards.forEach((card_data) => { // add all cards from array loop
  addCard(prepareCard(card_data, removeCard));
});
