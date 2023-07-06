import icons from 'url:../../img/icons.svg';
import View from './View';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const hash = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        hash === this._data.id ? 'preview__link--active' : 'x'
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.imageUrl}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.title}</h4>
          <p class="preview__publisher">${this._data.publisher}</p>
          <div class="preview__user-generated ${
            this._data.key ? '' : 'hidden'
          }">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `;
  }
}

export default new PreviewView();
