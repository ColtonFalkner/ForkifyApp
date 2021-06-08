import * as model from './model.js'
import recipeView from './views/recipeView'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

// const { async } = require('q')

const recipeContainer = document.querySelector('.recipe')

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(err)
  }
}
;['hashchange', 'load'].forEach((ev) => {
  window.addEventListener(ev, controlRecipes)
})
// window.addEventListener('hashchange', controlRecipes)
// window.addEventListener('load', controlRecipes)
