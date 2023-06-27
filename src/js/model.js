import { camelCase } from 'lodash';

export const state = {
  recipe: {},
};

export const loadRecipe = async (hash) => {
  const objectKeysToCamelCase = (obj) =>
    Object.keys(obj).reduce((acc, item) => {
      return {
        ...acc,
        [camelCase(item)]: obj[item],
      };
    }, {});

  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${hash}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;

    state.recipe = objectKeysToCamelCase(recipe);
    // console.log(objectKeysToCamelCase(recipe));
  } catch (error) {
    alert(error);
  }
};
