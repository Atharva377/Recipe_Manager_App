// QR Code Functionality

/**
 * Generate QR code for recipe
 */
// Helpers to safely base64 encode/decode Unicode strings
function base64EncodeUnicode(str) {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  } catch (e) {
    console.error('base64EncodeUnicode failed, falling back to btoa:', e);
    return btoa(str);
  }
}

function base64DecodeUnicode(str) {
  try {
    const binary = atob(str);
    const percentEncoded = Array.prototype.map.call(binary, function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    return decodeURIComponent(percentEncoded);
  } catch (e) {
    console.error('base64DecodeUnicode failed, falling back to atob:', e);
    return atob(str);
  }
}

function generateQRCode(recipeId) {
  const modal = document.getElementById("qrModal");
  const qrCodeDiv = document.getElementById("qrCode");
  const timerDiv = document.getElementById("qrTimer");
  if (!modal || !qrCodeDiv) return;

  qrCodeDiv.innerHTML = "";
  if (timerDiv) timerDiv.innerHTML = "";

  // Ensure modal is visible before rendering QR so sizing works
  modal.style.display = "flex";

  // Get the full recipe data
  const recipes = loadRecipes();
  const recipe = recipes.find(r => String(r.id) === String(recipeId));
  
  if (!recipe) {
    showError("Recipe not found");
    return;
  }

  // Embed the entire recipe in the QR code
  const recipeData = JSON.stringify({ 
    recipe: recipe,
    app: "RecipeManager" 
  });
  const encodedData = base64EncodeUnicode(recipeData);
  
  console.log("Recipe to encode:", recipe.title);
  console.log("Encoded data length:", encodedData.length);
  
  // Generate the correct URL for the landing page (scanners should land on Home)
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
  // Redirect scanners to landing.html (contains logic to read recipe params)
  const qrUrl = `${baseUrl}pages/landing.html`;

  

  // If the encoded data is very large, prefer the small QR to avoid library limits
  const MAX_QR_PAYLOAD = 1000; // bytes - conservative threshold
  let qrTextToRender = qrUrl;
  let usedSmallFallback = false;
  if (encodedData.length > MAX_QR_PAYLOAD) {
    console.warn("Encoded recipe data is large; using ID-only QR fallback");
    qrTextToRender = qrUrl;
    usedSmallFallback = true;
  }

  console.log("Generated QR URL (landing):", qrUrl);

  // Declare QRCode variable before using it
  const QRCode = window.QRCode;

  function renderQRCode() {
    try {
      if (typeof window.QRCode === "undefined") {
        // If still undefined, show fallback text
        qrCodeDiv.innerHTML = "<p style='color:#666'>QR library not available.</p>";
        console.error("QRCode library not available to render.");
        return;
      }

      // Clear any existing content then render
      qrCodeDiv.innerHTML = "";
      new window.QRCode(qrCodeDiv, {
        text: qrTextToRender,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: window.QRCode.CorrectLevel.H,
      });
    } catch (err) {
      console.error("Failed to render QR code:", err);
      // If we weren't already using the small fallback, try that now
      if (!usedSmallFallback) {
        try {
          qrCodeDiv.innerHTML = "";
          new window.QRCode(qrCodeDiv, {
            text: qrUrl,
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: window.QRCode.CorrectLevel.H,
          });
          usedSmallFallback = true;
          console.warn("Rendered small fallback QR after failure of full payload");
          return;
        } catch (err2) {
          console.error("Failed to render small fallback QR code:", err2);
        }
      }

      qrCodeDiv.innerHTML = "<p style='color:#c00'>Unable to generate QR code.</p>";
    }
  }

  if (typeof QRCode === "undefined") {
    // Try to dynamically load the library if it wasn't loaded for some reason
    const scriptSrc = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    console.log("QRCode lib not found; loading dynamically from", scriptSrc);
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.onload = () => {
      console.log("QRCode library loaded dynamically");
      renderQRCode();
    };
    script.onerror = () => {
      console.error("Failed to load QRCode library from CDN");
      qrCodeDiv.innerHTML = "<p style='color:#c00'>Failed to load QR library.</p>";
    };
    document.head.appendChild(script);
  } else {
    renderQRCode();
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
 * Extract recipe data from URL parameters (for QR code sharing)
 */
function getRecipeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeParam = urlParams.get('recipe');
  const recipeIdParam = urlParams.get('recipeId');
  
  console.log("Raw recipe param from URL:", recipeParam);
  
  if (!recipeParam) {
    if (recipeIdParam) {
      console.log("Found recipeId parameter in URL:", recipeIdParam);
      return { id: String(recipeIdParam) };
    }

    console.log("No recipe parameter in URL");
    return null;
  }
  
  try {
    // Decode the base64 encoded recipe data (supports Unicode)
    const decodedData = base64DecodeUnicode(recipeParam);
    console.log("Decoded data:", decodedData);
    const recipeData = JSON.parse(decodedData);
    console.log("Parsed recipe data from URL:", recipeData);
    
    // Check if we have full recipe data or just an ID
    if (recipeData.recipe) {
      console.log("Full recipe found in URL");
      return recipeData.recipe;
    } else if (recipeData.recipeId) {
      console.log("Only recipe ID found in URL");
      return { id: String(recipeData.recipeId) };
    }
    
    return null;
  } catch (error) {
    console.error("Error decoding recipe from URL:", error);
    return null;
  }
}