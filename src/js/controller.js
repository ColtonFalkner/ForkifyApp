import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
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
  } catch (err) {
    recipeView.renderError()
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

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}

init()
