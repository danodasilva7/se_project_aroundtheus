import Card from "../components/Card.js";
import formValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Wrappers

const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const cardForm = addCardModal.querySelector("#card-form");
const profileForm = profileEditModal.querySelector("#profile-form");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalimg = previewImageModal.querySelector(".modal__image");
const previewImageModalCaption =
  previewImageModal.querySelector(".modal__caption");

// Buttons and other DOM nodes
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const submitButton = document.querySelector(".modal__button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const previewImageCloseButton = previewImageModal.querySelector(
  ".modal__close_preview"
);
const closeButtons = document.querySelectorAll(".modal__close");
// Form Data
const nameInput = profileForm.querySelector(".modal__input_type_name");
const jobInput = profileForm.querySelector(".modal__input_type_description");

const cardTitleInput = cardForm.querySelector(".modal__input_type_title");

const cardUrlInput = cardForm.querySelector(".modal__input_type_url");

/*---------------------------Functions--------------------------*/

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  // find delete button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // add event listener to delete button
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //openPopup with previewImageModal
  cardImageEl.addEventListener("click", () => {
    previewImageModalimg.setAttribute("src", cardData.link);
    previewImageModalimg.setAttribute("alt", cardData.name);
    previewImageModalCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

/*------------------------Event Handlers------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditModal);
  disableButton(submitButton, options);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  disableButton(submitButton, options);
  e.target.reset();
}

/*------------------------Event Listeners-----------------------*/
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

function handleEscapeKeyPress(e) {
  if (e.key === "Escape") {
    closeActivePopup();
  }
}

function handleOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closeActivePopup();
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.setAttribute("tabindex", "-1");
  popup.focus();
  popup.addEventListener("keydown", handleEscapeKeyPress);
  popup.addEventListener("click", handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("keydown", handleEscapeKeyPress);
  popup.removeEventListener("click", handleOverlayClick);
}

function closeActivePopup() {
  const popup = document.querySelector(".modal_opened");
  if (popup) {
    closePopup(popup);
  }
}
