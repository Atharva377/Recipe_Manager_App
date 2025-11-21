// Simple i18n system supporting English (default), Hindi, Marathi
(function () {
    const translations = {
        en: {
            brand: '🍳 CookBook by Atharva',
            nav_home: 'Home',
            nav_add: 'Add Recipe',
            nav_meal: 'Meal Plan',
            nav_shop: 'Shopping List',
            nav_import: 'Import',
            nav_export: 'Export',

            hero_title: "Atharva's Kitchen",
            hero_sub: 'Discover, manage, and share your favorite recipes',

            search_placeholder: 'Search recipes by title...',
            category_label: 'Category:',
            category_all: 'All Categories',
            difficulty_label: 'Difficulty:',
            difficulty_all: 'All Levels',
            prepTime_label: 'Max Prep Time (mins):',
            favorites_only: 'Favorites Only',
            reset_filters: 'Reset Filters',

            no_recipes_title: 'No recipes found',
            no_recipes_text: 'Try adjusting your search or filters, or add a new recipe',

            import_title: 'Import Recipes',
            import_text: 'Select a JSON file to import recipes:',
            import_button: 'Import',
            cancel: 'Cancel',

            form_title: 'Add New Recipe',
            label_recipe_title: 'Recipe Title *',
            placeholder_title: 'e.g., Veg Biryani',
            label_description: 'Description',
            placeholder_description: 'Describe your recipe in a few sentences...',
            label_category: 'Category *',
            select_category: 'Select category',
            label_tags: 'Tags (comma-separated)',
            placeholder_tags: 'e.g., spicy, quick, healthy',
            label_prepTime: 'Prep Time (minutes) *',
            label_cookTime: 'Cook Time (minutes) *',
            label_servings: 'Servings *',
            label_difficulty: 'Difficulty Level *',
            select_difficulty: 'Select difficulty',
            legend_nutrition: 'Nutrition Information (per serving)',
            label_imageUrl: 'Recipe Image URL',
            small_image_note: 'Paste a URL to a food image. Leave blank for default image.',
            label_ingredients: 'Ingredients * (one per line)',
            label_steps: 'Cooking Steps * (one per line)',
            btn_save: 'Save Recipe',
            btn_clear: 'Clear Form',
            btn_cancel: 'Cancel',

            weekly_title: 'Weekly Meal Planning',
            weekly_sub: 'Plan your meals for the week',
            prev_week: '← Previous Week',
            next_week: 'Next Week →',
            gen_shoplist: 'Generate Shopping List',
            select_recipe: 'Select a Recipe',

            qr_title: 'Share Recipe via QR Code',
            qr_scan_hint: 'Scan for recipe from your phone',

            shopping_title: 'Shopping List',
            btn_print: '🖨️ Print',
            btn_download: '📥 Download',
            btn_clear_all: 'Clear All',
            btn_back_mealplan: 'Back to Meal Plan',

            footer: '© 2025 Recipe Manager. Built with love for cooking enthusiasts.'
        },
        hi: {
            brand: '🍳 कुकबुक बाय अथर्वा',
            nav_home: 'होम',
            nav_add: 'नया नुस्खा जोड़ें',
            nav_meal: 'मील प्लान',
            nav_shop: 'शॉपिंग सूची',
            nav_import: 'आयात',
            nav_export: 'निर्यात',

            hero_title: 'अथर्वा की रसोई',
            hero_sub: 'अपने पसंदीदा व्यंजनों को खोजें, प्रबंधित करें और साझा करें',

            search_placeholder: 'शीर्षक से नुस्खे खोजें...',
            category_label: 'वर्ग:',
            category_all: 'सभी श्रेणियाँ',
            difficulty_label: 'कठिनाई:',
            difficulty_all: 'सभी स्तर',
            prepTime_label: 'अधिकतम तैयारी समय (मिन):',
            favorites_only: 'सिर्फ़ पसंदीदा',
            reset_filters: 'फिल्टर रीसेट करें',

            no_recipes_title: 'कोई नुस्खा नहीं मिला',
            no_recipes_text: 'अपनी खोज या फ़िल्टर समायोजित करें, या नया नुस्खा जोड़ें',

            import_title: 'नुस्खे आयात करें',
            import_text: 'नुस्खे आयात करने के लिए JSON फ़ाइल चुनें:',
            import_button: 'आयात',
            cancel: 'रद्द करें',

            form_title: 'नया नुस्खा जोड़ें',
            label_recipe_title: 'नुस्खा शीर्षक *',
            placeholder_title: 'उदा., वेज बिरयानी',
            label_description: 'विवरण',
            placeholder_description: 'अपना नुस्खा कुछ वाक्यों में वर्णन करें...',
            label_category: 'वर्ग *',
            select_category: 'वर्ग चुनें',
            label_tags: 'टैग (कॉमा से अलग)',
            placeholder_tags: 'उदा., मसालेदार, त्वरित, स्वास्थ्यवर्धक',
            label_prepTime: 'तैयारी समय (मिनट) *',
            label_cookTime: 'पकाने का समय (मिनट) *',
            label_servings: 'सेविंग्स *',
            label_difficulty: 'कठिनाई स्तर *',
            select_difficulty: 'कठिनाई चुनें',
            legend_nutrition: 'पोषण जानकारी (प्रति सर्विंग)',
            label_imageUrl: 'नुस्खा छवि URL',
            small_image_note: 'इमेज URL पेस्ट करें। डिफ़ॉल्ट के लिए खाली छोड़े।',
            label_ingredients: 'सामग्री * (प्रति पंक्ति एक)',
            label_steps: 'कुकिंग स्टेप्स * (प्रति पंक्ति एक)',
            btn_save: 'नुस्खा सहेजें',
            btn_clear: 'फॉर्म साफ़ करें',
            btn_cancel: 'रद्द करें',

            weekly_title: 'साप्ताहिक भोजन योजना',
            weekly_sub: 'सप्ताह के लिए अपने भोजन योजना बनाएं',
            prev_week: '← पिछला सप्ताह',
            next_week: 'अगला सप्ताह →',
            gen_shoplist: 'शॉपिंग सूची बनाएँ',
            select_recipe: 'एक नुस्खा चुनें',

            qr_title: 'QR कोड के माध्यम से नुस्खा साझा करें',
            qr_scan_hint: 'फोन से स्कैन करें',

            shopping_title: 'शॉपिंग सूची',
            btn_print: '🖨️ प्रिंट',
            btn_download: '📥 डाउनलोड',
            btn_clear_all: 'सभी हटाएँ',
            btn_back_mealplan: 'मील प्लान पर वापस जाएँ',

            footer: '© 2025 Recipe Manager. खाना पकाने के शौकीनों के लिए प्यार से बनाया गया।'
        },
        mr: {
            brand: '🍳 कुकबुक बाय अथर्वा',
            nav_home: 'मुख्य पृष्ठ',
            nav_add: 'नवीन रेसिपी जोडा',
            nav_meal: 'मील प्लॅन',
            nav_shop: 'शॉपिंग यादी',
            nav_import: 'आयात',
            nav_export: 'निर्यात',

            hero_title: 'अथर्वा ची स्वयंपाकघर',
            hero_sub: 'आपल्या आवडत्या रेसिपी शोधा, व्यवस्थापित करा आणि शेअर करा',

            search_placeholder: 'शिर्षकाने रेसिपी शोधा...',
            category_label: 'वर्ग:',
            category_all: 'सर्व वर्ग',
            difficulty_label: 'अवघडपणा:',
            difficulty_all: 'सर्व स्तर',
            prepTime_label: 'कमाल तयारी वेळ (मिन):',
            favorites_only: 'फक्त आवडीनुसार',
            reset_filters: 'फिल्टर रीसेट करा',

            no_recipes_title: 'कोणतीही रेसिपी सापडली नाही',
            no_recipes_text: 'तुमची शोध किंवा फिल्टर समायोजित करा, किंवा नवीन रेसिपी जोडा',

            import_title: 'रेसिपी आयात करा',
            import_text: 'रेसिपी आयात करण्यासाठी JSON फाइल निवडा:',
            import_button: 'आयात करा',
            cancel: 'रद्द करा',

            form_title: 'नवीन रेसिपी जोडा',
            label_recipe_title: 'रेसिपी शीर्षक *',
            placeholder_title: 'उदा., वेज बिर्याणी',
            label_description: 'वर्णन',
            placeholder_description: 'तुमची रेसिपी काही वाक्यात वर्णन करा...',
            label_category: 'वर्ग *',
            select_category: 'वर्ग निवडा',
            label_tags: 'टॅग (कॉमा-निहाय)',
            placeholder_tags: 'उदा., तिखट, जलद, आरोग्यदायी',
            label_prepTime: 'तयारी वेळ (मिनिट) *',
            label_cookTime: 'शिजवण्याचा वेळ (मिनिट) *',
            label_servings: 'सर्व्हिंग्ज *',
            label_difficulty: 'अवघडपणा स्तर *',
            select_difficulty: 'अवघडपणा निवडा',
            legend_nutrition: 'पोषण माहिती (प्रति सर्व्हिंग)',
            label_imageUrl: 'रेसिपी प्रतिमा URL',
            small_image_note: 'एक प्रतिमा URL पेस्ट करा. डीफॉल्टसाठी रिक्त ठेवा.',
            label_ingredients: 'साहित्य * (प्रत्येक ओळीत एक)',
            label_steps: 'कुकिंग स्टेप्स * (प्रत्येक ओळीत एक)',
            btn_save: 'रेसिपी जतन करा',
            btn_clear: 'फॉर्म साफ करा',
            btn_cancel: 'रद्द करा',

            weekly_title: 'साप्ताहिक मील नियोजन',
            weekly_sub: 'आठवड्यासाठी तुमची मील योजना करा',
            prev_week: '← मागील आठवडा',
            next_week: 'पुढील आठवडा →',
            gen_shoplist: 'शॉपिंग यादी तयार करा',
            select_recipe: 'एक रेसिपी निवडा',

            qr_title: 'QR कोड द्वारे रेसिपी शेअर करा',
            qr_scan_hint: 'फोनने स्कॅन करा',

            shopping_title: 'शॉपिंग यादी',
            btn_print: '🖨️ प्रिंट',
            btn_download: '📥 डाउनलोड',
            btn_clear_all: 'सगळे क्लिअर करा',
            btn_back_mealplan: 'मील प्लॅन कडे परत जा',

            footer: '© 2025 Recipe Manager. स्वयंपाक प्रेमींनी प्रेमाने बनविले.'
        }
    };

    function getSavedLang() {
        return localStorage.getItem('appLang') || 'en';
    }

    function saveLang(lang) {
        localStorage.setItem('appLang', lang);
        document.documentElement.lang = lang;
        window.dispatchEvent(new Event('languageChanged'));
    }

    function translatePage() {
        const lang = getSavedLang();
        const dict = translations[lang] || translations.en;

        // translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            const val = dict[key] || translations.en[key] || '';
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.placeholder !== undefined) el.placeholder = val;
            } else if (el.tagName === 'OPTION') {
                el.textContent = val;
            } else {
                el.textContent = val;
            }
        });

        // placeholders via data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = translations[lang][key] || translations.en[key] || '';
            el.placeholder = val;
        });

        // update select value for lang selector
        const selector = document.getElementById('lang-select');
        if (selector) selector.value = lang;

        // update document lang
        document.documentElement.lang = lang;
    }

    function initLanguageSelector() {
        // create selector if missing
        let sel = document.getElementById('lang-select');
        if (!sel) {
            const container = document.createElement('div');
            container.className = 'lang-select-container';
            sel = document.createElement('select');
            sel.id = 'lang-select';
            const opts = [ ['en','English'], ['hi','हिन्दी'], ['mr','मराठी'] ];
            opts.forEach(o => {
                const opt = document.createElement('option');
                opt.value = o[0];
                opt.textContent = o[1];
                sel.appendChild(opt);
            });
            container.appendChild(sel);
            // try to append into navbar if exists
            const nav = document.querySelector('.navbar-container');
            if (nav) nav.appendChild(container);
            else document.body.insertBefore(container, document.body.firstChild);
        }

        sel.addEventListener('change', (e) => {
            saveLang(e.target.value);
            translatePage();
        });

        // translate on languageChanged
        window.addEventListener('languageChanged', translatePage);
    }

    // expose helper
    window.i18n = {
        t: function (key) { return (translations[getSavedLang()] || translations.en)[key] || translations.en[key] || '' },
        setLanguage: saveLang,
        translatePage: translatePage
    };

    document.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('appLang')) localStorage.setItem('appLang', 'en');
        initLanguageSelector();
        translatePage();
    });

})();
