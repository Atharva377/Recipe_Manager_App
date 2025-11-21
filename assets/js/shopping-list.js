// Shopping List Functionality

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
  // Prefer DOM state so that checked items (class "checked") are excluded
  const container = document.getElementById('shoppingListContainer')
  let lines = []
  if (container) {
    const items = container.querySelectorAll('.shopping-item')
    items.forEach((el) => {
      if (el.classList.contains('checked')) return // skip selected items
      const textEl = el.querySelector('.shopping-item-text')
      const qtyEl = el.querySelector('.shopping-item-quantity')
      const itemText = textEl ? textEl.textContent.trim() : ''
      const qtyText = qtyEl ? qtyEl.textContent.replace(/^x/, '').trim() : ''
      if (itemText) lines.push(`☐ ${itemText} (x${qtyText || 1})`)
    })
  }

  // Fallback to storage if nothing in DOM
  if (lines.length === 0) {
    const list = loadShoppingList()
    lines = Object.entries(list).map(([item, qty]) => `☐ ${item} (x${qty})`)
  }
  const text = lines.join('\n')
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