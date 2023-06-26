const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async ()=>{
    try {
        const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886");
        const data = await res.json();
        const { recipe } = data.data;
        const normalizedKeysRecipe = Object.keys(recipe).reduce((acc, item)=>{
            return {
                ...acc,
                [camelCase(item)]: recipe[item]
            };
        }, {});
        console.log(normalizedKeysRecipe);
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    } catch (error) {
        console.log(error);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
