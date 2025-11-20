// Recipe Manager Application
// All data is stored in browser localStorage under 'recipes' key

// ==================== CONSTANTS ====================
const STORAGE_KEY = "recipes"
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop"

// Initial recipe data - Veg Biryani
const DEFAULT_RECIPE = {
  id: Date.now(),
  title: "Veg Biryani",
  description:
    "A aromatic and flavorful vegetarian rice dish with layered vegetables and fragrant spices. This classic Indian recipe is perfect for special occasions and gatherings.",
  prepTime: 30,
  cookTime: 45,
  servings: 4,
  difficulty: "Medium",
  imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cda666?w=500&h=300&fit=crop",
  ingredients: [
    "2 cups basmati rice",
    "3 cups mixed vegetables (carrots, peas, potatoes)",
    "2 large onions, sliced",
    "4 tbsp ghee or vegetable oil",
    "4 green cardamom pods",
    "2 black cardamom pods",
    "1-inch cinnamon stick",
    "4 bay leaves",
    "6 cloves",
    "1 tsp cumin seeds",
    "2 cups yogurt",
    "4 garlic cloves, minced",
    "1 tbsp ginger, minced",
    "2 green chilies, sliced",
    "1/2 cup mint leaves",
    "1/2 cup cilantro leaves",
    "Salt to taste",
    "1/2 tsp saffron strands",
    "1/4 cup milk",
    "2 tbsp fried onions for garnish",
  ],
  steps: [
    "Wash the basmati rice thoroughly and soak for 30 minutes. Drain well.",
    "Cut all vegetables into uniform sizes and set aside.",
    "Heat 2 tbsp of ghee in a large pot and fry half of the sliced onions until golden brown. Set aside.",
    "In the same pot, add remaining ghee and sauté the other half of onions until soft.",
    "Add minced ginger-garlic paste to the onions and fry for 2 minutes.",
    "Add the mixed vegetables and cook for 5 minutes until slightly softened.",
    "Pour in the yogurt mixed with green chilies, mint, and cilantro. Cook for 3-4 minutes.",
    "Boil water in a separate pot with whole spices (cardamom, cinnamon, cloves, cumin, bay leaves). Salt generously.",
    "Add the soaked rice to the boiling spiced water and cook until 70% done. Drain well.",
    "Layer the rice over the vegetable mixture in the pot.",
    "Soak saffron in warm milk and pour over the rice layer.",
    "Cover the pot with foil then place the lid tightly (dum biryani).",
    "Cook on high heat for 3-4 minutes until steam forms, then reduce to low heat.",
    "Cook for 45-50 minutes until the rice is fully cooked and fragrant.",
    "Turn off heat and let it rest for 5 minutes without opening the lid.",
    "Carefully open the lid and gently mix the biryani with a fork.",
    "Transfer to a serving dish and garnish with fried onions, boiled eggs, and fresh mint.",
  ],
  createdAt: new Date().toISOString(),
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Initialize localStorage with default recipe if empty
 */
function initializeStorage() {
  try {
    const existingRecipes = localStorage.getItem(STORAGE_KEY)
    if (!existingRecipes || JSON.parse(existingRecipes).length === 0) {
      const initialRecipes = [DEFAULT_RECIPE]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes))
    }
  } catch (error) {
    console.error("Error initializing storage:", error)
    showError("Failed to initialize storage. Please clear browser data and try again.")
  }
}

/**
 * Load all recipes from localStorage
 */
function loadRecipes() {
  try {
    const recipes = localStorage.getItem(STORAGE_KEY)
    if (!recipes) {
      return []
    }
    return JSON.parse(recipes)
  } catch (error) {
    console.error("Error loading recipes:", error)
    showError("Failed to load recipes. Your data may be corrupted.")
    return []
  }
}

/**
 * Save recipes to localStorage
 */
function saveRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  } catch (error) {
    console.error("Error saving recipes:", error)
    showError("Failed to save recipes. Storage may be full.")
    throw error
  }
}

