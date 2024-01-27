export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupEditProfileButton = popupEditProfile.querySelector('.button');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupNewCardButton = popupNewCard.querySelector('.button');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption');
export const popupRemoveCard = document.querySelector('.popup_type_remove-card');
export const popupRemoveCardSubmit = popupRemoveCard.querySelector('.button');
export const popupAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupAvatarInput = popupAvatar.querySelector('.popup__input');
export const popupAvatarButton = popupAvatar.querySelector('.button');

export const popupCloseButtons = document.querySelectorAll('.popup__close');

export const formElementAvatar = document.forms['edit-avatar'];

export const formElementProfile = document.forms['edit-profile'];
export const nameInputProfile = formElementProfile.querySelector('.popup__input_type_name');
export const jobInputProfile = formElementProfile.querySelector('.popup__input_type_description');

export const formElementCard = document.forms['new-place'];
export const nameInputCard = formElementCard.querySelector('.popup__input_type_card-name');
export const linkInputCard = formElementCard.querySelector('.popup__input_type_url');

export const profileDescription = document.querySelector('.profile__description');
export const profileTitle = document.querySelector('.profile__title');
export const profileImage = document.querySelector('.profile__image');

export const cardsList = document.querySelector('.places__list');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const savingPhrase = 'Сохранение...';
export const updatingPhrase = 'Обновление...';