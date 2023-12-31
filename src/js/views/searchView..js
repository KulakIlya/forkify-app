import View from './View';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  #inputElement = this._parentElement.querySelector('input');

  getQuery() {
    const query = this.#inputElement.value;
    // console.log(query);
    this.#inputElement.value = '';
    return query;
  }

  #clearSearchField() {
    this._parentElement.querySelector('input').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
      this.#clearSearchField();
    });
  }
}

export default new SearchView();
