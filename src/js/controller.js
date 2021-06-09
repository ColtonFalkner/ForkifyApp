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
    console.log(id)

    if (!id) return

    recipeView.renderSpinner()
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
    resultsView.render(model.getSearchResultsPage(4))

    //4. render initial pagination
    paginationView.render(model.state.search)
  } catch (err) {
    console.error(err)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}

init()
