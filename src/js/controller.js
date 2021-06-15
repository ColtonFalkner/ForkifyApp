import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept()
// }

// const { async } = require('q')

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return

    recipeView.renderSpinner()

    //update results to mark selected results view
    resultsView.update(model.getSearchResultsPage())

    //Loading Recipe
    await model.loadRecipe(id)

    //Rendering recipe
    recipeView.render(model.state.recipe)
    bookmarksView.update(model.state.bookmarks)
  } catch (err) {
    recipeView.renderError()
    console.log(err)
  }
}

const controlSearchResults = async function () {
  //1. Get search query
  try {
    resultsView.renderSpinner()

    const query = searchView.getQuery()
    if (!query) return
    //2. Load search results
    await model.loadSearchResults(query)

    //3. Render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage())

    //4. render initial pagination
    paginationView.render(model.state.search)
  } catch (err) {
    console.error(err)
  }
}

const controlPagination = function (goToPage) {
  //Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage))
  //Render NEW pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  //update the servings in state
  model.updateServings(newServings)
  //update the recipe view (increments of servings)
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //upload function otw
    await model.uploadRecipe(newRecipe)
  } catch (err) {
    console.error(err)
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()
