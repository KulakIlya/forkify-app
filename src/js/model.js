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
};

export const loadRecipe = async (hash) => {
  try {
    const data = await getJSON(`${API_URL}/${hash}`);
    const { recipe } = data.data;

    state.recipe = objectKeysToCamelCase(recipe);
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
