NOTE _COPY Completed up to 299._ minute 16

## 292 Refactoring

API Documentation: https://forkify-api.herokuapp.com/v2

_Created a forkifyAppCopy to practice builing the App_

1. Starter is the code along getting putshed to Git
2. ForkifyAppCopy is app code to practice with

3. Controller Module dispatches:
   1. Calls the functions to be used from view and model.
      1. ex. controllRecipes calls loadRecipe from the Model and passes in id argument.
      2. controllerRecipes then calls render from the View
   2. Arguments get passed into the called function via controller
4. RecipeView Class View:
   1. Use of Class to easily inherit properties
   2. Data flow go through the controller from model to the RecipeView
5. Model Module

## 293. Helpers and Configuration Files

_Initialize app npm run start: Parcel build._

- config file
- helpers file
- refactoring getJSON
- adding timeout for bad HTTP request

1. Initialized Configuartion file. To store all the variables that should be constant and reuse throughout file
   Examples: fetch url, API keys
2. Initialized helpers.js: Used for helper functions like getting JSON

Initialized constant `TIMEOUT_SEC` in `config.js`, which makes the code readable rather than just having a number with no meaning @param
NOTE A pattern used to notate a config variable is to write in uppercase: TIMEOUT_SEC

Named import: `import { API_URL } from './config'`

##### As a consequence of refactoring the getJSON into the helper.js file:

We had one async function calling another async function.
The data variable in the helpers.js will be the resolved value of what getJSON promise returns.

Error handling Pro-Tip: In the helpers we throw an error on a bad http request and propagate that error down by re-throwing the error in the catch block so that the Promise that is being returned rejects.

## 294. Event Handlers in MVC: Publisher-Subscriber Pattern

Handle & Listen for events using Publisher-Subscriber Pattern

Current Challenge is putting addEventListener logic thats in the controller into the view without putting the controlRecipes function in the view

1. Events should be _handled_ in the _controller_ otherwise we would have application logic in the view
2. Events shoud be _listened_ for in the _view_ otherwise we would need DOM elements in the controller

   - Publisher (code knows when to react): addHandlerRender() because is contains addEventListener method
   - Subscriber (code that wants to react): controlRecipes() executed when event happens.

Separate the presentation logic from the application logic.

1. presentation logic: event as its to do with the DOM
2. application logic: controlRecipes function
   `['hashchange', 'load'].forEach(event =>`
   ` window.addEventListener(event, controlRecipes)`
   `);`

Our architecture: Our View does not import the controller therefore we can not call a controller function from the View

Solution:
Module Controller:
Subscriber: code that wants to react.

1. controlRecipes() will be passed into addHandler when program starts
2. init()

Class RecipeView:
Publisher: code that knows when to react

1. addHandleRender()
   - addHandlerRender listens for events and users controlRecipes as callback

Steps

1. Controller: User clicks and init function runs and it runs addHandlerRender() and is passing in controlRecipes
2. addHandler is listening for events in the View and now has access to controlRecipes. The key is the View did not call controlRecipes but it was passed in by the init function

## 295. Implementing Error and Success Messages

Create error using an id not on the server

New method in View to display the error message, copied the html snippet from index

RecipeView: Created a function to render error in stead of just logging to console.

Refactored the existing error message from the controller catch block to a private field in RecipeView and passed it in as a default message to renderError()

## 296. Implementing Search Results - Part 1

- loadSearchResults()
- controlSearchResults()

Flow:

1. User search
2. Load search results
3. Render search result

Bind the model view and controller together
Start with the data (easiest starting place)

1. Model create function that will be exported so it can be used by the controller,
   1. loadSearcResults(query): called by controller
2.

Transform the GET response data. The incomming data transform the keys to match the existing schema/key naming convention
nest a search object in the state object. The new object should contain the query and results

## 297. Implementing Search Results - Part 2

Create a parent Class to be able to use all methods in all classes

1. Model Function to loadSearchResults to get json, map over array and transform state
2. Controller, bring in function loadSearchResults(query) from Model.

NEXT take data and pass it to resultsView to render

