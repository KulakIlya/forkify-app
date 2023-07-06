import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfilling async/await
import { MODAL_CLOSE_TIMEOUT } from './config.js';
import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView..js';
addRecipeView;
if (module.hot) {
  module.hot.accept();
}

const handleRecipe = async () => {
  try {
    const hash = window.location.hash.slice(1);

    if (!hash) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

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

const handleServings = (newServings) => {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const handleAddBookmark = () => {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const handleBookmarks = () => {
  bookmarkView.render(model.state.bookmarks);
};

const handleAddRecipe = async (newRecipe) => {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    addRecipeView.renderMessage();

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIMEOUT * 1000);

    recipeView.render(model.state.recipe);
    resultsView.render(model.state.search.results);

    bookmarkView.render(model.state.bookmarks);

    history.pushState(null, '', `#${model.state.recipe.id}`); // Changing URL without reloading the page
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error);
  }
};

const init = () => {
  bookmarkView.addHandlerRender(handleBookmarks);

  recipeView.addHandlerRender(handleRecipe);
  recipeView.addHandlerUpdateServings(handleServings);
  recipeView.addBookmarkHandler(handleAddBookmark);

  searchView.addHandlerSearch(handleSearchResults);

  paginationView.addEventHandler(handlePagination);

  addRecipeView.upload(handleAddRecipe);
};

init();
