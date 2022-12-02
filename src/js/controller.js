// create connection to model
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

// const recipeContainer = document.querySelector('.recipe');

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

// VIDEO 290. Listening For load and hashchange Events
// listen for hash change, take hash from url, take the id load recipe from id
// fake url change to listen to event (used anchor tag to link to a recipe)
//

// dry up code, loop the events
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const init = function () {
  // pass controlRecipes to the RecipeView.addHandlerRender(hanlder)
  recipeView.addHandlerRender(controlRecipes);
};
init();
