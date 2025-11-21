// Storage Management Module

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
    // normalize parsed recipes to avoid type/format issues across browsers
    const parsed = JSON.parse(recipes)
    if (!Array.isArray(parsed)) return []
    return parsed.map((r) => {
      const recipe = r || {}
      return {
        ...recipe,
        id: recipe.id !== undefined && recipe.id !== null ? String(recipe.id) : String(generateId()),
        title: recipe.title || "Untitled Recipe",
        description: recipe.description || "",
        prepTime: Number(recipe.prepTime) || 0,
        cookTime: Number(recipe.cookTime) || 0,
        servings: Number(recipe.servings) || 1,
        difficulty: recipe.difficulty || "Unknown",
        category: recipe.category || "",
        tags: Array.isArray(recipe.tags) ? recipe.tags : [],
        imageUrl: recipe.imageUrl || "",
        rating: Number(recipe.rating) || 0,
        isFavorite: !!recipe.isFavorite,
        createdAt: recipe.createdAt || new Date().toISOString(),
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        steps: Array.isArray(recipe.steps) ? recipe.steps : [],
        nutrition: recipe.nutrition || {},
      }
    })
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