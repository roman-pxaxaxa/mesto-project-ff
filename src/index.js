import {
  prepareCard,
  addCard,
  removeCard,
  likeCard
} from "./components/card.js";
import {
  initialCards
} from './components/cards'
import {
  openModal,
  closeModal,
  closeModalOverlay
} from "./components/modal.js";
import './pages/index.css';

const cardsList = document.querySelector('.places__list'); // list of cards
const profileEditButton = document.querySelector('.profile__edit-button'); // profile edit button
const profileAddButton = document.querySelector('.profile__add-button'); // profile add button

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileClose = popupEditProfile.querySelector('.popup__close');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardClose = popupNewCard.querySelector('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeImageClose = popupTypeImage.querySelector('.popup__close');

const formElementProfile = document.forms['edit-profile'];
const nameInputProfile = formElementProfile.querySelector('.popup__input_type_name');
const jobInputProfile = formElementProfile.querySelector('.popup__input_type_description');

const formElementCard = document.forms['new-place'];
const nameInputCard = formElementCard.querySelector('.popup__input_type_card-name');
const linkInputCard = formElementCard.querySelector('.popup__input_type_url');

function openImage(evt) {
  openModal(popupTypeImage);
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.textContent;
  popupCaption.alt = evt.target.textContent;
}

profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

function keepProfileData() {
  jobInputProfile.value = document.querySelector('.profile__description').textContent;
  nameInputProfile.value = document.querySelector('.profile__title').textContent;
}

profileEditButton.addEventListener('click', function() {
  keepProfileData();
  openModal(popupEditProfile);
});

popupNewCardClose.addEventListener('click', function() {
  closeModal(popupNewCard);
});

popupEditProfileClose.addEventListener('click', function() {
  closeModal(popupEditProfile);
});

popupTypeImageClose.addEventListener('click', function() {
  closeModal(popupTypeImage);
});

initialCards.forEach((card_data) => { // add all cards from array loop
  addCard(prepareCard(card_data, removeCard, likeCard, openImage));
});

popupEditProfile.addEventListener('click', closeModalOverlay);
popupNewCard.addEventListener('click', closeModalOverlay);
popupTypeImage.addEventListener('click', closeModalOverlay);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const job = jobInputProfile.value;
  const name = nameInputProfile.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(popupEditProfile);
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  addCard(prepareCard({
      name: nameInputCard.value,
      link: linkInputCard.value
  }, removeCard, likeCard, openImage));

  nameInputCard.value = '';
  linkInputCard.value = '';

  closeModal(popupNewCard);
}

formElementCard.addEventListener('submit', handleFormSubmitCard);