/**
 * Generate a unique ID
 */
function generateId() {
  return Date.now() + Math.random()
}

/**
 * Show error message
 */
function showError(message) {
  const errorContainer = document.getElementById("errorContainer")
  if (errorContainer) {
    errorContainer.textContent = message
    errorContainer.style.display = "block"
    setTimeout(() => {
      errorContainer.style.display = "none"
    }, 5000)
  }
}

/**
 * Show success message
 */
function showSuccess(message) {
  const successContainer = document.getElementById("successContainer")
  if (successContainer) {
    successContainer.textContent = message
    successContainer.style.display = "block"
    setTimeout(() => {
      successContainer.style.display = "none"
    }, 3000)
  }
}

/**
 * Get difficulty badge class
 */
function getDifficultyClass(difficulty) {
  const className = `difficulty-${difficulty.toLowerCase()}`
  return className
}

/**
 * Format time display
 */
function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

// ==================== HOME PAGE FUNCTIONALITY ====================

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
    emptyState.style.display = "block"
    return
  }

  grid.style.display = "grid"
  emptyState.style.display = "none"

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

  card.innerHTML = `
        <img src="${imageUrl}" alt="${recipe.title}" class="recipe-card-image" onerror="this.src='${DEFAULT_IMAGE}'">
        <div class="recipe-card-content">
            <h3 class="recipe-card-title">${escapeHtml(recipe.title)}</h3>
            <div class="recipe-card-meta">
                <div class="recipe-meta-item">⏱️ ${formatTime(totalTime)}</div>
                <div class="recipe-meta-item">👥 ${recipe.servings}</div>
            </div>
            <span class="difficulty-badge ${getDifficultyClass(recipe.difficulty)}">${recipe.difficulty}</span>
            <p class="recipe-card-description">${escapeHtml(recipe.description || "A delicious recipe")}</p>
            <div class="recipe-card-actions">
                <button class="btn btn-primary btn-small" onclick="viewRecipe(${recipe.id})">View</button>
                <button class="btn btn-secondary btn-small" onclick="editRecipe(${recipe.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
        </div>
    `

  return card
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Filter and search recipes
 */
function filterRecipes() {
  const searchTerm = document.getElementById("searchInput")?.value.toLowerCase() || ""
  const difficulty = document.getElementById("difficultyFilter")?.value || ""
  const maxPrepTime = Number.parseInt(document.getElementById("prepTimeFilter")?.value) || Number.POSITIVE_INFINITY

  let recipes = loadRecipes()

  recipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchTerm))
    const matchesDifficulty = !difficulty || recipe.difficulty === difficulty
    const matchesTime = recipe.prepTime <= maxPrepTime

    return matchesSearch && matchesDifficulty && matchesTime
  })

  renderRecipes(recipes)
}

/**
 * Reset all filters
 */
function resetFilters() {
  const searchInput = document.getElementById("searchInput")
  const difficultyFilter = document.getElementById("difficultyFilter")
  const prepTimeFilter = document.getElementById("prepTimeFilter")

  if (searchInput) searchInput.value = ""
  if (difficultyFilter) difficultyFilter.value = ""
  if (prepTimeFilter) prepTimeFilter.value = ""

  filterRecipes()
}

/**
 * View recipe details
 */
function viewRecipe(recipeId) {
  // Store the ID in sessionStorage for the detail page
  sessionStorage.setItem("selectedRecipeId", recipeId)
  window.location.href = "pages/recipe-detail.html"
}

/**
 * Edit recipe
 */
