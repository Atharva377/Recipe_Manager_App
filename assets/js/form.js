
/**
 * Initialize form for add or edit mode
 */
function initializeForm() {
  const form = document.getElementById("recipeForm")
  const formTitle = document.getElementById("formTitle")
  const editRecipeId = sessionStorage.getItem("editRecipeId")

  console.log("Form initialized")
  console.log("Edit Recipe ID:", editRecipeId)

  if (!form) return

  if (editRecipeId) {
    // Edit mode
    const recipes = loadRecipes()
    const recipe = recipes.find((r) => r.id == editRecipeId)

    if (recipe) {
      formTitle.textContent = "Edit Recipe"
      populateForm(recipe)
    }
    else {
      // If the id doesn't map to a recipe, clear the stale edit id
      try {
        sessionStorage.removeItem("editRecipeId")
      } catch (e) {
        console.warn("Failed to clear stale editRecipeId:", e)
      }
    }
  }

  form.addEventListener("submit", handleFormSubmit)

  // If user clicks cancel, clear edit state to avoid accidentally reopening edit mode
  const cancelBtn = document.getElementById("cancelBtn")
  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      try {
        sessionStorage.removeItem("editRecipeId")
      } catch (e) {
        console.warn("Failed to clear editRecipeId on cancel:", e)
      }
    })
  }
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

  console.log("Form submitted")

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

  console.log("Form data:", formData)

  const errors = validateForm(formData)
  if (errors.length > 0) {
    showError(errors.join(" "))
    return
  }

  try {
    const recipes = loadRecipes()
    console.log("Current recipes count:", recipes.length)
    
    const editRecipeId = sessionStorage.getItem("editRecipeId")

    if (editRecipeId) {
      // Edit mode
      const index = recipes.findIndex((r) => r.id == editRecipeId)
      if (index !== -1) {
        recipes[index] = {
          ...recipes[index],
          ...formData,
          updatedAt: new Date().toISOString(),
        }
        console.log("Recipe updated:", recipes[index])
        showSuccess("Recipe updated successfully!")
      }
      sessionStorage.removeItem("editRecipeId")
    } else {
      // Add mode
      const newRecipe = {
        id: String(generateId()),
        ...formData,
        isFavorite: false,
        rating: 0,
        createdAt: new Date().toISOString(),
      }
      recipes.push(newRecipe)
      console.log("New recipe created with ID:", newRecipe.id)
      console.log("New recipe:", newRecipe)
      showSuccess("Recipe added successfully!")
    }

    // Save to localStorage
    saveRecipes(recipes)
    console.log("Recipes saved. New count:", recipes.length)
    
    // Verify the save
    const verifyRecipes = loadRecipes()
    console.log("Verification - recipes in storage:", verifyRecipes.length)

    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = "landing.html"
    }, 1500)
  } catch (error) {
    console.error("Save error:", error)
    showError("Failed to save recipe. Please try again.")
  }
}