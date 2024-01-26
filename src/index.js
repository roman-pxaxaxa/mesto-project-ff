import * as values from './components/values'
import {
  prepareCard,
  addCard
} from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalOverlay
} from "./components/modal.js";
import {
  enableValidation,
  clearValidation
} from './components/validation.js'
import {
  getRequest,
  makeRequestByType
} from './components/api.js';
import './pages/index.css';

let profileId;

function initCards(cards) {
  cards.reverse().forEach((cardData) => {
    addCard(prepareCard(cardData, openImage, profileId));
  });
}

function initProfile(profile) {
  profileId = profile._id;
  values.profileTitle.textContent = profile.name;
  values.profileDescription.textContent = profile.about;
  values.profileImage.style.backgroundImage = `url(${profile.avatar})`
}

Promise.all([getRequest('users/me'), getRequest('cards')])
  .then(([profile, cards]) => {
    initProfile(profile);
    initCards(cards);
  });

function openImage(name, link) {
  values.popupImage.src = link;
  values.popupImage.alt = name;
  values.popupCaption.textContent = name;
  openModal(values.popupTypeImage);
}

values.profileAddButton.addEventListener('click', function() {
  clearValidation(values.formElementCard, values.validationConfig);
  openModal(values.popupNewCard);
});

function keepProfileData() {
  values.jobInputProfile.value = values.profileDescription.textContent;
  values.nameInputProfile.value = values.profileTitle.textContent;
}

values.profileEditButton.addEventListener('click', function() {
  keepProfileData();
  clearValidation(values.formElementProfile, values.validationConfig);
  openModal(values.popupEditProfile);
});

values.profileImage.addEventListener('click', () => {
  clearValidation(values.formElementAvatar, values.validationConfig);
  openModal(values.popupAvatar);
})

values.popupNewCardClose.addEventListener('click', function() {
  closeModal(values.popupNewCard);
});

values.popupEditProfileClose.addEventListener('click', function() {
  closeModal(values.popupEditProfile);
});

values.popupTypeImageClose.addEventListener('click', function() {
  closeModal(values.popupTypeImage);
});

values.popupRemoveCardClose.addEventListener('click', function() {
  closeModal(values.popupRemoveCard);
});

values.popupAvatarClose.addEventListener('click', function() {
  closeModal(values.popupAvatar);
});

values.popupEditProfile.addEventListener('mousedown', closeModalOverlay);
values.popupNewCard.addEventListener('mousedown', closeModalOverlay);
values.popupTypeImage.addEventListener('mousedown', closeModalOverlay);
values.popupRemoveCard.addEventListener('mousedown', closeModalOverlay);
values.popupAvatar.addEventListener('mousedown', closeModalOverlay);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const buttonText = values.popupEditProfileButton.textContent;
  values.popupEditProfileButton.textContent = values.savingPhrase;

  makeRequestByType('PATCH', 'users/me', {
      name: values.nameInputProfile.value,
      about: values.jobInputProfile.value
    })
    .then((profile) => {
      values.profileTitle.textContent = profile.name;
      values.profileDescription.textContent = profile.about;
      closeModal(values.popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      values.popupEditProfileButton.textContent = buttonText;
      evt.target.reset()
    });
}

function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const buttonText = values.popupNewCardButton.textContent;
  values.popupNewCardButton.textContent = values.savingPhrase;

  makeRequestByType('POST', 'cards', {
      name: values.nameInputCard.value,
      link: values.linkInputCard.value
    })
    .then((card) => {
      console.log(card);
      addCard(prepareCard(card, openImage, profileId));
      closeModal(values.popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      values.popupNewCardButton.textContent = buttonText;
      evt.target.reset()
    });
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  const buttonText = values.popupAvatarButton.textContent;
  values.popupAvatarButton.textContent = values.updatingPhrase;

  makeRequestByType('PATCH', '/users/me/avatar', {
      avatar: values.popupAvatarInput.value
    })
    .then((res) => {
      console.log(res);
      values.profileImage.style.backgroundImage = `url(${res.avatar})`;
      closeModal(values.popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      values.popupAvatarButton.textContent = buttonText;
      evt.target.reset();
    });
}

values.formElementCard.addEventListener('submit', handleFormSubmitCard);
values.formElementProfile.addEventListener('submit', handleFormSubmitProfile);
values.formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);
enableValidation(values.validationConfig);