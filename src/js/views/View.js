import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _parentElement;
  _errorMessage = "We couldn't find recipe. Please try another one!";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    this._parentElement.innerHTML = this._generateMarkup();
  }

  renderSpinner() {
    this._parentElement.innerHTML = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._parentElement.innerHTML = html;
  }
}
