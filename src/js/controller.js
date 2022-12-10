// create connection to model
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import { MODAL_CLOSE_SEC } from './config';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// Parcel
// if (module.hot) {
//   module.hot.accept();
// }

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

    // 0) Update resultsView to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe, returns a promise
    // get access to state.recipe from model
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 2) Rendering recipe, accept data and store in Class

    // const recipeView = new recipeView(model.state.recipe) // this could also work

    // 3) Updating bookmarksView
    console.log(state.recipe);
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    // console.error(error);
  }

  // NOTE TEST: this function placed here for testing
  // controlServings();
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

    console.log(model.state.search.results);

    // 3) Render results
    // 297., 298., 299
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

// VIDEO 299. Implementing Pagination - Part 2
const controlPagination = function (gotoPage) {
  console.log('pag controller', gotoPage);
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 2) Render NEW  pagination buttons
  paginationView.render(model.state.search);
};

// VIDEO 301. Updating Recipe Servings
const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // VIDEO 302.
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
};

// VIDEO 303. Implementing Bookmarks - Part 1
// VIDEO 304. Implementing Bookmarks - Part 2
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipeView
  recipeView.update(model.state.recipe);

  // 3) Render the bookmarks
  bookmarksView.render(model.state.bookmarks);

  console.log(model.state.recipe);
};

// 305.
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// 307.
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // console.log(newRecipe);    // Upload the new recipe data,
    await model.uploadRecipe(newRecipe);

    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render Success
    addRecipeView.renderMessage();

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`${err}💥💥`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  // pass controlRecipes to the RecipeView.addHandlerRender(hanlder)
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination); // 299.
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
