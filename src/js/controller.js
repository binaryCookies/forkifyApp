// create connection to model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// Parcel
if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

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

// VIDEO 296. Implementing Search Results - Part 1
const controlSearchResults = async function () {
  try {
    // 297.
    resultsView.renderSpinner();

    // console.log(resultsView); // See Prototype

    // 296. 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);

    // 297.
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  // pass controlRecipes to the RecipeView.addHandlerRender(hanlder)
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
