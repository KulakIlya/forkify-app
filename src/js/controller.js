import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfilling async/await
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView..js';
if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const handleRecipe = async () => {
  try {
    const hash = window.location.hash.slice(1);

    if (!hash) return;
    recipeView.renderSpinner();

    // 2) Loading recipe
    await model.loadRecipe(hash);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const handleSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

recipeView.addHandlerRender(handleRecipe);
searchView.addHandlerSearch(handleSearchResults);
