import { API_URL } from './config';
import { getJSON, objectKeysToCamelCase } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
