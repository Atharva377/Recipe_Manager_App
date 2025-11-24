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
  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i]
    try {
      // ensure recipe is a simple object
      if (!recipe || typeof recipe !== "object") {
        console.warn("Skipping invalid recipe at index", i, recipe)
        continue
      }
      // provide defaults for missing fields to avoid runtime errors in older browsers
      if (!recipe.title) recipe.title = "Untitled Recipe"
      if (!recipe.difficulty) recipe.difficulty = "Unknown"
      if (typeof recipe.prepTime !== "number") recipe.prepTime = Number(recipe.prepTime) || 0
      if (typeof recipe.cookTime !== "number") recipe.cookTime = Number(recipe.cookTime) || 0

      const card = createRecipeCard(recipe)
      if (card) grid.appendChild(card)
    } catch (err) {
      console.error("Error rendering recipe at index", i, err)
      // continue rendering other recipes
      continue
    }
  }
}

/**
 * Create a recipe card element
 */
function createRecipeCard(recipe) {
  const card = document.createElement("div")
  card.className = "recipe-card"

  const totalTime = Number(recipe.prepTime || 0) + Number(recipe.cookTime || 0)
  const imageUrl = recipe.imageUrl || DEFAULT_IMAGE

  // Image
  const img = document.createElement("img")
  img.src = imageUrl
  img.alt = recipe.title || "Recipe Image"
  img.className = "recipe-card-image"
  img.onerror = function () {
    this.src = DEFAULT_IMAGE
  }

  // Content wrapper
  const content = document.createElement("div")
  content.className = "recipe-card-content"

  // Header (title + favorite)
  const header = document.createElement("div")
  header.style.display = "flex"
  header.style.justifyContent = "space-between"
  header.style.alignItems = "start"

  const titleWrap = document.createElement("div")
  const titleEl = document.createElement("h3")
  titleEl.className = "recipe-card-title"
  titleEl.textContent = escapeHtml(recipe.title)

  const tagsContainer = document.createElement("div")
  tagsContainer.className = "tags-container"
  const tags = recipe.tags && Array.isArray(recipe.tags) ? recipe.tags.slice(0, 3) : []
  tags.forEach(function (t) {
    const span = document.createElement("span")
    span.className = "tag"
    span.textContent = escapeHtml(t)
    tagsContainer.appendChild(span)
  })

  titleWrap.appendChild(titleEl)
  titleWrap.appendChild(tagsContainer)

  const favBtn = document.createElement("button")
  favBtn.className = "favorite-btn" + (recipe.isFavorite ? " active" : "")
  favBtn.setAttribute("data-favorite-btn", String(recipe.id))
  favBtn.title = "Add to favorites"
  favBtn.textContent = recipe.isFavorite ? "❤️" : "🤍"
  favBtn.addEventListener("click", function (ev) {
    ev.stopPropagation()
    toggleFavorite(String(recipe.id))
  })

  header.appendChild(titleWrap)
  header.appendChild(favBtn)

  // Meta
  const meta = document.createElement("div")
  meta.className = "recipe-card-meta"
  const timeItem = document.createElement("div")
  timeItem.className = "recipe-meta-item"
  timeItem.textContent = "⏱️ " + formatTime(totalTime)
  const serveItem = document.createElement("div")
  serveItem.className = "recipe-meta-item"
  serveItem.textContent = "👥 " + (recipe.servings || 1)
  const ratingItem = document.createElement("div")
  ratingItem.className = "recipe-meta-item"
  ratingItem.textContent = recipe.rating ? "⭐ " + recipe.rating + "/5" : "Not rated"
  meta.appendChild(timeItem)
  meta.appendChild(serveItem)
  meta.appendChild(ratingItem)

  // Difficulty & category badges
  const diffBadge = document.createElement("span")
  diffBadge.className = "difficulty-badge " + getDifficultyClass(recipe.difficulty)
  diffBadge.textContent = recipe.difficulty
  const catBadge = document.createElement("span")
  catBadge.className = "difficulty-badge"
  catBadge.style.backgroundColor = "#dbeafe"
  catBadge.style.color = "#1e40af"
  catBadge.textContent = recipe.category || "Uncategorized"

  // Description
  const desc = document.createElement("p")
  desc.className = "recipe-card-description"
  desc.textContent = escapeHtml(recipe.description || "A delicious recipe")

  // Actions
  const actions = document.createElement("div")
  actions.className = "recipe-card-actions"
  const viewBtn = document.createElement("button")
  viewBtn.className = "btn btn-primary btn-small"
  viewBtn.textContent = "View"
  viewBtn.addEventListener("click", function () {
    viewRecipe(String(recipe.id))
  })
  actions.appendChild(viewBtn)

  // assemble
  content.appendChild(header)
  content.appendChild(meta)
  content.appendChild(diffBadge)
  content.appendChild(catBadge)
  content.appendChild(desc)
  content.appendChild(actions)

  card.appendChild(img)
  card.appendChild(content)

  return card
}

/**
 * Filter and search recipes
 */
function filterRecipes() {
  const searchEl = document.getElementById("searchInput")
  const difficultyEl = document.getElementById("difficultyFilter")
  const categoryEl = document.getElementById("categoryFilter")
  const prepTimeEl = document.getElementById("prepTimeFilter")
  const favoriteEl = document.getElementById("favoriteFilter")

  const searchTerm = searchEl && searchEl.value ? searchEl.value.toLowerCase() : ""
  const difficulty = difficultyEl && difficultyEl.value ? difficultyEl.value : ""
  const category = categoryEl && categoryEl.value ? categoryEl.value : ""
  const maxPrepTime = prepTimeEl && prepTimeEl.value ? Number.parseInt(prepTimeEl.value) || Number.POSITIVE_INFINITY : Number.POSITIVE_INFINITY
  const favoritesOnly = !!(favoriteEl && favoriteEl.checked)

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
  sessionStorage.setItem("selectedRecipeId", String(recipeId))
  window.location.href = "recipe-detail.html"
}

/**
 * Edit recipe
 */
function editRecipe(recipeId) {
  sessionStorage.setItem("editRecipeId", String(recipeId))
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
    recipes = recipes.filter((r) => String(r.id) !== String(recipeId))
    saveRecipes(recipes)
    filterRecipes()
    showSuccess("Recipe deleted successfully!")
  } catch (error) {
    showError("Failed to delete recipe.")
  }
}
