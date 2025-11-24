
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
  // Attach real-time field validation listeners
  setupFieldValidation()

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
  form.addEventListener("reset", function () {
    // clear errors when user resets form
    setTimeout(clearAllFieldErrors, 0)
  })

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
 * Validate form input and return per-field errors.
 * Returns an object where keys are field ids and values are error messages.
 */
function validateForm(formData) {
  const fieldErrors = {}

  // Use our fieldValidators map to check each field
  Object.keys(fieldValidators).forEach((key) => {
    let value = formData[key]
    const validator = fieldValidators[key]
    if (!validator) return
    const msg = validator(value)
    if (msg) fieldErrors[key] = msg
  })

  return fieldErrors
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

  // Clear previous field errors before validating
  clearAllFieldErrors()

  const fieldErrors = validateForm(formData)
  if (Object.keys(fieldErrors).length > 0) {
    // show a concise global message and per-field messages
    showError("Please fill in all essential fields.")
    Object.entries(fieldErrors).forEach(([field, msg]) => setFieldError(field, msg))
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

/**
 * Field-level helpers and validators
 */
function setFieldError(fieldId, message) {
  const err = document.getElementById(`error-${fieldId}`)
  const el = document.getElementById(fieldId)
  const group = el ? el.closest(".form-group") : null
  if (err) err.textContent = message || ""
  if (group) {
    if (message) group.classList.add("invalid")
    else group.classList.remove("invalid")
  }
}

function clearFieldError(fieldId) {
  setFieldError(fieldId, "")
}

function clearAllFieldErrors() {
  const errorEls = document.querySelectorAll(".field-error")
  errorEls.forEach((el) => (el.textContent = ""))
  const invalidGroups = document.querySelectorAll(".form-group.invalid")
  invalidGroups.forEach((g) => g.classList.remove("invalid"))
  const global = document.getElementById("errorContainer")
  if (global) global.style.display = "none"
}

const fieldValidators = {
  title: (v) => {
    if (!v || !v.trim()) return "Recipe name is required."
    if (v.length > 200) return "Recipe title must be less than 200 characters."
    return ""
  },
  category: (v) => (!v ? "Recipe category is required." : ""),
  prepTime: (v) => (isNaN(v) || v < 0 ? "Prep time must be a positive number." : ""),
  cookTime: (v) => (isNaN(v) || v < 0 ? "Cook time must be a positive number." : ""),
  servings: (v) => (isNaN(v) || v < 1 ? "Servings must be at least 1." : ""),
  difficulty: (v) => (!v ? "Difficulty level is required." : ""),
  ingredients: (arr) => (!arr || arr.length === 0 ? "Please add at least one ingredient." : ""),
  steps: (arr) => (!arr || arr.length === 0 ? "Instructions cannot be empty." : ""),
  imageUrl: (v) => (v && v.length > 0 && !isValidUrl(v) ? "Please enter a valid image URL." : ""),
}

function setupFieldValidation() {
  const fields = [
    "title",
    "category",
    "prepTime",
    "cookTime",
    "servings",
    "difficulty",
    "ingredients",
    "steps",
    "imageUrl",
  ]

  fields.forEach((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const eventName = el.tagName.toLowerCase() === "select" || el.type === "number" ? "change" : "input"

    el.addEventListener(eventName, () => {
      // compute value according to field type
      let value = el.value
      if (id === "prepTime" || id === "cookTime" || id === "servings") {
        value = Number.parseFloat(el.value)
      }
      if (id === "ingredients") {
        value = el.value
          .split("\n")
          .map((i) => i.trim())
          .filter((i) => i.length > 0)
      }
      if (id === "steps") {
        value = el.value
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      }

      const validator = fieldValidators[id]
      if (!validator) return
      const msg = validator(value)
      if (msg) setFieldError(id, msg)
      else clearFieldError(id)
    })
  })
}