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

  const recipeData = JSON.stringify({ recipeId, app: "RecipeManager" })
  const encodedData = btoa(recipeData)
  const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, "")
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