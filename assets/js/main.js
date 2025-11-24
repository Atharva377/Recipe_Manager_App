
// ==================== CONSTANTS ====================
const STORAGE_KEY = "recipes"
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop"
const MEAL_PLAN_STORAGE_KEY = "mealPlan"
const SHOPPING_LIST_STORAGE_KEY = "shoppingList"

// Initial recipe data
const DEFAULT_RECIPES = [
  {
    id: Date.now(),
    title: "Veg Biryani",
    description:
      "A aromatic and flavorful vegetarian rice dish with layered vegetables and fragrant spices. This classic Indian recipe is perfect for special occasions and gatherings.",
    prepTime: 30,
    cookTime: 45,
    servings: 4,
    difficulty: "Medium",
    category: "Vegetarian",
    tags: ["indian", "spicy", "rice", "vegetarian"],
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cda666?w=500&h=300&fit=crop",
    ingredients: [
      "2 cups basmati rice",
      "3 cups mixed vegetables (carrots, peas, potatoes)",
      "2 large onions, sliced",
      "4 tbsp ghee or vegetable oil",
      "4 green cardamom pods",
      "2 black cardamom pods",
      "1-inch cinnamon stick",
      "4 bay leaves",
      "6 cloves",
      "1 tsp cumin seeds",
      "2 cups yogurt",
      "4 garlic cloves, minced",
      "1 tbsp ginger, minced",
      "2 green chilies, sliced",
      "1/2 cup mint leaves",
      "1/2 cup cilantro leaves",
      "Salt to taste",
      "1/2 tsp saffron strands",
      "1/4 cup milk",
      "2 tbsp fried onions for garnish",
    ],
    steps: [
      "Wash the basmati rice thoroughly and soak for 30 minutes. Drain well.",
      "Cut all vegetables into uniform sizes and set aside.",
      "Heat 2 tbsp of ghee in a large pot and fry half of the sliced onions until golden brown. Set aside.",
      "In the same pot, add remaining ghee and sauté the other half of onions until soft.",
      "Add minced ginger-garlic paste to the onions and fry for 2 minutes.",
      "Add the mixed vegetables and cook for 5 minutes until slightly softened.",
      "Pour in the yogurt mixed with green chilies, mint, and cilantro. Cook for 3-4 minutes.",
      "Boil water in a separate pot with whole spices (cardamom, cinnamon, cloves, cumin, bay leaves). Salt generously.",
      "Add the soaked rice to the boiling spiced water and cook until 70% done. Drain well.",
      "Layer the rice over the vegetable mixture in the pot.",
      "Soak saffron in warm milk and pour over the rice layer.",
      "Cover the pot with foil then place the lid tightly (dum biryani).",
      "Cook on high heat for 3-4 minutes until steam forms, then reduce to low heat.",
      "Cook for 45-50 minutes until the rice is fully cooked and fragrant.",
      "Turn off heat and let it rest for 5 minutes without opening the lid.",
      "Carefully open the lid and gently mix the biryani with a fork.",
      "Transfer to a serving dish and garnish with fried onions, boiled eggs, and fresh mint.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 350,
      protein: 12,
      carbs: 45,
      fat: 14,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 1,
    title: "Paneer Butter Masala",
    description:
      "A rich and creamy North Indian curry made with paneer cubes in a tomato-based sauce with butter and aromatic spices. Perfect with naan or rice.",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    category: "Vegetarian",
    tags: ["indian", "curry", "paneer", "creamy"],
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&h=300&fit=crop",
    ingredients: [
      "250g paneer, cubed",
      "4 tbsp butter",
      "2 large onions, finely chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric powder",
      "1 cup heavy cream",
      "1/2 cup cashew paste",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    steps: [
      "Heat 2 tbsp butter in a pan and fry paneer cubes until golden. Set aside.",
      "In the same pan, add remaining butter and sauté onions until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree, red chili powder, turmeric, and salt. Cook until oil separates.",
      "Add cashew paste and cook for 5 minutes.",
      "Pour in cream and garam masala. Simmer for 5 minutes.",
      "Add fried paneer cubes and simmer for another 5 minutes.",
      "Garnish with cilantro and serve hot.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 450,
      protein: 18,
      carbs: 15,
      fat: 35,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 2,
    title: "Pav Bhaji",
    description:
      "A popular Mumbai street food featuring spiced vegetable mash served with buttered bread rolls. A delicious and hearty meal.",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    difficulty: "Easy",
    category: "Vegetarian",
    tags: ["indian", "street-food", "vegetables", "spicy"],
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=300&fit=crop",
    ingredients: [
      "6 pav (bread rolls)",
      "4 potatoes, boiled and mashed",
      "1 cup cauliflower, boiled",
      "1 cup peas, boiled",
      "2 carrots, boiled and chopped",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "4 tbsp butter",
      "1 tbsp ginger-garlic paste",
      "2 tsp pav bhaji masala",
      "1 tsp red chili powder",
      "Salt to taste",
      "Fresh cilantro for garnish",
      "Lemon wedges",
    ],
    steps: [
      "Heat 2 tbsp butter in a large pan and sauté onions until translucent.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomatoes and cook until mushy.",
      "Add pav bhaji masala, red chili powder, and salt. Cook for 2 minutes.",
      "Add boiled vegetables and mash them well with a masher.",
      "Add water if needed to adjust consistency. Simmer for 10 minutes.",
      "Heat pav with butter on a griddle.",
      "Serve bhaji with buttered pav, garnished with cilantro and lemon wedges.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 320,
      protein: 10,
      carbs: 50,
      fat: 12,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 3,
    title: "Butter Chicken",
    description:
      "A creamy and mildly spiced Indian curry made with marinated chicken in a rich tomato-based sauce. A restaurant favorite.",
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    difficulty: "Medium",
    category: "Non-Vegetarian",
    tags: ["indian", "chicken", "curry", "creamy"],
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae391?w=500&h=300&fit=crop",
    ingredients: [
      "500g chicken breast, cubed",
      "4 tbsp butter",
      "2 onions, pureed",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 tsp turmeric powder",
      "1 cup heavy cream",
      "1/2 cup yogurt",
      "Salt to taste",
      "Fresh cilantro for garnish",
    ],
    steps: [
      "Marinate chicken with yogurt, ginger-garlic paste, and spices for 30 minutes.",
      "Heat 2 tbsp butter and cook marinated chicken until done. Set aside.",
      "In the same pan, add remaining butter and sauté onion puree until golden.",
      "Add tomato puree and cook until oil separates.",
      "Add spices and cook for 5 minutes.",
      "Add cream and simmer for 5 minutes.",
      "Add cooked chicken and simmer for another 10 minutes.",
      "Garnish with cilantro and serve with rice or naan.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 480,
      protein: 35,
      carbs: 12,
      fat: 32,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: Date.now() + 4,
    title: "Cheese Cake",
    description:
      "A rich and creamy dessert with a graham cracker crust and smooth cheese filling. Perfect for any occasion.",
    prepTime: 20,
    cookTime: 60,
    servings: 8,
    difficulty: "Easy",
    category: "Dessert",
    tags: ["dessert", "cheesecake", "creamy", "sweet"],
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=300&fit=crop",
    ingredients: [
      "2 cups graham cracker crumbs",
      "1/2 cup melted butter",
      "24 oz cream cheese, softened",
      "1 cup sugar",
      "3 eggs",
      "1 tsp vanilla extract",
      "1 cup sour cream",
      "Fresh berries for topping",
    ],
    steps: [
      "Preheat oven to 325°F (165°C).",
      "Mix graham cracker crumbs with melted butter and press into springform pan.",
      "Beat cream cheese and sugar until smooth.",
      "Add eggs one at a time, beating well after each.",
      "Add vanilla and sour cream. Mix well.",
      "Pour over crust and bake for 50-60 minutes until center is set.",
      "Cool completely and refrigerate for at least 4 hours.",
      "Top with fresh berries before serving.",
    ],
    rating: 0,
    isFavorite: false,
    nutrition: {
      calories: 420,
      protein: 8,
      carbs: 35,
      fat: 28,
    },
    createdAt: new Date().toISOString(),
  },
]


// ==================== UTILITY FUNCTIONS ====================

/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
  const navMenu = document.getElementById("navMenu")
  const hamburgerBtn = document.getElementById("hamburgerBtn")
  if (navMenu) {
    navMenu.classList.toggle("active")
  }
  if (hamburgerBtn) {
    hamburgerBtn.classList.toggle("active")
  }
}

/**
 * Close menu when a link is clicked (mobile)
 */
function closeMenu() {
  const navMenu = document.getElementById("navMenu")
  const hamburgerBtn = document.getElementById("hamburgerBtn")
  if (navMenu) {
    navMenu.classList.remove("active")
  }
  if (hamburgerBtn) {
    hamburgerBtn.classList.remove("active")
  }
}

/**
 * Generate a unique ID
 */
function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

/**
 * Show error message
 */
function showError(message) {
  const errorContainer = document.getElementById("errorContainer")
  if (errorContainer) {
    errorContainer.textContent = message
    errorContainer.style.display = "block"
    setTimeout(() => {
      errorContainer.style.display = "none"
    }, 5000)
  }
}

/**
 * Show success message
 */
function showSuccess(message) {
  const successContainer = document.getElementById("successContainer")
  if (successContainer) {
    successContainer.textContent = message
    successContainer.style.display = "block"
    setTimeout(() => {
      successContainer.style.display = "none"
    }, 3000)
  }
}

/**
 * Get difficulty badge class
 */
function getDifficultyClass(difficulty) {
  const className = `difficulty-${difficulty.toLowerCase()}`
  return className
}

/**
 * Format time display
 */
function formatTime(minutes) {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const str = text === undefined || text === null ? "" : String(text)
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return str.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Check if URL is valid
 */
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  initializeMealPlanStorage();

  // Setup mobile menu close behavior
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const navbar = document.querySelector(".navbar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    if (navbar && !navbar.contains(e.target) && navMenu && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (currentPage === "index.html" || currentPage === "" || currentPage === "landing.html") {
    // Clear any stale edit state when returning to the home/landing page
    try { sessionStorage.removeItem("editRecipeId") } catch (e) { /* ignore */ }

    // `filterRecipes` is defined in `home.js`. Guard calls to avoid
    // ReferenceError if `home.js` wasn't loaded yet.
    if (typeof filterRecipes === "function") {
      filterRecipes();

      const searchInput = document.getElementById("searchInput");
      const difficultyFilter = document.getElementById("difficultyFilter");
      const categoryFilter = document.getElementById("categoryFilter");
      const prepTimeFilter = document.getElementById("prepTimeFilter");
      const favoriteFilter = document.getElementById("favoriteFilter");
      const resetButton = document.getElementById("resetFilters");

      if (searchInput) searchInput.addEventListener("input", filterRecipes);
      if (difficultyFilter) difficultyFilter.addEventListener("change", filterRecipes);
      if (categoryFilter) categoryFilter.addEventListener("change", filterRecipes);
      if (prepTimeFilter) prepTimeFilter.addEventListener("input", filterRecipes);
      if (favoriteFilter) favoriteFilter.addEventListener("change", filterRecipes);
      if (resetButton) resetButton.addEventListener("click", resetFilters);
    }
  } else if (currentPage === "recipe-detail.html") {
    loadRecipeDetail();
  } else if (currentPage === "add-recipe.html") {
    initializeForm();
  } else if (currentPage === "meal-plan.html") {
    const weekStart = getCurrentWeekStart();
    displayMealPlan(weekStart);
  } else if (currentPage === "shopping-list.html") {
    displayShoppingList();
  }


});
