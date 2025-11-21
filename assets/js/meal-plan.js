// Meal Planning Functionality

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
          <div class="meal-slot-title">${recipe ? escapeHtml(recipe) : '–'}</div>
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