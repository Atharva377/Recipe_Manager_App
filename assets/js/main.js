// Recipe Manager Application
// All data is stored in browser localStorage under 'recipes' key

// ==================== CONSTANTS ====================
const STORAGE_KEY = "recipes"
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop"
const MEAL_PLAN_STORAGE_KEY = "mealPlan"
const SHOPPING_LIST_STORAGE_KEY = "shoppingList"

// Initial recipe data
const DEFAULT_RECIPES = [
  {
    id: Date.now(),
    title: "Veg Biryani",
    description:
      "A aromatic and flavorful vegetarian rice dish with layered vegetables and fragrant spices. This classic Indian recipe is perfect for special occasions and gatherings.",
    prepTime: 30,
    cookTime: 45,
    servings: 4,
    difficulty: "Medium",
    category: "Vegetarian",
    tags: ["indian", "spicy", "rice", "vegetarian"],
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
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 14,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 1,
    title: "Paneer Butter Masala",
    description:
      "A rich and creamy North Indian curry made with paneer cubes in a tomato-based sauce with butter and aromatic spices. Perfect with naan or rice.",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    category: "Vegetarian",
    tags: ["indian", "curry", "paneer", "creamy"],
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=300&fit=crop",
    ingredients: [
      "250g paneer, cubed",
      "4 tbsp butter",
      "2 large onions, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric powder",
      "1 cup heavy cream",
      "1/2 cup cashew paste",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    steps: [
      "Heat 2 tbsp butter in a pan and fry paneer cubes until golden. Set aside.",
      "In the same pan, add remaining butter and sauté onions until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree, red chili powder, turmeric, and salt. Cook until oil separates.",
      "Add cashew paste and cook for 5 minutes.",
      "Pour in cream and garam masala. Simmer for 5 minutes.",
      "Add fried paneer cubes and simmer for another 5 minutes.",
      "Garnish with cilantro and serve hot.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 15,
      fat: 35,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 2,
    title: "Pav Bhaji",
    description:
      "A popular Mumbai street food featuring spiced vegetable mash served with buttered bread rolls. A delicious and hearty meal.",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    difficulty: "Easy",
    category: "Vegetarian",
    tags: ["indian", "street-food", "vegetables", "spicy"],
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=300&fit=crop",
    ingredients: [
      "6 pav (bread rolls)",
      "4 potatoes, boiled and mashed",
      "1 cup cauliflower, boiled",
      "1 cup peas, boiled",
      "2 carrots, boiled and chopped",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "4 tbsp butter",
      "1 tbsp ginger-garlic paste",
      "2 tsp pav bhaji masala",
      "1 tsp red chili powder",
      "Salt to taste",
      "Fresh cilantro for garnish",
      "Lemon wedges",
    ],
    steps: [
      "Heat 2 tbsp butter in a large pan and sauté onions until translucent.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomatoes and cook until mushy.",
      "Add pav bhaji masala, red chili powder, and salt. Cook for 2 minutes.",
      "Add boiled vegetables and mash them well with a masher.",
      "Add water if needed to adjust consistency. Simmer for 10 minutes.",
      "Heat pav with butter on a griddle.",
      "Serve bhaji with buttered pav, garnished with cilantro and lemon wedges.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 50,
      fat: 12,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 3,
    title: "Butter Chicken",
    description:
      "A creamy and mildly spiced Indian curry made with marinated chicken in a rich tomato-based sauce. A restaurant favorite.",
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    difficulty: "Medium",
    category: "Non-Vegetarian",
    tags: ["indian", "chicken", "curry", "creamy"],
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=500&h=300&fit=crop",
    ingredients: [
      "500g chicken breast, cubed",
      "4 tbsp butter",
      "2 onions, pureed",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric powder",
      "1 cup heavy cream",
      "1/2 cup yogurt",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    steps: [
      "Marinate chicken with yogurt, ginger-garlic paste, and spices for 30 minutes.",
      "Heat 2 tbsp butter and cook marinated chicken until done. Set aside.",
      "In the same pan, add remaining butter and sauté onion puree until golden.",
      "Add tomato puree and cook until oil separates.",
      "Add spices and cook for 5 minutes.",
      "Add cream and simmer for 5 minutes.",
      "Add cooked chicken and simmer for another 10 minutes.",
      "Garnish with cilantro and serve with rice or naan.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 12,
      fat: 32,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 4,
    title: "Cheese Cake",
    description:
      "A rich and creamy dessert with a graham cracker crust and smooth cheese filling. Perfect for any occasion.",
    prepTime: 20,
    cookTime: 60,
    servings: 8,
    difficulty: "Easy",
    category: "Dessert",
    tags: ["dessert", "cheesecake", "creamy", "sweet"],
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=300&fit=crop",
    ingredients: [
      "2 cups graham cracker crumbs",
      "1/2 cup melted butter",
      "24 oz cream cheese, softened",
      "1 cup sugar",
      "3 eggs",
      "1 tsp vanilla extract",
      "1 cup sour cream",
      "Fresh berries for topping",
    ],
    steps: [
      "Preheat oven to 325°F (165°C).",
      "Mix graham cracker crumbs with melted butter and press into springform pan.",
      "Beat cream cheese and sugar until smooth.",
      "Add eggs one at a time, beating well after each.",
      "Add vanilla and sour cream. Mix well.",
      "Pour over crust and bake for 50-60 minutes until center is set.",
      "Cool completely and refrigerate for at least 4 hours.",
      "Top with fresh berries before serving.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 420,
      protein: 8,
      carbs: 35,
      fat: 28,
    },
    createdAt: new Date().toISOString(),
  },
]

// ==================== UTILITY FUNCTIONS ====================

/**
 * Initialize localStorage with default recipe if empty
 */
function initializeStorage() {
  try {
    const existingRecipes = localStorage.getItem(STORAGE_KEY)
    if (!existingRecipes || JSON.parse(existingRecipes).length === 0) {
      const initialRecipes = DEFAULT_RECIPES
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes))
    }
  } catch (error) {
    console.error("Error initializing storage:", error)
    showError("Failed to initialize storage. Please clear browser data and try again.")
  }
}

/**
 * Initialize meal plan and shopping list storage
 */
function initializeMealPlanStorage() {
  try {
    if (!localStorage.getItem(MEAL_PLAN_STORAGE_KEY)) {
      localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify({}))
    }
    if (!localStorage.getItem(SHOPPING_LIST_STORAGE_KEY)) {
      localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify({}))
    }
  } catch (error) {
    console.error("Error initializing meal plan storage:", error)
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
  const tagsHtml = (recipe.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")

  const nutritionHtml = recipe.nutrition
    ? `
    <div class="nutrition-box">
      <div class="nutrition-item">
        <div class="nutrition-item-label">Calories</div>
        <div class="nutrition-item-value">${recipe.nutrition.calories || "—"}</div>
      </div>
      <div class="nutrition-item">
        <div class="nutrition-item-label">Protein</div>
        <div class="nutrition-item-value">${recipe.nutrition.protein || "—"}g</div>
      </div>
      <div class="nutrition-item">
        <div class="nutrition-item-label">Carbs</div>
        <div class="nutrition-item-value">${recipe.nutrition.carbs || "—"}g</div>
      </div>
      <div class="nutrition-item">
        <div class="nutrition-item-label">Fat</div>
        <div class="nutrition-item-value">${recipe.nutrition.fat || "—"}g</div>
      </div>
    </div>
  `
    : ""

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
          ${recipe.category ? `<div>🏷️ Category: ${escapeHtml(recipe.category)}</div>` : ""}
        </div>
      </div>
    </div>

    <div class="recipe-detail-content">
      ${recipe.description ? `<div class="recipe-detail-section"><p class="recipe-detail-description">${escapeHtml(recipe.description)}</p></div>` : ""}

      ${tagsHtml ? `<div class="recipe-detail-section"><strong>Tags:</strong><div class="tags-container">${tagsHtml}</div></div>` : ""}

      <div class="recipe-detail-section">
        <div id="recipeRating"></div>
        <button class="favorite-btn ${recipe.isFavorite ? "active" : ""}" onclick="toggleFavorite(${recipe.id}); this.classList.toggle('active');">
          ${recipe.isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>

      ${nutritionHtml}

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
        <button class="btn btn-secondary" onclick="generateQRCode(${recipeId})">Share QR Code</button>
        <button class="btn btn-secondary" onclick="duplicateRecipe(${recipeId})">Duplicate Recipe</button>
        <button class="btn btn-danger" onclick="deleteAndReturn(${recipeId})">Delete Recipe</button>
        <button class="btn btn-secondary" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
  `

  displayRecipeRating(recipe)
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
  document.getElementById("category").value = recipe.category || ""
  document.getElementById("tags").value = (recipe.tags || []).join(", ")
  document.getElementById("prepTime").value = recipe.prepTime
  document.getElementById("cookTime").value = recipe.cookTime
  document.getElementById("servings").value = recipe.servings
  document.getElementById("difficulty").value = recipe.difficulty
  document.getElementById("imageUrl").value = recipe.imageUrl || ""
  document.getElementById("ingredients").value = recipe.ingredients.join("\n")
  document.getElementById("steps").value = recipe.steps.join("\n")

  if (recipe.nutrition) {
    document.getElementById("calories").value = recipe.nutrition.calories || ""
    document.getElementById("protein").value = recipe.nutrition.protein || ""
    document.getElementById("carbs").value = recipe.nutrition.carbs || ""
    document.getElementById("fat").value = recipe.nutrition.fat || ""
  }
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

  if (!formData.category) {
    errors.push("Recipe category is required.")
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
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault()

  const formData = {
    title: document.getElementById("title").value.trim(),
    description: document.getElementById("description").value.trim(),
    category: document.getElementById("category").value,
    tags: document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0),
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
    nutrition: {
      calories: Number.parseInt(document.getElementById("calories").value) || 0,
      protein: Number.parseFloat(document.getElementById("protein").value) || 0,
      carbs: Number.parseFloat(document.getElementById("carbs").value) || 0,
      fat: Number.parseFloat(document.getElementById("fat").value) || 0,
    },
  }

  const errors = validateForm(formData)
  if (errors.length > 0) {
    showError(errors.join(" "))
    return
  }

  try {
    const recipes = loadRecipes()
    const editRecipeId = sessionStorage.getItem("editRecipeId")

    if (editRecipeId) {
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
      const newRecipe = {
        id: generateId(),
        ...formData,
        isFavorite: false,
        rating: 0,
        createdAt: new Date().toISOString(),
      }
      recipes.push(newRecipe)
      showSuccess("Recipe added successfully!")
    }

    saveRecipes(recipes)
    setTimeout(() => {
      window.location.href = "../index.html"
    }, 1500)
  } catch (error) {
    showError("Failed to save recipe. Please try again.")
  }
}

// ==================== FAVORITES AND RATINGS ====================

/**
 * Toggle favorite status
 */
function toggleFavorite(recipeId) {
  const recipes = loadRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite
    saveRecipes(recipes)
    const btn = document.querySelector(`[data-favorite-btn="${recipeId}"]`)
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
  const recipe = recipes.find((r) => r.id === recipeId)
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
    html += `<span class="star ${i <= recipe.rating ? "active" : ""}" onclick="setRating(${recipe.id}, ${i})">★</span>`
  }
  html += "</div>"
  ratingContainer.innerHTML = html
}

// ==================== EXPORT/IMPORT FUNCTIONALITY ====================

/**
 * Export all recipes as JSON
 */
function exportAllRecipes() {
  const recipes = loadRecipes()
  const dataStr = JSON.stringify(recipes, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement("a")
  link.href = url
  link.download = `recipes-backup-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
  showSuccess("Recipes exported successfully!")
}

/**
 * Open import modal
 */
function openImportModal() {
  const modal = document.getElementById("importModal")
  if (modal) modal.style.display = "flex"
}

/**
 * Close import modal
 */
function closeImportModal() {
  const modal = document.getElementById("importModal")
  if (modal) modal.style.display = "none"
}

/**
 * Handle recipe import
 */
function handleImport() {
  const fileInput = document.getElementById("importFile")
  const file = fileInput.files[0]

  if (!file) {
    showError("Please select a file to import.")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const importedRecipes = JSON.parse(e.target.result)
      if (!Array.isArray(importedRecipes)) {
        showError("Invalid file format. Expected an array of recipes.")
        return
      }

      const currentRecipes = loadRecipes()
      const mergedRecipes = [...currentRecipes, ...importedRecipes].filter(
        (recipe, index, self) => index === self.findIndex((r) => r.id === recipe.id),
      )
      saveRecipes(mergedRecipes)
      showSuccess(`Successfully imported ${importedRecipes.length} recipes!`)
      closeImportModal()
      fileInput.value = ""
      setTimeout(() => {
        window.location.href = "index.html"
      }, 1500)
    } catch (error) {
      showError("Error parsing JSON file. Please check the file format.")
    }
  }
  reader.readAsText(file)
}

// ==================== SHOPPING LIST FUNCTIONALITY ====================

/**
 * Generate shopping list from recipes
 */
function getShoppingListFromRecipes(recipeIds) {
  const recipes = loadRecipes()
  const shoppingList = {}

  recipeIds.forEach((id) => {
    const recipe = recipes.find((r) => r.id == id)
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        if (!shoppingList[ingredient]) {
          shoppingList[ingredient] = 0
        }
        shoppingList[ingredient]++
      })
    }
  })

  return shoppingList
}

