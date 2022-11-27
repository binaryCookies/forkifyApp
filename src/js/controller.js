// for static files like images use the url:
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

// VIDEO 288. Loading a Recipe from API
// VIDEO 289. Rendering the Recipe

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    //* 290. get entire URL: window.location
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Loading recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcfb2`
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);

    console.log(res, data);

    // Transform object properties from the server
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    // Rendering recipe
    const markup = `
  <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${recipe.ingredients
      .map(ing => {
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
      })
      // Transform array of string to one big string
      .join('')}
      
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;
    // Get rid of hardcode HTML before inserting HTML
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error(error);
  }
};
showRecipe();

// VIDEO 290. Listening For load and hashchange Events
// listen for hash change, take hash from url, take the id load recipe from id
// fake url change to listen to event (used anchor tag to link to a recipe)
//

// dry up code, loop the events
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, showRecipe)
);

//* /////////////////////////////////////////////////////////////////////////////////////////////
//* /////////////////////////////////////////////////////////////////////////////////////////////
// import * as model from './model.js';

// // for static files like images use the url:
// import icons from 'url:../img/icons.svg';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// // https://forkify-api.herokuapp.com/v2

// ///////////////////////////////////////

// // VIDEO 288. Loading a Recipe from API
// // VIDEO 289. Rendering the Recipe

// const renderSpinner = function (parentEl) {
//   const markup = `
//   <div class="spinner">
//           <svg>
//             <use href="${icons}#icon-loader"></use>
//           </svg>
//         </div>
//   `;
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// };

// const showRecipe = async function () {
//   try {
//     //* 290. get entire URL: window.location
//     // pass id to model
//     const id = window.location.hash.slice(1);
//     console.log(id);

//     if (!id) return;
//     renderSpinner(recipeContainer);

//     // Loading recipe
//     await model.loadRecipe(id);
//     const { recipe } = model.state.recipe;
//     console.log(recipe);

//     // Rendering recipe
//     const markup = `
//   <figure class="recipe__fig">
//     <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
//     <h1 class="">
//       <span>${recipe.title}</span>
//     </h1>
//   </figure>

//   <div class="recipe__details">
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href="${icons}#icon-clock"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--minutes">${
//         recipe.cookingTime
//       }</span>
//       <span class="recipe__info-text">minutes</span>
//     </div>
//     <div class="recipe__info">
//       <svg class="recipe__info-icon">
//         <use href="${icons}#icon-users"></use>
//       </svg>
//       <span class="recipe__info-data recipe__info-data--people">${
//         recipe.servings
//       }</span>
//       <span class="recipe__info-text">servings</span>

//       <div class="recipe__info-buttons">
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-minus-circle"></use>
//           </svg>
//         </button>
//         <button class="btn--tiny btn--increase-servings">
//           <svg>
//             <use href="${icons}#icon-plus-circle"></use>
//           </svg>
//         </button>
//       </div>
//     </div>

//     <div class="recipe__user-generated">
//       <svg>
//         <use href="${icons}#icon-user"></use>
//       </svg>
//     </div>
//     <button class="btn--round">
//       <svg class="">
//         <use href="${icons}#icon-bookmark-fill"></use>
//       </svg>
//     </button>
//   </div>

//   <div class="recipe__ingredients">
//     <h2 class="heading--2">Recipe ingredients</h2>
//     <ul class="recipe__ingredient-list">
//     ${recipe.ingredients
//       .map(ing => {
//         return `
//       <li class="recipe__ingredient">
//         <svg class="recipe__icon">
//           <use href="src/img/icons.svg#icon-check"></use>
//         </svg>
//         <div class="recipe__quantity">${ing.quantity}</div>
//         <div class="recipe__description">
//           <span class="recipe__unit">${ing.unit}</span>
//           ${ing.description}
//         </div>
//       </li>
//       `;
//       })
//       // Transform array of string to one big string
//       .join('')}

//     </ul>
//   </div>

//   <div class="recipe__directions">
//     <h2 class="heading--2">How to cook it</h2>
//     <p class="recipe__directions-text">
//       This recipe was carefully designed and tested by
//       <span class="recipe__publisher">${
//         recipe.publisher
//       }</span>. Please check out
//       directions at their website.
//     </p>
//     <a
//       class="btn--small recipe__btn"
//       href="${recipe.sourceUrl}"
//       target="_blank"
//     >
//       <span>Directions</span>
//       <svg class="search__icon">
//         <use href="src/img/icons.svg#icon-arrow-right"></use>
//       </svg>
//     </a>
//   </div>
//     `;
//     // Get rid of hardcode HTML before inserting HTML
//     recipeContainer.innerHTML = '';
//     recipeContainer.insertAdjacentHTML('afterbegin', markup);
//   } catch (error) {
//     console.error(error);
//   }
// };
// showRecipe();

// // VIDEO 290. Listening For load and hashchange Events
// // listen for hash change, take hash from url, take the id load recipe from id
// // fake url change to listen to event (used anchor tag to link to a recipe)
// //

// // dry up code, loop the events
// // window.addEventListener('hashchange', showRecipe);
// // window.addEventListener('load', showRecipe);
// ['hashchange', 'load'].forEach(event =>
//   window.addEventListener(event, showRecipe)
// );

// // console.log('hello');
