import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

// Card data

const cardData = [
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

// Validation Options

const validationOptions = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

const editFormValidator = new FormValidator(validationOptions, profileForm);
const addFormValidator = new FormValidator(validationOptions, cardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*---------------------------Functions--------------------------*/

//function disableButton(button, options) {
// button.classList.add(options.inactiveButtonClass);
// button.disabled = true;
//}

function handlePreviewModal(name, link) {
  previewImageModalimg.src = link;
  previewImageModalimg.alt = name;
  previewImageModalCaption.textContent = name;
  openPopup(previewImageModal);
}

const renderCard = (cardData, cardListEl) => {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
};

/*------------------------Event Handlers------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopup(addCardModal);
  addFormValidator.disableButton(submitButton);
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

cardData.forEach((card) => renderCard(card, cardListEl));

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
