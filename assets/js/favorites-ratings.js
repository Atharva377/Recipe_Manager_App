// Favorites and Ratings Functionality

/**
 * Toggle favorite status
 */
function toggleFavorite(recipeId) {
  const recipes = loadRecipes()
  const recipe = recipes.find((r) => String(r.id) === String(recipeId))
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite
    saveRecipes(recipes)
    const btn = document.querySelector(`[data-favorite-btn="${String(recipeId)}"]`)
    if (btn) {
      btn.classList.toggle("active")
      btn.textContent = recipe.isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"
    }
    showSuccess(recipe.isFavorite ? "Added to favorites!" : "Removed from favorites!")
  }
}

/**
 * Set recipe rating
 */
function setRating(recipeId, rating) {
  const recipes = loadRecipes()
  const recipe = recipes.find((r) => String(r.id) === String(recipeId))
  if (recipe) {
    recipe.rating = rating
    saveRecipes(recipes)
    displayRecipeRating(recipe)
    showSuccess(`Recipe rated ${rating} stars!`)
  }
}

/**
 * Display recipe rating UI
 */
function displayRecipeRating(recipe) {
  const ratingContainer = document.getElementById("recipeRating")
  if (!ratingContainer) return

  let html = '<div class="recipe-rating"><strong>Your Rating:</strong>'
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${i <= recipe.rating ? "active" : ""}" data-star-index="${i}" data-recipe-id="${recipe.id}">★</span>`
  }
  html += "</div>"
  ratingContainer.innerHTML = html
  // attach listeners for the stars
  const stars = ratingContainer.querySelectorAll('.star')
  stars.forEach(function (s) {
    s.addEventListener('click', function () {
      const idx = this.getAttribute('data-star-index')
      const rid = this.getAttribute('data-recipe-id')
      setRating(rid, Number(idx))
    })
  })
}