function editRecipe(recipeId) {
  sessionStorage.setItem("editRecipeId", recipeId)
  window.location.href = "pages/add-recipe.html"
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

// ==================== RECIPE DETAIL PAGE FUNCTIONALITY ====================

/**
 * Load and display recipe details
 */
function loadRecipeDetail() {
  const recipeId = Number.parseInt(sessionStorage.getItem("selectedRecipeId"))
  const detailContainer = document.getElementById("recipeDetail")

  if (!recipeId || !detailContainer) return

  const recipes = loadRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    showError("Recipe not found.")
    return
  }

  const imageUrl = recipe.imageUrl || DEFAULT_IMAGE
  const totalTime = recipe.prepTime + recipe.cookTime

  const stepsHtml = recipe.steps.map((step, index) => `<li data-step="${index + 1}">${escapeHtml(step)}</li>`).join("")

  const ingredientsHtml = recipe.ingredients.map((ingredient) => `<li>✓ ${escapeHtml(ingredient)}</li>`).join("")

  detailContainer.innerHTML = `
        <div class="recipe-detail-header">
            <img src="${imageUrl}" alt="${recipe.title}" class="recipe-detail-image" onerror="this.src='${DEFAULT_IMAGE}'">
            <div class="recipe-detail-overlay">
                <h1 class="recipe-detail-title">${escapeHtml(recipe.title)}</h1>
                <div class="recipe-detail-meta">
                    <div>⏱️ Total Time: ${formatTime(totalTime)}</div>
                    <div>👥 Servings: ${recipe.servings}</div>
                    <div>📊 Level: <span class="difficulty-badge ${getDifficultyClass(recipe.difficulty)}">${recipe.difficulty}</span></div>
                </div>
            </div>
        </div>

        <div class="recipe-detail-content">
            ${
              recipe.description
                ? `
                <div class="recipe-detail-section">
                    <p class="recipe-detail-description">${escapeHtml(recipe.description)}</p>
                </div>
            `
                : ""
            }

            <div class="recipe-detail-section">
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${ingredientsHtml}
                </ul>
            </div>

            <div class="recipe-detail-section">
                <h3>Cooking Steps</h3>
                <ol class="steps-list">
                    ${stepsHtml}
                </ol>
            </div>

            <div class="recipe-detail-actions">
                <a href="../index.html" class="btn btn-secondary">Back to Recipes</a>
                <button class="btn btn-primary" onclick="goToEdit(${recipeId})">Edit Recipe</button>
                <button class="btn btn-danger" onclick="deleteAndReturn(${recipeId})">Delete Recipe</button>
            </div>
        </div>
    `

  sessionStorage.removeItem("selectedRecipeId")
}

/**
 * Go to edit page
 */
function goToEdit(recipeId) {
  sessionStorage.setItem("editRecipeId", recipeId)
  window.location.href = "add-recipe.html"
}

/**
 * Delete recipe and return to home
 */
function deleteAndReturn(recipeId) {
  if (!confirm("Are you sure you want to delete this recipe?")) {
    return
  }

  try {
    let recipes = loadRecipes()
    recipes = recipes.filter((r) => r.id !== recipeId)
    saveRecipes(recipes)
    window.location.href = "../index.html"
  } catch (error) {
    showError("Failed to delete recipe.")
  }
}

// ==================== ADD/EDIT RECIPE FORM FUNCTIONALITY ====================

/**
 * Initialize form for add or edit mode
 */
function initializeForm() {
  const form = document.getElementById("recipeForm")
  const formTitle = document.getElementById("formTitle")
  const editRecipeId = sessionStorage.getItem("editRecipeId")

  if (!form) return

  if (editRecipeId) {
    // Edit mode
    const recipes = loadRecipes()
    const recipe = recipes.find((r) => r.id == editRecipeId)

    if (recipe) {
      formTitle.textContent = "Edit Recipe"
      populateForm(recipe)
    }
  }

  form.addEventListener("submit", handleFormSubmit)
}

/**
 * Populate form with recipe data
 */
function populateForm(recipe) {
  document.getElementById("title").value = recipe.title
  document.getElementById("description").value = recipe.description || ""
  document.getElementById("prepTime").value = recipe.prepTime
  document.getElementById("cookTime").value = recipe.cookTime
  document.getElementById("servings").value = recipe.servings
  document.getElementById("difficulty").value = recipe.difficulty
  document.getElementById("imageUrl").value = recipe.imageUrl || ""
  document.getElementById("ingredients").value = recipe.ingredients.join("\n")
  document.getElementById("steps").value = recipe.steps.join("\n")
}