/**
 * Save shopping list to storage
 */
function saveShoppingList(list) {
  try {
    localStorage.setItem(SHOPPING_LIST_STORAGE_KEY, JSON.stringify(list))
  } catch (error) {
    console.error("Error saving shopping list:", error)
    showError("Failed to save shopping list.")
  }
}

/**
 * Load shopping list from storage
 */
function loadShoppingList() {
  try {
    const list = localStorage.getItem(SHOPPING_LIST_STORAGE_KEY)
    return list ? JSON.parse(list) : {}
  } catch (error) {
    console.error("Error loading shopping list:", error)
    return {}
  }
}

/**
 * Display shopping list
 */
function displayShoppingList() {
  const container = document.getElementById("shoppingListContainer")
  if (!container) return

  const shoppingList = loadShoppingList()
  if (Object.keys(shoppingList).length === 0) {
    container.innerHTML = 
      '<p style="text-align: center; color: #999;">No items in shopping list. <a href="../index.html">Add recipes to your meal plan</a></p>'
    return
  }

  let html = '<div class="shopping-list-section"><h3>Shopping List</h3>'
  Object.entries(shoppingList).forEach(([item, quantity]) => {
    html += `
      <div class="shopping-item">
        <input type="checkbox" onchange="this.parentElement.classList.toggle('checked')">
        <span class="shopping-item-text">${escapeHtml(item)}</span>
        <span class="shopping-item-quantity">x${quantity}</span>
        <button class="btn btn-sm btn-secondary" onclick="removeShoppingItem('${item.replace(/'/g, "\\'")}')">Remove</button>
      </div>
    `
  })
  html += '</div>'
  container.innerHTML = html
}

