import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _data;
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join('');
  }

  renderError(message = this._errorMessage) {
    const html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._parentElement.innerHTML = html;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
