// Home Page Functionality

/**
 * Render recipe cards on home page
 */
function renderRecipes(recipes) {
  const grid = document.getElementById("recipesGrid")
  const emptyState = document.getElementById("emptyState")

  if (!grid) return

  grid.innerHTML = ""

  if (recipes.length === 0) {
    grid.style.display = "none"
    if (emptyState) emptyState.style.display = "block"
    return
  }

  grid.style.display = "grid"
  if (emptyState) emptyState.style.display = "none"

  recipes.forEach((recipe) => {
    const card = createRecipeCard(recipe)
    grid.appendChild(card)
  })
}

/**
 * Create a recipe card element
 */
function createRecipeCard(recipe) {
  const card = document.createElement("div")
  card.className = "recipe-card"

  const totalTime = recipe.prepTime + recipe.cookTime
  const imageUrl = recipe.imageUrl || DEFAULT_IMAGE
  const tagsHtml = (recipe.tags || [])
    .slice(0, 3)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("")
  const ratingDisplay = recipe.rating ? `⭐ ${recipe.rating}/5` : "Not rated"

  card.innerHTML = `
    <img src="${imageUrl}" alt="${recipe.title}" class="recipe-card-image" onerror="this.src='${DEFAULT_IMAGE}'">
    <div class="recipe-card-content">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div>
          <h3 class="recipe-card-title">${escapeHtml(recipe.title)}</h3>
          <div class="tags-container">${tagsHtml}</div>
        </div>
        <button class="favorite-btn ${recipe.isFavorite ? "active" : ""}" data-favorite-btn="${recipe.id}" onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" title="Add to favorites">
          ${recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="recipe-card-meta">
        <div class="recipe-meta-item">⏱️ ${formatTime(totalTime)}</div>
        <div class="recipe-meta-item">👥 ${recipe.servings}</div>
        <div class="recipe-meta-item">${ratingDisplay}</div>
      </div>
      <span class="difficulty-badge ${getDifficultyClass(recipe.difficulty)}">${recipe.difficulty}</span>
      <span class="difficulty-badge" style="background-color: #dbeafe; color: #1e40af;">${recipe.category || "Uncategorized"}</span>
      <p class="recipe-card-description">${escapeHtml(recipe.description || "A delicious recipe")}</p>
      <div class="recipe-card-actions">
        <button class="btn btn-primary btn-small" onclick="viewRecipe(${recipe.id})">View</button>

      </div>
    </div>
  `

  return card
}

/**
 * Filter and search recipes
 */
function filterRecipes() {
  const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || ""
  const difficulty = document.getElementById("difficultyFilter")?.value || ""
  const category = document.getElementById("categoryFilter")?.value || ""
  const maxPrepTime = Number.parseInt(document.getElementById("prepTimeFilter")?.value) || Number.POSITIVE_INFINITY
  const favoritesOnly = document.getElementById("favoriteFilter")?.checked || false

  let recipes = loadRecipes()

  recipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchTerm))
    const matchesDifficulty = !difficulty || recipe.difficulty === difficulty
    const matchesCategory = !category || recipe.category === category
    const matchesTime = recipe.prepTime <= maxPrepTime
    const matchesFavorite = !favoritesOnly || recipe.isFavorite

    return matchesSearch && matchesDifficulty && matchesCategory && matchesTime && matchesFavorite
  })

  renderRecipes(recipes)
}

/**
 * Reset all filters
 */
function resetFilters() {
  const searchInput = document.getElementById("searchInput")
  const difficultyFilter = document.getElementById("difficultyFilter")
  const categoryFilter = document.getElementById("categoryFilter")
  const prepTimeFilter = document.getElementById("prepTimeFilter")
  const favoriteFilter = document.getElementById("favoriteFilter")

  if (searchInput) searchInput.value = ""
  if (difficultyFilter) difficultyFilter.value = ""
  if (categoryFilter) categoryFilter.value = ""
  if (prepTimeFilter) prepTimeFilter.value = ""
  if (favoriteFilter) favoriteFilter.checked = false

  filterRecipes()
}

/**
 * View recipe details
 */
function viewRecipe(recipeId) {
  sessionStorage.setItem("selectedRecipeId", recipeId)
  window.location.href = "recipe-detail.html"
}

/**
 * Edit recipe
 */
function editRecipe(recipeId) {
  sessionStorage.setItem("editRecipeId", recipeId)
  window.location.href = "add-recipe.html"
}

/**
 * Delete recipe with confirmation
 */
function deleteRecipe(recipeId) {
  if (!confirm("Are you sure you want to delete this recipe?")) {
    return
  }

  try {
    let recipes = loadRecipes()
    recipes = recipes.filter((r) => r.id !== recipeId)
    saveRecipes(recipes)
    filterRecipes()
    showSuccess("Recipe deleted successfully!")
  } catch (error) {
    showError("Failed to delete recipe.")
  }
}

/**
 * Duplicate recipe
 */
function duplicateRecipe(recipeId) {
  const recipes = loadRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    showError("Recipe not found.")
    return
  }

  const duplicatedRecipe = {
    ...recipe,
    id: generateId(),
    title: `${recipe.title} (Copy)`,
    createdAt: new Date().toISOString(),
    isFavorite: false,
    rating: 0,
  }

  recipes.push(duplicatedRecipe)
  saveRecipes(recipes)
  showSuccess(`Recipe "${recipe.title}" duplicated successfully!`)
  filterRecipes()
}