/**
 * Remove shopping item
 */
function removeShoppingItem(item) {
  const list = loadShoppingList()
  delete list[item]
  saveShoppingList(list)
  displayShoppingList()
}

/**
 * Print shopping list
 */
function printShoppingList() {
  window.print()
}

/**
 * Download shopping list
 */
function downloadShoppingList() {
  const list = loadShoppingList()
  const text = Object.entries(list)
    .map(([item, qty]) => `☐ ${item} (x${qty})`)
    .join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `shopping-list-${new Date().toISOString().slice(0, 10)}.txt`
  link.click()
  URL.revokeObjectURL(url)
  showSuccess("Shopping list downloaded!")
}

/**
 * Clear shopping list
 */
function clearShoppingList() {
  if (confirm("Clear all items from shopping list?")) {
    saveShoppingList({})
    displayShoppingList()
    showSuccess("Shopping list cleared!")
  }
}

// ==================== QR CODE FUNCTIONALITY ====================

/**
 * Generate QR code for recipe
 */
function generateQRCode(recipeId) {
  const modal = document.getElementById("qrModal")
  const qrCodeDiv = document.getElementById("qrCode")
  const timerDiv = document.getElementById("qrTimer")
  if (!modal || !qrCodeDiv) return

  qrCodeDiv.innerHTML = ""
  if (timerDiv) timerDiv.innerHTML = ""

  const recipeData = JSON.stringify({ recipeId, app: "RecipeManager" })
  const encodedData = btoa(recipeData)
  const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, "")
  const qrUrl = `${baseUrl}?recipe=${encodedData}`

  // Declare QRCode variable before using it
  const QRCode = window.QRCode

  if (typeof QRCode !== "undefined") {
    new QRCode(qrCodeDiv, {
      text: qrUrl,
      width: 250,
      height: 250,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    })
  }

  let timeRemaining = 30
  if (timerDiv) {
    timerDiv.textContent = `Scanner will disappear in ${timeRemaining}s`
  }

  const timerInterval = setInterval(() => {
    timeRemaining--
    if (timerDiv) {
      timerDiv.textContent = `Scanner will disappear in ${timeRemaining}s`
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval)
      closeQRModal()
      showSuccess("QR code scanner closed")
    }
  }, 1000)

  modal.style.display = "flex"
}

