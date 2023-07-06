import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully created';

  #overlay = document.querySelector('.overlay');
  #window = document.querySelector('.add-recipe-window');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');
  // #btnUpload = document.querySelector('.upload__btn');

  constructor() {
    super();
    this.#showWindow();
    this.hideWindow();
  }

  toggleWindow() {
    this.#window.classList.toggle('hidden');
    this.#overlay.classList.toggle('hidden');
  }

  #showWindow() {
    this.#btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  hideWindow() {
    this.#btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.#overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  upload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = Object.fromEntries([...new FormData(this)]); // Gets all data from the form

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
