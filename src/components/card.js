const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list'); // list of cards

function prepareCard(cardData, callbacks) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  const cardLike = cardElement.querySelector('.card__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent  = cardData.name;
  cardImage.addEventListener('click', function() {
    callbacks.openImageFullScreen(cardData.name, cardData.link);
  });
  cardLike.addEventListener('click', callbacks.like);

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', () => {
    callbacks.remove(cardElement);
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