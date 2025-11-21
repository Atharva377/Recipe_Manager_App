// QR Code Functionality

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

  // Try to include the full recipe object so QR works across devices/browsers
  let payload = { app: "RecipeManager" }
  try {
    if (typeof loadRecipes === "function") {
      const all = loadRecipes()
      const found = all.find((r) => String(r.id) === String(recipeId))
      if (found) {
        payload.recipe = found
      } else {
        payload.recipeId = recipeId
      }
    } else {
      payload.recipeId = recipeId
    }
  } catch (err) {
    payload.recipeId = recipeId
  }

  const recipeData = JSON.stringify(payload)
  const encodedData = btoa(recipeData)

  // Build a robust URL that always points to the recipe detail page
  // Determine the first path segment (usually the repo name on GitHub Pages)
  const pathSegments = window.location.pathname.split("/").filter(Boolean)
  let baseDir = "/"
  if (pathSegments.length > 0 && pathSegments[0] !== "pages") {
    baseDir = `/${pathSegments[0]}/`
  }
  const detailPath = `${baseDir}pages/recipe-detail.html`
  const baseUrl = window.location.origin + detailPath
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