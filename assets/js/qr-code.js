// QR Code Functionality

/**
 * Generate QR code for recipe
 */
function generateQRCode(recipeId) {
  const modal = document.getElementById("qrModal");
  const qrCodeDiv = document.getElementById("qrCode");
  const timerDiv = document.getElementById("qrTimer");
  if (!modal || !qrCodeDiv) return;

  qrCodeDiv.innerHTML = "";
  if (timerDiv) timerDiv.innerHTML = "";

  // Ensure recipeId is a string
  const recipeIdString = String(recipeId);
  const recipeData = JSON.stringify({ recipeId: recipeIdString, app: "RecipeManager" });
  const encodedData = btoa(recipeData);
  
  console.log("Recipe ID to encode:", recipeIdString);
  console.log("Recipe data:", recipeData);
  console.log("Encoded data:", encodedData);
  
  // Generate the correct URL for the recipe detail page
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
  const qrUrl = `${baseUrl}recipe-detail.html?recipe=${encodedData}`;

  console.log("Generated QR URL:", qrUrl);

  // Declare QRCode variable before using it
  const QRCode = window.QRCode;

  if (typeof QRCode !== "undefined") {
    new QRCode(qrCodeDiv, {
      text: qrUrl,
      width: 250,
      height: 250,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  let timeRemaining = 30;
  if (timerDiv) {
    timerDiv.textContent = `Scanner will disappear in ${timeRemaining}s`;
  }

  const timerInterval = setInterval(() => {
    timeRemaining--;
    if (timerDiv) {
      timerDiv.textContent = `Scanner will disappear in ${timeRemaining}s`;
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      closeQRModal();
      showSuccess("QR code scanner closed");
    }
  }, 1000);

  modal.style.display = "flex";
}

/**
 * Close QR modal
 */
function closeQRModal() {
  const modal = document.getElementById("qrModal");
  if (modal) modal.style.display = "none";
}

/**
 * Extract recipe ID from URL parameters (for QR code sharing)
 */
function getRecipeIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeParam = urlParams.get('recipe');
  
  console.log("Raw recipe param from URL:", recipeParam);
  
  if (!recipeParam) {
    console.log("No recipe parameter in URL");
    return null;
  }
  
  try {
    // Decode the base64 encoded recipe data
    const decodedData = atob(recipeParam);
    console.log("Decoded data:", decodedData);
    const recipeData = JSON.parse(decodedData);
    console.log("Parsed recipe data from URL:", recipeData);
    console.log("Recipe ID to return:", recipeData.recipeId);
    // Ensure we return a string for consistency
    return String(recipeData.recipeId);
  } catch (error) {
    console.error("Error decoding recipe from URL:", error);
    return null;
  }
}