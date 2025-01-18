class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._likeButton = this;
    this._deleteButton = this;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardEl;
  }

  _setEventListeners() {
    //preview image modal
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });

    //card like button
    this._likeButton.addEventListener("click", () => this.toggleLikeButton());

    // card delete button
    this._deleteButton.addEventListener("click", () => this.cardDeleteButton());
  }

  toggleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  cardDeleteButton() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
