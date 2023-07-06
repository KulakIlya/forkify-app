import { API_URL, KEY, RES_PER_PAGE } from './config';
import { AJAX, objectKeysToCamelCase } from './helpers';

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
    const data = await AJAX(`${API_URL}/${hash}?key${KEY}`);
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

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
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

export const uploadRecipe = async (newRecipe) => {
  const { title, sourceUrl, image, publisher, cookingTime, servings } =
    newRecipe;
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith('ingredient') && entry[1])
      .map((ingredient) => {
        const ingredientsArr = ingredient[1]
          .split(',')
          .map((item) => item.trim());
        if (ingredientsArr.length != 3) {
          throw new Error(
            'Wrong ingredient format! Please use the correct format ;)'
          );
        }
        const [quantity, unit, description] = ingredientsArr;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });
    const recipe = {
      title,
      source_url: sourceUrl,
      image_url: image,
      publisher,
      cooking_time: Number(cookingTime),
      servings: Number(servings),
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
    state.recipe = objectKeysToCamelCase(data.data.recipe);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

init();