/**
 * Close QR modal
 */
function closeQRModal() {
  const modal = document.getElementById("qrModal")
  if (modal) modal.style.display = "none"
}

// ==================== MEAL PLANNING FUNCTIONALITY ====================

/**
 * Get current week start date
 */
function getCurrentWeekStart() {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(now.setDate(diff))
}

/**
 * Save meal plan to storage
 */
function saveMealPlan(weekStart, meals) {
  try {
    const mealPlans = JSON.parse(localStorage.getItem(MEAL_PLAN_STORAGE_KEY) || '{}')
    const weekKey = weekStart.toISOString().slice(0, 10)
    mealPlans[weekKey] = meals
    localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(mealPlans))
  } catch (error) {
    console.error("Error saving meal plan:", error)
    showError("Failed to save meal plan.")
  }
}

/**
 * Load meal plan from storage
 */
function loadMealPlan(weekStart) {
  try {
    const mealPlans = JSON.parse(localStorage.getItem(MEAL_PLAN_STORAGE_KEY) || '{}')
    const weekKey = weekStart.toISOString().slice(0, 10)
    return mealPlans[weekKey] || {
      Monday: { breakfast: null, lunch: null, dinner: null },
      Tuesday: { breakfast: null, lunch: null, dinner: null },
      Wednesday: { breakfast: null, lunch: null, dinner: null },
      Thursday: { breakfast: null, lunch: null, dinner: null },
      Friday: { breakfast: null, lunch: null, dinner: null },
      Saturday: { breakfast: null, lunch: null, dinner: null },
      Sunday: { breakfast: null, lunch: null, dinner: null }
    }
  } catch (error) {
    console.error("Error loading meal plan:", error)
    return {}
  }
}