- RecipeView import Parent Class
- Must stop using private `#` field and switch to protected methods
  1.Extracted View class from the recipe View. Now class RecipeView `extends` View

## 297. Implementing Search Results - Part 2

Refactor code to Parent Class. Reuse all methods throughout all views.

1. Take data from model and use it in controlSearchResults
2. Controller: Pass data to render method. (resultsView inherits render from View parent class)
3. resultsView: \_generateMarkup(), loop data results array with the HTML string to render
4. Error handling in View

## 298. Implementing Pagination - Part 1

To start coded a function that takes in a page number, sets that page number in the state object, defines a start page \* how many results to display per page, defines an end page and slices the data array from the defined start and end pages.

Model: defined getSearchResults().

- set state to store page
- - set _start_ to current page x 10
- - set _end_ page x 10 (results per page)
- - `return state.search.results.slice(start, end);`
    };
    Controller: calling the function getSearchResults to render the limit of search results according to out parameters

## 299. Implementing Pagination - Part 2

- Controller render getSearchResultsPage(), Testing: manually pass page number as argument

Step 1 Logic paginationView()

- PaginationView method start with logic that will:
  1.  Page 1: return text page 1: `if (this._data.page === 1 && numPages > 1)`
  2.  Last Page: return text last page: ` if (this._data.page === numPages && numPages > 1)`
  3.  Middle pages: return text other page (in between first and last)
  4.  Only 1 page: return text only one page

```
 // Page 1, and there ARE other pages
    if (currentPage === 1 && numPages > 1) {
      return 'page1, and others';
    }

    // Last  page (current page === to numPages)
    if (currentPage === numPages && numPages > 1) {
      return 'last page';
    }

    // Other Page
    if (currentPage < numPages) {
      return 'other page';
    }

    // Page 1, and ther are NO other pages
    return 'only 1 page';
```

Step 2 Generate Markup
Pagination markup replaced the returned text from Part 1

- paginationView: create addHandlerClick(handler) to listen for clicks of each button (event delegation)
- controller: testing - create new controller for pagination, controlPagination
- controller: pass controlPagination in the init method to connect controller to view to publish
- paginationView - custom data attributes: establish a connection between the dom and out code

  - custom data attributes: `data-goto="${currentPage + 1}"`
  - error handling null, for clicking out of button element
  - pass _gotoPage_ into _handler_

- model gets updated page value in the state object when getSearchResultsPage(goToPage) executes

Just to note current page -/+ 1 is to render the previous/next page number. Better UI experience to know where the button will anchor to if clicked.

## 301. Updating Recipe Servings

This section, Connect the DOM to the code

1. add controlServings (event handlers)
   1. update recipe servings (in the state)
   2. update the recipeView
2. call `model.UpdateServings(6)` in controller create the function in the model
3. recipeView get btn dataset value

## 302. Developing a DOM Updating Algorithm

Update DOM only where changes occured

Create updateServings method to solve, replace recipeView.render method in controller with new updateServings method
Virtual DOM. Create newDOM, convert string to real DOM node object `const newDOM = creatRange().createContextualFragment(newMarkup)`

- newEl.isEqualNode(curEl))
- nodeValue
- createRange()
- createContextualFragment()
- controller: resultsView.update(model.getSearchResultsPage());

## 303. Implementing Bookmarks - Part 1

fixed bug, on loadSearchResults added a page reset to page 1 when a new search is made
Use event delegation to listen for events on elements that do no exist by the time thhe App is loaded
check if array contains matching id

- controlAddBookmark()
- addHandlerAddBookmark()
- addBookmark() : push recipe it state.bookmarks
- deleteBookmark : function that deletes bookmark and sets bookmarked property to false
- some() : use some to set the properties of any element in the array. we set bookmarked value to true if... and false if...
- findIndex() : get the index of the the element in the bookmarks array that has a matching id the id passed in to deleteBookmark

## 304. Implementing Bookmarks - Part 2

