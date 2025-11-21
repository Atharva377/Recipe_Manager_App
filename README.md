# CookBook by Atharva-Your Personal Recipe Collection

A fully functional, browser-based recipe management application built with vanilla HTML, CSS, and JavaScript. Manage, search, organize recipes, plan meals, and generate shopping lists—all in your browser with no server required.

# Go to Atharva's CookBook: https://atharva377.github.io/Recipe_Manager_App/


## 🚀 How to Run the App

### Quick Start
1. **Download or Clone** the project files to your local machine
2. **Open in Browser** - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
3. **Start Using** - The app loads automatically with Veg Biryani (categorized as "Vegetarian") as the first recipe
3. **Avoid using incognito mode because it may cause localStorage issues.**

No installation, npm packages, or server setup required. Everything runs directly in your browser.

## 🌟 Unique Features Implemented

### 🎯 Advanced Recipe Management
- **Smart Search & Filtering** - Real-time search by title/description with multiple filter options
- **Recipe Duplication** - One-click recipe copying for creating variations
- **Favorites System** - Heart-based favorite marking with visual feedback
- **5-Star Rating System** - Interactive rating with persistent storage
- **Nutrition Tracking** - Complete nutrition info (calories, protein, carbs, fat)

### 📱 QR Code Integration
- **Dynamic QR Generation** - Generate scannable QR codes for any recipe
- **30-Second Timer** - Auto-closing QR codes with countdown display
- **Mobile Sharing** - "Scan for recipe from your phone" functionality
- **Recipe-Specific Codes** - Each QR code links directly to specific recipe details

### 🔄 Data Management
- **Export/Import System** - Full JSON backup/restore functionality
- **Browser Storage** - All data persists locally using localStorage
- **Data Validation** - Comprehensive form validation with error messages
- **Duplicate Prevention** - Smart merging during import operations

### 🗓️ Meal Planning & Shopping
- **Weekly Meal Planner** - Visual calendar for breakfast, lunch, dinner planning
- **Smart Shopping Lists** - Auto-generated from meal plans with ingredient quantities
- **Interactive Checklist** - Check off items as you shop with visual feedback
- **Print & Download** - Export shopping lists as printable/text files

### 🎨 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Real-time Updates** - Instant filtering and search results
- **Empty States** - Helpful messages when no recipes or items found

## 📊 Data Structure in localStorage

### Storage Keys
- `"recipes"` - Array of recipe objects
- `"mealPlan"` - Weekly meal plans by date
- `"shoppingList"` - Shopping list items with quantities

### Recipe Object Schema
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
1. **Browser LocalStorage Available** - Assumes the browser supports localStorage API (all modern browsers do)
2. **No Data Backup** - Data persists only in the current browser; clearing browser data will delete all recipes
3. **Single Browser Use** - Data doesn't sync across browsers or devices
4. **Online Images Only** - App requires internet to display recipe images from URLs
5. **Unique Titles Not Enforced** - Duplicate recipe titles are allowed
6. **No Authentication** - All data is public to anyone with browser access to this machine
7. **HTTPS for Images** - Some browsers may block mixed content (HTTP images on HTTPS sites)

### Limitations
1. **Storage Capacity** - Limited to ~5-10MB per domain (varies by browser)
2. **No Backup/Export** - No built-in download/export functionality
3. **No Sharing** - Recipes cannot be easily shared between users or devices
4. **No Image Upload** - Only external URLs supported; cannot upload local images
5. **No User Accounts** - Single user only; no multi-user support
6. **No Offline Image Caching** - Recipe images won't display without internet
7. **No Database** - Not suitable for large-scale recipe collections (100+ recipes)
8. **No Advanced Search** - Search only works on title and description, not ingredients

## Known Issues

### 1. Image Loading Failures
**Issue:** Recipe images may not load if the URL is broken or uses HTTP on an HTTPS site.
**Workaround:** Use HTTPS image URLs only. Test image URLs before adding recipes.

### 2. LocalStorage Quota Exceeded
**Issue:** Adding too many recipes with long descriptions may exceed browser storage limits.
**Workaround:** Delete unused recipes or store fewer high-resolution images.

### 3. Data Loss on Browser Clear
**Issue:** Clearing browser cache/cookies will delete all recipes stored in localStorage.
**Workaround:** Manually backup important recipes by noting their details.

### 4. Corrupted Data Recovery
**Issue:** If localStorage data becomes corrupted (unlikely), the app may fail to load.
**Workaround:** Open browser DevTools (F12) → Application → Storage → Clear localStorage, then reload the page to reset with fresh data.

### 5. Special Characters in Titles
**Issue:** Some special characters in recipe titles may cause display issues.
**Workaround:** Use standard alphanumeric characters, spaces, and basic punctuation.

### 6. Mobile Keyboard Layout
**Issue:** On mobile, the keyboard may overlap with input fields.
**Workaround:** The app is responsive and scrollable; scroll after clicking input fields.

## Features

### Core Features
- View all recipes in a responsive grid layout
- Search recipes by title or description (real-time)
- Filter by difficulty level (Easy, Medium, Hard)
- Filter by maximum prep time
- View detailed recipe information
- Add new recipes with a form
- Edit existing recipes
- Delete recipes with confirmation
- All data persists in browser localStorage

### User Experience
- Responsive design (desktop, tablet, mobile)
- Smooth transitions and animations
- Clear error messages and validation
- Success notifications
- Empty state handling
- Loading states where applicable

## Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox layout, responsive design, custom properties
- **JavaScript** - No frameworks or libraries
- **localStorage API** - Client-side data persistence
- **Online Images** - External image URLs (Placeholder images included)
