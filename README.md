# CookBook by Atharva-Your Personal Recipe Collection

A fully functional, browser-based recipe management application built with vanilla HTML, CSS, and JavaScript. Manage, search, organize recipes, plan meals, and generate shopping lists—all in your browser with no server required.

**Go to Atharva's CookBook:** https://atharva377.github.io/Recipe_Manager_App/


## 🚀 How to Run the App

### Quick Start
1. **Download or Clone** the project files to your local machine
2. **Open in Browser** - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
3. **Start Using** - The app loads automatically with Veg Biryani (categorized as "Vegetarian") as the first recipe
3. **Avoid using incognito mode because it may cause localStorage issues.**

No installation, npm packages, or server setup required. Everything runs directly in your browser.

## 📊 Data Structure in localStorage

### Storage Keys
- `"recipes"` - Array of recipe objects
- `"mealPlan"` - Weekly meal plans by date
- `"shoppingList"` - Shopping list items with quantities

### Recipe Object Schema(Example)
```json
{
  "id": 1700000000000.123,
  "title": "Veg Biryani",
  "description": "An aromatic and flavorful vegetarian rice dish with layered vegetables and fragrant spices.",
  "category": "Vegetarian",
  "tags": ["indian", "spicy", "rice", "vegetarian"],
  "prepTime": 30,
  "cookTime": 45,
  "servings": 4,
  "difficulty": "Medium",
  "imageUrl": "https://images.unsplash.com/photo-1626082927389-6cd097cda666?w=500&h=300&fit=crop",
  "ingredients": [
    "2 cups basmati rice",
    "3 cups mixed vegetables",
    "4 tbsp ghee or vegetable oil",
    "2 large onions, sliced"
  ],
  "steps": [
    "Wash the basmati rice thoroughly and soak for 30 minutes",
    "Cut all vegetables into uniform sizes and set aside",
    "Heat ghee in a large pot and fry onions until golden"
  ],
  "nutrition": {
    "calories": 350,
    "protein": 12,
    "carbs": 45,
    "fat": 14
  },
  "rating": 0,
  "isFavorite": false,
  "createdAt": "2024-11-20T10:30:00.000Z",
  "updatedAt": "2024-11-20T10:30:00.000Z"
}
```

### Data Initialization
- On **first load**, the app checks if localStorage is empty
- If empty, Veg Biryani recipe is automatically inserted
- All subsequent data is user-generated or imported

## Assumptions and Limitations

### Assumptions
1. **Browser LocalStorage is Available** - Assume the browser is supporting localStorage API (which most modern browsers do)
2. **No Data Persisting** - Data only persists while using the current browser, and deleting your local browser data clears all recipes.
3. **Only Using on One Browser** - Data will not sync between other browsers or devices.
4. **Only Online Images** - You will need to be connected to the Internet to display recipe images from their URLs.
5. **No Enforced Unique Titles** - The app will allow you to enter recipes with the same title.
6. **No Authentication Exists** - All data is visible to anyone who has access to this machine through the browser.
7. **HTTPS Images Only** - Some browsers may block mixed content if anything is set to use http for images on an https site.

### Limitations
1. **Storage Options** - Each domain is only allowed ~5-10MB (depending on the browser).
2. **No Backup/Export Options** - There is currently no ability to download/export recipes or images.
3. **No Sharing Options** - Recipes cannot be easily shared among users or devices.
4. **No Image Uploading** - You can only include links for external images; images cannot be uploaded from the local device.
5. **No User Accounts** - Only one user is allowed; there will be no support for multiple users.
6. **No Downloaded/Offline Image Caching** - If you are offline, your recipe images will not load.
7. **No Database** - Your recipes will not be great if you want to compile a database of recipes (100+).
8. **No Advanced Search Functionality** - Search only works against the title and description, not the ingredients.

## Known Issues

### 1. Image Not Loading
**Problem:** If the URL is broken or starts with HTTP on an HTTPS site, it will not work.
**Temporary Solution:** Use HTTPS image URLs. Test your URL before your recipe is added.

### 2. LocalStorage Quota Exceeded
**Problem:** If you've added many recipes with long descriptions, you may hit your browser storage limit.
**Temporary Solution:** Either delete any recipes you don't use, or have fewer high-definition images stored.

### 3. Data Loss from Clearing Browser
**Problem:** If you clear your browser cache/cookies, all recipes stored in localStorage will be deleted.
**Temporary Solution:** Manually keep track of and record any important recipe.

### 4. Corrupting Data
**Problem:** In the unlikely event something gets corrupted in the localStorage, the app may not work at all.
**Temporary Solution:** In the browser, open DevTools (F12) → Application → Storage → Clear localStorage. Reload the page to get a fresh data resync of the app.

### 5. Special Characters in Titles
**Problem:** In some cases, special characters in the recipe title may not display properly.
**Temporary Solution:** Use standard alphanumeric characters, spaces, and basic punctuation only.

### 6. Mobile Keyboard Layout
**Problem:** On mobile the keyboard may overlap the input fields.
**Temporary Solution:** The app is responsive and scrollable, scroll after you click on the input fields!

## 🌟 Unique Features Implemented

### 🎯 Advanced Recipe Management
- **Smart Search & Filtering** - Perform searches in real time by title/description with multiple filter options
- **Recipe Duplication** - One-click copy a recipe to create variations
- **Favorites System** - Mark a recipe as a favorite with a heart and get visual feedback
- **5-Star Rating System** - During any rating process, the rating persists when you re-enter the recipe
- **Nutrition Tracking** - All nutritional information for each recipe (counting calories, protein, carbs, fat)

### 📱 QR Code Integration
- **Dynamic QR Generation** - Generate a scannable QR code for any recipe
- **30 Second Timer** - QR codes will close automatically after 30 seconds and show a countdown clock
- **Mobile Sharing** - "Scan for recipe from your phone" capability
- **Recipe-Specific Codes** - Each QR code leads directly to specific details of that recipe

### 🔄 Data Management
- **Export/Import System** - Full JSON backup/restore functionality
- **Browser Storage** - All data is stored locally using localStorage
- **Data Validation** - Fully validated forms with message errors
- **Duplicate Prevention** - If there is a recipe with the same name, an import will "smart merge" recipes when importing

### 🗓️ Meal Planning & Shopping
- **Weekly Meal Planner** - A calendar to visualize what you are planning for breakfast, lunch, and dinner by the day of the week
- **Smart Shopping Lists** - Automatically generated shopping list from meal planning with quantities of each ingredient
- **Checklist** - Check off your items while shopping with visual feedback
- **Print & Download** - Download the shopping lists to print or read it as text

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Real-time Updates** - Instant filtering and search results
- **Empty States** - Helpful messages when no recipes or items found

## Features

### Primary Functionality
- Display all recipes using a responsive grid format
- Search recipes by title or description (real-time)
- Filter by the difficulty level (Easy, Medium, Hard)
- Filter by prep time (maximum)
- View detailed information about recipes
- Allow the user to add recipes via a form
- Allow the user to edit recipes
- Allow the user to delete recipes after confirmation
- All application data persisted to browser localStorage.

### User Experience
- Responsive design (desktop, tablet, mobile)
- Transitions and animations
- Error messages and validation with clarity
- Notification for success
- Handle an empty state
- Handle loading states as necessary

## Technical Stack

- **HTML5** - Semantic page structure
- **CSS3** - Flexbox layout, responsive design, custom properties
- **JavaScript** - No frameworks or libraries
- **localStorage API** - Enables client-side data storage
- **Online Images** - All images are sourced from external URLs (mainly from Unsplash)