/**
 * Theme Toggle Module
 * Manages dark mode / light mode for the Recipe Manager App
 * Persists user preference in localStorage
 */

class ThemeManager {
  constructor() {
    this.THEME_STORAGE_KEY = 'recipe-manager-theme';
    this.DARK_MODE_CLASS = 'dark-mode';
    this.LIGHT_MODE_CLASS = 'light-mode';
  }

  /**
   * Initialize the theme manager
   * Loads saved theme preference or detects system preference
   */
  init() {
    // Wait for body to exist
    if (!document.body) {
      setTimeout(() => this.init(), 50);
      return;
    }

    const savedTheme = this.getSavedTheme();
    const prefersDark = this.prefersColorSchemeDark();

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          // Only apply system preference if user hasn't manually set a theme
          if (!this.getSavedTheme()) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
    }
  }

  /**
   * Get the saved theme from localStorage
   * @returns {string|null} 'dark', 'light', or null
   */
  getSavedTheme() {
    return localStorage.getItem(this.THEME_STORAGE_KEY);
  }

  /**
   * Check if the user's system prefers dark color scheme
   * @returns {boolean}
   */
  prefersColorSchemeDark() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Set the theme ('dark' or 'light')
   * @param {string} theme - 'dark' or 'light'
   */
  setTheme(theme) {
    const body = document.body;

    if (theme === 'dark') {
      body.classList.add(this.DARK_MODE_CLASS);
      body.classList.remove(this.LIGHT_MODE_CLASS);
    } else if (theme === 'light') {
      body.classList.add(this.LIGHT_MODE_CLASS);
      body.classList.remove(this.DARK_MODE_CLASS);
    }

    // Save the preference
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent('themechange', { detail: { theme } })
    );
  }

  /**
   * Toggle between dark and light themes
   */
  toggleTheme() {
    const currentTheme = this.getSavedTheme() || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Get the current theme
   * @returns {string} 'dark' or 'light'
   */
  getCurrentTheme() {
    return this.getSavedTheme() || 'light';
  }

  /**
   * Update the theme toggle button's appearance and aria-label
   * @param {HTMLElement} button - The toggle button element
   */
  updateThemeToggleButton(button) {
    if (!button) return;

    const currentTheme = this.getCurrentTheme();
    const isDark = currentTheme === 'dark';

    // Update icon/text
    if (button.querySelector('.theme-icon')) {
      const icon = button.querySelector('.theme-icon');
      icon.textContent = isDark ? '☀️' : '🌙';
    }

    // Update aria-label for accessibility
    button.setAttribute(
      'aria-label',
      isDark
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode'
    );

    // Add title for tooltip
    button.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
}

// Create global instance but defer init
const themeManager = new ThemeManager();

/**
 * Initialize theme toggle button
 * Call this function in your HTML after the button is rendered
 */
function initializeThemeToggle() {
  const toggleButton = document.getElementById('themeToggleBtn');

  if (!toggleButton) {
    console.warn('Theme toggle button not found');
    return;
  }

  // Initialize theme manager if not already done
  if (!themeManager.initialized) {
    themeManager.init();
    themeManager.initialized = true;
  }

  // Update button appearance on load
  themeManager.updateThemeToggleButton(toggleButton);

  // Add click handler
  toggleButton.addEventListener('click', () => {
    themeManager.toggleTheme();
    themeManager.updateThemeToggleButton(toggleButton);
  });

  // Update button when theme changes from other sources
  window.addEventListener('themechange', () => {
    themeManager.updateThemeToggleButton(toggleButton);
  });
}

// Auto-initialize theme immediately if DOM is ready
function initThemeImmediately() {
  if (!themeManager.initialized) {
    themeManager.init();
    themeManager.initialized = true;
  }
}

// Run theme initialization as early as possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeImmediately);
} else {
  initThemeImmediately();
}

// Initialize toggle button when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeThemeToggle);
} else {
  setTimeout(initializeThemeToggle, 0);
}
