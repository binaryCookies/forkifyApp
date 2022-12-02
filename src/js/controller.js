// create connection to model
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

// VIDEO 288. Loading a Recipe from API
// VIDEO 289. Rendering the Recipe

const controlRecipes = async function () {
  try {
    //* 290. get entire URL: window.location
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe, returns a promise
    // get access to state.recipe from model
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2)  Rendering recipe, accept data and store in Class
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe) // this could also work
  } catch (err) {
    recipeView.renderError();
    // console.error(error);
  }
};
controlRecipes();

// VIDEO 296. Implementing Search Results - Part 1
const contolSearchResults = async function () {
  try {
    // 296. 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};
contolSearchResults();

const init = function () {
  // pass controlRecipes to the RecipeView.addHandlerRender(hanlder)
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(contolSearchResults);
};
init();
