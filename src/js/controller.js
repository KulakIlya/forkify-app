import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfilling async/await
import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView..js';
if (module.hot) {
  module.hot.accept();
}

const handleRecipe = async () => {
  try {
    const hash = window.location.hash.slice(1);

    if (!hash) return;
    recipeView.renderSpinner();

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
    if (!query) return resultsView.renderError();

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const handlePagination = (page) => {
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

recipeView.addHandlerRender(handleRecipe);
searchView.addHandlerSearch(handleSearchResults);
paginationView.addEventHandler(handlePagination);
