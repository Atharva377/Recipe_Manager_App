// Export/Import Functionality

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
 * Normalize imported recipes to match app structure
 */
function normalizeImportedRecipes(recipes) {
  return recipes.map((recipe) => {
    // Handle recipeId -> id conversion
    const id = recipe.id || recipe.recipeId || String(generateId());

    // Handle ingredients: convert from objects to strings if needed
    let ingredients = [];
    if (Array.isArray(recipe.ingredients)) {
      ingredients = recipe.ingredients.map((ing) => {
        if (typeof ing === "string") {
          return ing;
        }
        if (ing.name && ing.quantity) {
          return `${ing.name} - ${ing.quantity}`;
        }
        if (ing.name) {
          return ing.name;
        }
        return "";
      }).filter((i) => i.length > 0);
    }

    // Handle steps/instructions
    let steps = [];
    if (Array.isArray(recipe.steps)) {
      steps = recipe.steps.filter((s) => typeof s === "string" && s.trim().length > 0);
    } else if (Array.isArray(recipe.instructions)) {
      steps = recipe.instructions.filter((s) => typeof s === "string" && s.trim().length > 0);
    }

    // Handle time values: convert strings to numbers
    const parsePrepTime = (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const match = value.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      }
      return 0;
    };

    const parseCookTime = (value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const match = value.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      }
      return 0;
    };

    // Handle nutrition object
    const nutrition = recipe.nutrition || {};
    const normalizedNutrition = {
      calories: parseInt(nutrition.calories) || 0,
      protein: parseFloat(nutrition.protein) || 0,
      carbs: parseFloat(nutrition.carbs) || 0,
      fat: parseFloat(nutrition.fat) || 0,
    };

    return {
      id: String(id),
      title: recipe.title || "Untitled Recipe",
      description: recipe.description || "",
      category: recipe.category || "Uncategorized",
      imageUrl: recipe.imageUrl || "",
      ingredients: ingredients,
      steps: steps,
      tags: Array.isArray(recipe.tags) ? recipe.tags : [],
      difficulty: recipe.difficulty || "Medium",
      prepTime: parsePrepTime(recipe.prepTime),
      cookTime: parseCookTime(recipe.cookTime),
      servings: parseInt(recipe.servings) || 1,
      nutrition: normalizedNutrition,
      isFavorite: recipe.isFavorite || false,
      rating: recipe.rating || 0,
      createdAt: recipe.createdAt || new Date().toISOString(),
    };
  });
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

      // Normalize imported recipes to match app structure
      const normalizedRecipes = normalizeImportedRecipes(importedRecipes)

      const currentRecipes = loadRecipes()
      const mergedRecipes = [...currentRecipes, ...normalizedRecipes].filter(
        (recipe, index, self) => index === self.findIndex((r) => String(r.id) === String(recipe.id)),
      )
      saveRecipes(mergedRecipes)
      showSuccess(`Successfully imported ${normalizedRecipes.length} recipes!`)
      closeImportModal()
      fileInput.value = ""
      setTimeout(() => {
        window.location.href = "landing.html"
      }, 1500)
    } catch (error) {
      showError("Error parsing JSON file. Please check the file format.")
    }
  }
  reader.readAsText(file)
}