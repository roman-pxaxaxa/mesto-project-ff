function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closeModalOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}

export function openModal(element) {
  element.classList.toggle('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

export function closeModal(element) {
  element.classList.toggle('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}