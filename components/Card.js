class Card {
  constructor(cardData, cardSelector, previewImageModal) {
    this._previewImageModal = previewImageModal;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    //card like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._toggleLike();
      });

    //card delete button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._cardElement.remove();
      });

    //preview image modal
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link, this._previewImageModal);
      });
  }

  _handleImageClick(name, link, modal) {
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    cardTitleEl.textContent = this._name;
    this.openPopup(modal);
  }

  openPopup(popup) {
    const popupElement = document.querySelector(".modal__image");
    if (popupElement) {
      popupElement.classList.add("modal_open");
    } else {
      console.error("Popup element not found");
    }
  }

  _toggleLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
