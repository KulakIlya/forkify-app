import { API_URL, RES_PER_PAGE } from './config';
import { getJSON, objectKeysToCamelCase } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async (hash) => {
  try {
    const data = await getJSON(`${API_URL}/${hash}`);
    const { recipe } = data.data;

    state.recipe = objectKeysToCamelCase(recipe);

    if (state.bookmarks.some((bookmark) => bookmark.id === hash))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map((recipe) =>
      objectKeysToCamelCase(recipe)
    );
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * 10;
  const end = page * 10;
  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  const { ingredients } = state.recipe;
  ingredients.forEach((ingredient) => {
    ingredient.quantity *= newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);

  state.recipe.bookmarked = recipe.id === state.recipe.id;

  persistBookmarks();
};

export const removeBookmark = (id) => {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
