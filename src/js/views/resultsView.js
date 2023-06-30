import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'No results found for your query! Please try again';

  _generateMarkup() {
    return this._data
      .map(
        ({ publisher, imageUrl, title, id }) => `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#${id}">
        <figure class="preview__fig">
          <img src="${imageUrl}" alt="${title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${title}</h4>
          <p class="preview__publisher">${publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `
      )
      .join('');
  }
}

export default new ResultsView();