- get markup to display bookmarks
- Create new view bookmarksView set parentElement to the bookmarks list class
- create new child class view to render the common markup, previewView.js
- add condition and a 2nd parameter to the render method in the View. return a string if condition met instead of iserting markup into the DOM and the string gets passed tho the bookmarksView generateMarkup method

## 305. Storing Bookmarks With localStorage

setItem: controller add function to set item to local storage _'bookmarks'_ with the value coming from _state.bookmarks_, must stringify value in local storage
getItem: cun init and get bookmarks out of local storage to render in preview
add handler in bookmarks view to render bookmarks on the load event

## 307. Uploading a New Recipe - Part 1

- created addRecipeView.js
- constructor method in addRecipeView
- super
- addHandlerShowWindow
- toggle class hidden attribute
- bind, manually set the this keyword in the event handler because the the this keyword inside an handler function points to the element on which the listener is attached to
- NOTE addHandlerUpload: used form data to get access to form data, `const data = [...new FormData(this)]`, must pass in an element that is a form
- Object.fromEntries: convert the entries data array to an object

## 308. Uploading a New Recipe - Part 2

- Model uploadRecipe(): create async function to make call to API
- startsWith(), filtered out array for keys that start with ingredient and the values are not an empty string
- tranform data to match our existing data structure
- return the transformed object with the quantity, unit and description keys
- sendJSON helpers file
- sending data using the fetch function:

## 309. Uploading a New Recipe - Part 3

window.history.pushState(null, '', `#${model.state.recipe.id}`)
We can use this api for other things, allows to change the url without reloading of the page.

example. window.history.back()

previewView: added icon markup and logic to show icon for recipes we uploaded
recipeView added hidden class to icon if user key is not in the recipe object
model load search results: added jet to search data

## 310. Wrapping Up: Final Considerations

Documentation: jsdocs.app

/\*\*
@param {Object | Object[]} data The data to be rendereed (eg recipe)
@param {boolean} [render=true] if false create markup string instead of rendering to the DOM

\*/

Features to implement

1. display number of pages between the pagination buttons
2. Ability to sort search results by duration or number of ingredients
3. Perform ingredient validation in view, before submitting the form
4. Improve recipe ingredient input: separate in multiple fields and allow more than 6 ingredients

5. Shopping list feature: button on recipe to add ingredients to a list
6. Weekly meal planning feature: assigne recipes to the next 7 days and show an a weekly calendar
7. Get nutrition data on each ingredient fro spoonacular API and calculate total calories of a recipe
   1. https://spoonacular.com/food-api

THE BUILD
We have been using run npm start (development) but now to deploy and compress we need to use npm run build for the final
Delete the parcel-cache and dist folders
package.json: rename the "main" to "default"
Setup netlify or surge accounts to host html, css, js files (no server side code or db's)

GIT

1. git init in top level project folders
2. connect local to gitHub: git config --global user.name binaryCookies -> ENTER
3. connect local to gitHub: git config --global user.email {enter gitHub email address} -> ENTER
4. git rm r- --cached .parcel-cache: recursively remove files that have previously been added to GIT
5. add files to staging area
6. reverting to older version (previous commit): git reset --hard HEAD, removes codes since last commit.
7. reverting to older version if already committed (not pushed):
   1. git log: copy ID of commit version we need
   2. type q for QUIT or sometimes :q
   3. git reset --hard {paste the id no brackets}
8. create new branch
   1. git branch: for list of branches
   2. Create new Branch: git branch nameOfTheBranch
   3. Switch branch: git checkout nameOfBranchToSwitchTo
   4. Commit new feature to the new branch
   5. switch back to Master branch to note new feature is not in the Master branch
   6. Merge changes: git merge new code with the current branch: git merge new-feature-branch

Pushing

1. Github create new repository
2. make private
3. skip the readme section if repository exists already
4. push existing repository to online repository
5. paste git remote origin + gitHub URL
6. git push origin [name of the branch]
7. 7. Each branch must be pushed separately

8. git commit –amend, amend last commit, good gor adding files/changes to the previous commit

Continous deployment of app with GitHub
link site to gitHub, follow directions,
step 3 input form: in build command use package.json build command: parcel build index.html --dist-dir ./dist
