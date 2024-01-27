import {
  makeRequestByType
} from "./api";
import {
  closeModal,
  openModal
} from "./modal";
import {
  popupRemoveCard,
  popupRemoveCardSubmit
} from "./values";

const cardTemplate = document.querySelector('#card-template').content;

let cardToRemove;

function prepareCard(cardData, openImage, likeCard, removeCard, profileId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;
  cardImage.addEventListener('click', function() {
    openImage(cardData.name, cardData.link);
  });
  const isLiked = cardData.likes.some(user => user._id === profileId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton, cardData._id);
  });

  const removeButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner._id === profileId) {
    removeButton.addEventListener('click', () => {
      openModal(popupRemoveCard);
      cardToRemove = {
        element: cardElement,
        data: cardData
      }
      popupRemoveCardSubmit.addEventListener('click', removeCard);
    });
  } else {
    removeButton.classList.add('card__delete-button-disabled');
  }
  return cardElement;
}

function removeCard() {
  makeRequestByType('DELETE', `cards/${cardToRemove.data._id}`, null)
    .then(() => {
      cardToRemove.element.remove();
      popupRemoveCardSubmit.removeEventListener('click', removeCard);
      closeModal(popupRemoveCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(likeElement, cardId) {
  const isLiked = likeElement.classList.contains('card__like-button_is-active');
  makeRequestByType(isLiked ? 'DELETE' : 'PUT', `cards/likes/${cardId}`, null)
    .then((card) => {
      likeElement.classList.toggle('card__like-button_is-active');
      const cardLikeCounter = likeElement.parentElement.querySelector('.card__like-counter');
      cardLikeCounter.textContent = card.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  prepareCard,
  removeCard,
  likeCard
}