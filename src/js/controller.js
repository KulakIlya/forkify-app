import 'core-js/stable';
import 'regenerator-runtime/runtime'; // polyfilling async/await
import recipeView from './views/recipeView.js';

import * as model from './model.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async () => {
  try {
    const hash = window.location.hash.slice(1);

    if (!hash) return;

    recipeView.renderSpinner();

    const { loadRecipe, state } = model;

    await loadRecipe(hash);

    recipeView.render(state.recipe);
  } catch (error) {
    console.log(error);
  }
};

// showRecipe();

window.addEventListener('load', showRecipe);
window.addEventListener('hashchange', showRecipe);
