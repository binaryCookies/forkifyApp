import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // const res = await fetch(`${API_URL}/${id}`);

    // Transform object properties from the server
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}💥`);

    // 295. pass the err object ot controller
    throw err;
  }
};

// VIDEO 296. Implementing Search Results - Part 1
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(296, { data });

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`${err}💥`);
    throw err;
  }
};

// export const loadSearchResults2 = async function (query) {
//   try {
//     const data = await getJSON(`${API_URL}?search=${query}`);

//     state.search.results = data.data.recipes.map(rec => {
//       return {
//         id: rec.id,
//         title: rec.title,
//         publisher: rec.publisher,
//         image: rec.image_url,
//       };
//     });

//     console.log(state.search.results);
//   } catch (err) {
//     console.error(`${err}💥💥💥`);
//   }
// };
// loadSearchResults2('pasta');
