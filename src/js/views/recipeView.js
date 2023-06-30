import Fraction from 'fraction.js';
import icons from 'url:../../img/icons.svg';
import View from './View';

class RecipeView extends View {
  _data;
  _parentElement = document.querySelector('.recipe');
  _errorMessage = "We couldn't find recipe. Please try another one!";

  _generateMarkup() {
    const {
      imageUrl,
      title,
      cookingTime,
      servings,
      ingredients,
      publisher,
      sourceUrl,
    } = this._data;

    return `
    <figure class="recipe__fig">
      <img src="${imageUrl}" alt="${title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${servings}</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${ingredients.reduce((acc, { quantity, unit, description }) => {
          return (
            acc +
            `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          quantity ? new Fraction(quantity).toFraction() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>`
          );
        }, '')}
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${publisher}
      </p>
      <a
        class="btn--small recipe__btn"
        href=${sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
   `;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
    window.addEventListener('hashchange', handler);
  }
}

export default new RecipeView();
