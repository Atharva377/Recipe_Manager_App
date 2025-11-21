function loadRecipeDetail() {
  // First, check if we have recipe data in URL parameters (from QR code)
  let recipeFromURL = getRecipeFromURL();
  let recipe = null;
  
  console.log("Loading recipe detail");
  console.log("Recipe from URL:", recipeFromURL);
  
  if (recipeFromURL && recipeFromURL.title) {
    // We have full recipe data from URL (QR code scan from another device)
    console.log("Using full recipe data from URL");
    recipe = recipeFromURL;
  } else {
    // Try to get recipe ID from URL or sessionStorage
    let recipeId = recipeFromURL ? recipeFromURL.id : sessionStorage.getItem("selectedRecipeId");
    
    console.log("Recipe ID from sessionStorage:", sessionStorage.getItem("selectedRecipeId"));
    console.log("Final recipe ID to use:", recipeId);
    console.log("Recipe ID type:", typeof recipeId);

    if (!recipeId) {
      console.error("No recipe ID found");
      showError("Recipe not found. Redirecting to home...");
      setTimeout(() => {
        window.location.href = "landing.html";
      }, 20000);
      return;
    }

    // Store the recipe ID in sessionStorage for consistency
    sessionStorage.setItem("selectedRecipeId", recipeId);

    // Load recipes from localStorage
    const recipes = loadRecipes();
    console.log("Total recipes in storage:", recipes.length);
    console.log("All recipe IDs:", recipes.map(r => r.id));

    // Find recipe using string comparison
    recipe = recipes.find((r) => String(r.id) === String(recipeId));

    if (!recipe) {
      console.error("Recipe not found for ID:", recipeId);
      showError("Recipe not found. Redirecting to home...");
      setTimeout(() => {
        window.location.href = "landing.html";
      }, 20000);
      return;
    }
  }

  console.log("Recipe found:", recipe.title);

  const detailContainer = document.getElementById("recipeDetail");
  if (!detailContainer) {
    console.error("recipeDetail container not found");
    return;
  }

  const imageUrl = recipe.imageUrl || DEFAULT_IMAGE;
  const totalTime = recipe.prepTime + recipe.cookTime;
  const tagsHtml = (recipe.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

  // Check if this is from a QR code (no localStorage access)
  const isFromQRCode = recipeFromURL && recipeFromURL.title;

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
    : "";

  const stepsHtml = recipe.steps.map((step, index) => `<li data-step="${index + 1}">${escapeHtml(step)}</li>`).join("");
  const ingredientsHtml = recipe.ingredients.map((ingredient) => `<li>✓ ${escapeHtml(ingredient)}</li>`).join("");

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

      ${!isFromQRCode ? `
      <div class="recipe-detail-section">
        <div id="recipeRating"></div>
        <button class="favorite-btn ${recipe.isFavorite ? "active" : ""}" onclick="toggleFavorite('${recipe.id}'); location.reload();">
          ${recipe.isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>
      ` : `
      <div class="recipe-detail-section">
        <p style="color: #666; font-style: italic;">📱 Viewing via QR code - Some features are limited</p>
      </div>
      `}

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
        ${!isFromQRCode ? `
          <a href="landing.html" class="btn btn-secondary">Back to Recipes</a>
          <button class="btn btn-primary" onclick="goToEdit('${recipe.id}')">Edit Recipe</button>
          <button class="btn btn-secondary" onclick="generateQRCode('${recipe.id}')">Share QR Code</button>
          <button class="btn btn-secondary" onclick="duplicateRecipeFromDetail('${recipe.id}')">Duplicate Recipe</button>
          <button class="btn btn-danger" onclick="deleteAndReturn('${recipe.id}')">Delete Recipe</button>
        ` : ''}
        <button class="btn btn-secondary" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
  `;

  if (!isFromQRCode) {
    displayRecipeRating(recipe);
  }
}

/**
 * Go to edit page
 */
function goToEdit(recipeId) {
  sessionStorage.setItem("editRecipeId", recipeId);
  window.location.href = "add-recipe.html";
}

/**
 * Delete recipe and return to home
 */
function deleteAndReturn(recipeId) {
  if (!confirm("Are you sure you want to delete this recipe?")) {
    return;
  }

  try {
    let recipes = loadRecipes();
    recipes = recipes.filter((r) => String(r.id) !== String(recipeId));
    saveRecipes(recipes);
    sessionStorage.removeItem("selectedRecipeId");
    window.location.href = "landing.html";
  } catch (error) {
    showError("Failed to delete recipe.");
  }
}

/**
 * Duplicate recipe from detail page
 */
function duplicateRecipeFromDetail(recipeId) {
  const recipes = loadRecipes();
  const recipe = recipes.find((r) => String(r.id) === String(recipeId));

  if (!recipe) {
    showError("Recipe not found.");
    return;
  }

  const duplicatedRecipe = {
    ...recipe,
    id: String(generateId()),
    title: `${recipe.title} (Copy)`,
    createdAt: new Date().toISOString(),
    isFavorite: false,
    rating: 0,
  };

  recipes.push(duplicatedRecipe);
  saveRecipes(recipes);
  showSuccess(`Recipe "${recipe.title}" duplicated successfully!`);
  
  setTimeout(() => {
    window.location.href = "landing.html";
  }, 1500);
}