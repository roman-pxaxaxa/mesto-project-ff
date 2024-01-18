const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list'); // list of cards

function prepareCard(cardData, removeCallback, likeCallback, openImageCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLike = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.textContent  = cardData.name;
  cardImage.addEventListener('click', openImageCallback);
  cardLike.addEventListener('click', likeCallback);

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', () => {
    removeCallback(cardElement);
  });

  return cardElement;
}

function addCard(cardElement) {
  cardsList.prepend(cardElement);
}

function removeCard(element) { // remove card callback
  element.remove();
}

function likeCard(evt) { // like card callback
  evt.target.classList.toggle('card__like-button_is-active');
}

export {prepareCard, addCard, removeCard, likeCard}