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
        (recipe, index, self) => index === self.findIndex((r) => String(r.id) === String(recipe.id)),
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