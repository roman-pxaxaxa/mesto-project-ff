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

const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');


function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

function keepProfileData() {
  jobInputProfile.value = profileDescription.textContent;
  nameInputProfile.value = profileTitle.textContent;
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

initialCards.forEach((cardData) => { // add all cards from array loop
  addCard(prepareCard(cardData,
    {
      removeCard,
      likeCard,
      openImage
    }));
});

popupEditProfile.addEventListener('mousedown', closeModalOverlay);
popupNewCard.addEventListener('mousedown', closeModalOverlay);
popupTypeImage.addEventListener('mousedown', closeModalOverlay);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
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
  }, {
      removeCard,
      likeCard,
      openImage
  }));

  evt.target.reset()

  closeModal(popupNewCard);
}

formElementCard.addEventListener('submit', handleFormSubmitCard);
