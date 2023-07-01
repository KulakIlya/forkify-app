import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addEventHandler(handler) {
    this._parentElement.addEventListener('click', ({ target }) => {
      const parent = target.closest('.btn--inline');
      if (parent?.classList.contains('btn--inline')) {
        handler(Number(parent.dataset.goto));
      }
    });
  }

  _generateMarkup() {
    const numberPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.page === 1 && numberPages > 1) {
      return `
        <button data-goto="${2}" class="btn--inline pagination__btn--next">
          <span>Page 2</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    if (this._data.page === numberPages && numberPages != 1) {
      return `
       <button data-goto="${
         this._data.page - 1
       }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;
    }
    if (this._data.page < numberPages) {
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    return '';
  }
}

export default new PaginationView();