/**
 * Display meal plan for week
 */
function displayMealPlan(weekStart) {
  const grid = document.getElementById("mealPlanGrid")
  const weekDisplay = document.getElementById("weekDisplay")
  if (!grid) return

  const meals = loadMealPlan(weekStart)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)

  if (weekDisplay) {
    weekDisplay.textContent = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
  }

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  grid.innerHTML = ""

  days.forEach((day, index) => {
    const dayDate = new Date(weekStart)
    dayDate.setDate(dayDate.getDate() + index)
    const dayMeals = meals[day] || { breakfast: null, lunch: null, dinner: null }

    let html = `
      <div class="meal-day-card">
        <div class="meal-day-header">${day}<br><small>${dayDate.toLocaleDateString()}</small></div>
        <div class="meal-day-body">
    `
    ;['breakfast', 'lunch', 'dinner'].forEach(mealType => {
      const recipe = dayMeals[mealType]
      html += `
        <div class="meal-slot">
          <div class="meal-slot-label">${mealType}</div>
          <div class="meal-slot-title">${recipe ? escapeHtml(recipe) : '—'}</div>
          <div class="meal-slot-actions">
            <button class="btn btn-sm btn-primary" onclick="openRecipeSelectModal('${day}', '${mealType}')">Select</button>
            ${recipe ? `<button class="btn btn-sm btn-danger" onclick="removeMeal('${day}', '${mealType}')">Clear</button>` : ''}
          </div>
        </div>
      `
    })

    html += `
        </div>
      </div>
    `
    grid.innerHTML += html
  })

  sessionStorage.setItem("currentWeekStart", weekStart.toISOString())
}

/**
 * Go to previous week
 */
function goToPreviousWeek() {
  const currentWeekStart = new Date(sessionStorage.getItem("currentWeekStart") || new Date())
  currentWeekStart.setDate(currentWeekStart.getDate() - 7)
  displayMealPlan(currentWeekStart)
}

/**
 * Go to next week
 */
function goToNextWeek() {
  const currentWeekStart = new Date(sessionStorage.getItem("currentWeekStart") || new Date())
  currentWeekStart.setDate(currentWeekStart.getDate() + 7)
  displayMealPlan(currentWeekStart)
}

