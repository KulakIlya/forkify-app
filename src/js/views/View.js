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

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDOM.querySelectorAll('*')];

    const currentElements = [...this._parentElement.querySelectorAll('*')];

    newElements.forEach((elem, index) => {
      const currentElement = currentElements[index];

      if (
        !elem.isEqualNode(currentElement) &&
        elem.firstChild?.nodeValue.trim() !== ''
      )
        currentElement.textContent = elem.textContent;

      if (!elem.isEqualNode(currentElement)) {
        [...elem.attributes].forEach((attr) =>
          currentElement.setAttribute(attr.name, attr.value)
        );
      }
    });
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