/**
 * Validate form input
 */
function validateForm(formData) {
  const errors = []

  if (!formData.title.trim()) {
    errors.push("Recipe title is required.")
  }

  if (formData.title.length > 200) {
    errors.push("Recipe title must be less than 200 characters.")
  }

  if (formData.prepTime < 0 || isNaN(formData.prepTime)) {
    errors.push("Prep time must be a positive number.")
  }

  if (formData.cookTime < 0 || isNaN(formData.cookTime)) {
    errors.push("Cook time must be a positive number.")
  }

  if (formData.servings < 1 || isNaN(formData.servings)) {
    errors.push("Servings must be at least 1.")
  }

  if (!formData.difficulty) {
    errors.push("Difficulty level is required.")
  }

  if (formData.ingredients.length === 0) {
    errors.push("At least one ingredient is required.")
  }

  if (formData.steps.length === 0) {
    errors.push("At least one cooking step is required.")
  }

  if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
    errors.push("Please enter a valid image URL.")
  }

  return errors
}

/**
 * Check if URL is valid
 */
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault()

  const formData = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    prepTime: Number.parseInt(document.getElementById("prepTime").value),
    cookTime: Number.parseInt(document.getElementById("cookTime").value),
    servings: Number.parseInt(document.getElementById("servings").value),
    difficulty: document.getElementById("difficulty").value,
    imageUrl: document.getElementById("imageUrl").value.trim() || "",
    ingredients: document
      .getElementById("ingredients")
      .value.split("\n")
      .map((i) => i.trim())
      .filter((i) => i.length > 0),
    steps: document
      .getElementById("steps")
      .value.split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0),
  }

  // Validate form
  const errors = validateForm(formData)
  if (errors.length > 0) {
    showError(errors.join(" "))
    return
  }

  try {
    const recipes = loadRecipes()
    const editRecipeId = sessionStorage.getItem("editRecipeId")

    if (editRecipeId) {
      // Update existing recipe
      const index = recipes.findIndex((r) => r.id == editRecipeId)
      if (index !== -1) {
        recipes[index] = {
          ...recipes[index],
          ...formData,
          updatedAt: new Date().toISOString(),
        }
        showSuccess("Recipe updated successfully!")
      }
      sessionStorage.removeItem("editRecipeId")
    } else {
      // Create new recipe
      const newRecipe = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
      }
      recipes.push(newRecipe)
      showSuccess("Recipe added successfully!")
    }

    saveRecipes(recipes)

    // Reset form and redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "../index.html"
    }, 1500)
  } catch (error) {
    showError("Failed to save recipe. Please try again.")
  }
}

// ==================== EVENT LISTENERS ====================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize storage
  initializeStorage()

  // Determine current page and initialize accordingly
  const currentPage = window.location.pathname.split("/").pop()

  if (currentPage === "index.html" || currentPage === "") {
    // Home page
    filterRecipes()

    // Attach event listeners for search and filters
    const searchInput = document.getElementById("searchInput")
    const difficultyFilter = document.getElementById("difficultyFilter")
    const prepTimeFilter = document.getElementById("prepTimeFilter")
    const resetButton = document.getElementById("resetFilters")

    if (searchInput) {
      searchInput.addEventListener("input", filterRecipes)
    }

    if (difficultyFilter) {
      difficultyFilter.addEventListener("change", filterRecipes)
    }

    if (prepTimeFilter) {
      prepTimeFilter.addEventListener("input", filterRecipes)
    }

    if (resetButton) {
      resetButton.addEventListener("click", resetFilters)
    }
  } else if (currentPage === "recipe-detail.html") {
    // Recipe detail page
    loadRecipeDetail()
  } else if (currentPage === "add-recipe.html") {
    // Add/Edit recipe form page
    initializeForm()
  }
})
