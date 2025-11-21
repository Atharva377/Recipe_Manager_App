// Storage Management Module

/**
 * Initialize localStorage with default recipe if empty
 */
function initializeStorage() {
  try {
    const existingRecipes = localStorage.getItem(STORAGE_KEY)
    if (!existingRecipes) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES))
      return
    }

    // If the stored value is present but not valid JSON/array, attempt to recover
    try {
      const parsed = JSON.parse(existingRecipes)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        // replace empty/non-array storage with defaults
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES))
      }
    } catch (parseError) {
      // Backup corrupted data to a separate key for inspection and restore defaults
      try {
        localStorage.setItem(`${STORAGE_KEY}_corrupted_backup`, existingRecipes)
      } catch (backupErr) {
        console.warn("Failed to backup corrupted recipes data:", backupErr)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES))
      console.warn("Corrupted recipes data found — backed up and restored defaults.")
    }
  } catch (error) {
    console.error("Error initializing storage:", error)
    showError("Failed to initialize storage. Default recipes may not be available.")
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
    let parsed = []
    try {
      parsed = JSON.parse(recipes)
    } catch (err) {
      console.error("Failed to parse recipes from storage:", err)
      showError("Saved recipes are corrupted. Restoring default recipes.")
      // attempt recovery by restoring defaults
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECIPES))
        parsed = DEFAULT_RECIPES
      } catch (writeErr) {
        console.error("Failed to restore default recipes:", writeErr)
        return []
      }
    }
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