/**
 * Open recipe select modal
 */
function openRecipeSelectModal(day, mealType) {
  const modal = document.getElementById("recipeSelectModal")
  const listDiv = document.getElementById("recipeSelectList")
  if (!modal || !listDiv) return

  const recipes = loadRecipes()
  let html = ""

  recipes.forEach(recipe => {
    html += `
      <div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="addMealToDay('${day}', '${mealType}', '${recipe.id}', '${recipe.title.replace(/'/g, "\\'")}')">
        <strong>${escapeHtml(recipe.title)}</strong>
        <br>
        <small>${recipe.difficulty} • ${recipe.prepTime + recipe.cookTime}min</small>
      </div>
    `
  })

  listDiv.innerHTML = html
  modal.style.display = "flex"
}

/**
 * Close recipe select modal
 */
function closeRecipeSelectModal() {
  const modal = document.getElementById("recipeSelectModal")
  if (modal) modal.style.display = "none"
}

/**
 * Add meal to day
 */
function addMealToDay(day, mealType, recipeId, recipeName) {
  const weekStart = new Date(sessionStorage.getItem("currentWeekStart") || new Date())
  const meals = loadMealPlan(weekStart)
  if (!meals[day]) meals[day] = {}
  meals[day][mealType] = recipeName
  saveMealPlan(weekStart, meals)
  displayMealPlan(weekStart)
  closeRecipeSelectModal()
  showSuccess(`${recipeName} added to ${day} ${mealType}!`)
}

/**
 * Remove meal from day
 */
function removeMeal(day, mealType) {
  const weekStart = new Date(sessionStorage.getItem("currentWeekStart") || new Date())
  const meals = loadMealPlan(weekStart)
  meals[day][mealType] = null
  saveMealPlan(weekStart, meals)
  displayMealPlan(weekStart)
  showSuccess(`Meal removed from ${day}!`)
}

/**
 * Generate shopping list from meal plan
 */
function generateShoppingList() {
  const weekStart = new Date(sessionStorage.getItem("currentWeekStart") || new Date())
  const meals = loadMealPlan(weekStart)
  const recipes = loadRecipes()
  const recipeIds = []

  Object.values(meals).forEach(dayMeals => {
    Object.values(dayMeals).forEach(recipeName => {
      if (recipeName) {
        const recipe = recipes.find(r => r.title === recipeName)
        if (recipe) recipeIds.push(recipe.id)
      }
    })
  })

  if (recipeIds.length === 0) {
    showError("No recipes planned for this week!")
    return
  }

  const list = getShoppingListFromRecipes(recipeIds)
  saveShoppingList(list)
  showSuccess("Shopping list generated!")
  window.location.href = "shopping-list.html"
}

// ==================== EVENT LISTENERS ====================

document.addEventListener("DOMContentLoaded", () => {
  initializeStorage()
  initializeMealPlanStorage()

  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  if (currentPage === "index.html" || currentPage === "" || currentPage === "landing.html") {
    filterRecipes()

    const searchInput = document.getElementById("searchInput")
    const difficultyFilter = document.getElementById("difficultyFilter")
    const categoryFilter = document.getElementById("categoryFilter")
    const prepTimeFilter = document.getElementById("prepTimeFilter")
    const favoriteFilter = document.getElementById("favoriteFilter")
    const resetButton = document.getElementById("resetFilters")

    if (searchInput) searchInput.addEventListener("input", filterRecipes)
    if (difficultyFilter) difficultyFilter.addEventListener("change", filterRecipes)
    if (categoryFilter) categoryFilter.addEventListener("change", filterRecipes)
    if (prepTimeFilter) prepTimeFilter.addEventListener("input", filterRecipes)
    if (favoriteFilter) favoriteFilter.addEventListener("change", filterRecipes)
    if (resetButton) resetButton.addEventListener("click", resetFilters)
  } else if (currentPage === "recipe-detail.html") {
    loadRecipeDetail()
  } else if (currentPage === "add-recipe.html") {
    initializeForm()
  } else if (currentPage === "meal-plan.html") {
    const weekStart = getCurrentWeekStart()
    displayMealPlan(weekStart)
  } else if (currentPage === "shopping-list.html") {
    displayShoppingList()
  }
})
