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

// Form Fields filled in with information from profile page
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

// Input for edit profile form modal
const inputTitle = document.querySelector(".modal__input_type_title");
const inputDesc = document.querySelector(".modal__input_type_description");

// Input for add image modal
const inputCardPlace = document.querySelector(".modal__input_type_place");
const inputCardURL = document.querySelector(".modal__input_type_url");

// List of all cards with images
const cardsList = document.querySelector(".cards__list");

// Functionality for Opening the Edit Profile Modal
const editProfileButton = document.querySelector(".profile__edit-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (e) => closeWithEscape(e, modal));
}

function fillProfileForm(profileTitle, profileDesc) {
  inputTitle.value = profileTitle;
  inputDesc.value = profileDesc;
}

function openEditProfileModal() {
  const editProfileModal = document.querySelector("#edit-modal");
  openModal(editProfileModal);
  fillProfileForm(profileTitle.textContent, profileDesc.textContent);
}

// Functionality for closing modals with Escape key
function closeWithEscape(e, modal) {
  if (e.key == "Escape") {
    closeModal(modal);
  }
}

editProfileButton.addEventListener("click", openEditProfileModal);

// Functionality for Closing the Edit Profile Modal
const modalEditProfileCloseButton = document.querySelector(
  ".modal__close-button"
);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", (e) => closeWithEscape(e, modal));
}

function closeEditProfileModal() {
  const modal = document.querySelector("#edit-modal");
  closeModal(modal);
}

modalEditProfileCloseButton.addEventListener("click", closeEditProfileModal);

// Functionality for Opening the Add Image Modal
const addButton = document.querySelector(".profile__add-button");

function openAddImageModal() {
  const addModal = document.querySelector("#add-modal");
  openModal(addModal);
}

addButton.addEventListener("click", openAddImageModal);

/* Functionality for Closing Add Image Modal */
const modalAddImageCloseButton = document.querySelector(
  "#modal-add-image-close"
);

function closeAddImageModal() {
  const modal = document.querySelector("#add-modal");
  closeModal(modal);
}

modalAddImageCloseButton.addEventListener("click", closeAddImageModal);

// Functionality for Save Submit Button Add Image Modal
// Save new Title (Name on Profile) and Description (Role or Job Title)

const modalEditProfileForm = document.querySelector("#edit-modal");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDesc.textContent = inputDesc.value;
  closeEditProfileModal();
}

modalEditProfileForm.addEventListener("submit", handleProfileFormSubmit);

//Functionality for clicking outside of the modal form to close it

const modals = document.querySelectorAll(".modal");
modals.forEach((modalElement) => {
  modalElement.addEventListener("click", (evt) => {
    console.log(evt.target);
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modalElement);
    }
  });
});

// Add new image card
const modalAddImageCardForm = document.querySelector("#add-image-form");

function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  cardPlace = inputCardPlace.value;
  cardUrl = inputCardURL.value;
  newCard = { name: cardPlace, link: cardUrl };
  newCardElement = getCardElement(newCard);
  cardsList.prepend(newCardElement);
  modalAddImageCardForm.reset();
  closeAddImageModal();
}

modalAddImageCardForm.addEventListener("submit", handleAddImageFormSubmit);

//Get element for Preview Image Modal in order to update with image and caption
const previewImageModal = document.querySelector("#preview-image-modal");

// Close Image Preview by Clicking on X
function closeImagePreviewModal() {
  closeModal(previewImageModal);
}

const closePreviewImageModalButton = document.querySelector(
  "#modal-preview-image-close"
);

closePreviewImageModalButton.addEventListener("click", () => {
  closeImagePreviewModal();
});

// Rendering cards from array with html template element
const cardTemplate = document.querySelector("#card__template").content;

// Create a new card

function getCardElement(data) {
  //Clone the template element with all its content and store in a cardElement variable
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  //Access the card title and image that was passed in and store them in variables
  const cardName = data["name"];
  const cardLink = data["link"];

  // Get card IMG element from the templated cardelement
  const cardImage = cardElement.querySelector(".card__image");

  //Set the path of the image to the link field of the object
  // cardElement.querySelector(".card__image").src = cardLink;
  cardImage.src = cardLink;

  //Set the image alt text to the name field of the object
  cardImage.alt = cardName;

  //Set the card title to the name field of the object, too
  cardCaption = cardElement.querySelector(".card__caption");
  cardCaption.textContent = cardName;

  // Create like button functionality once card is created
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Create delete button functionality once card is created
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Create Open Image Preview functionality - click card image for preview modal

  // Function that opens Preview Image Modal with correct image and caption
  function openPreviewImageModal() {
    openModal(previewImageModal);
    const previewCaption = document.querySelector(".modal__preview_caption");
    previewCaption.textContent = cardName;
    const previewImage = document.querySelector(".modal__preview_image");
    previewImage.src = cardLink;
    previewImage.alt = cardName;
  }

  // When card image is clicked is launches the modal
  cardImage.addEventListener("click", () => {
    openPreviewImageModal();
  });

  // Return the ready HTML element with the filled in data
  return cardElement;
}

// Create a loop and run getCardElement over the array initialCards
// In the loop, use appropriate built-in DOM method to add HTML element to this page

initialCards.forEach((card) => {
  const newCardElement = getCardElement(card);
  cardsList.append(newCardElement);
});
