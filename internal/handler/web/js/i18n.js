// i18n for 6panel web page

// Const language and translation
const I18N_MESSAGES = {
    // English
    'en': {},
    // 简体中文
    'zh-CN': {}
};

// Get current language
function getCurrentLanguage() {
    // Get language from HTML attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && I18N_MESSAGES[htmlLang]) {
        return htmlLang;
    }
    
    // If HTML attribute is invalid, try to get language from browser
    const browserLang = navigator.language.split('-')[0]; // e.g. "en-US" -> "en"
    if (I18N_MESSAGES[browserLang]) {
        return browserLang;
    }
    
    // Default language (e.g. 'en')
    return 'en';
}

// Get translation by key and language
function getTranslation(key, lang = getCurrentLanguage()) {
    return I18N_MESSAGES[lang] && I18N_MESSAGES[lang][key] ? I18N_MESSAGES[lang][key] : `[${key}]`;
}

// Translate page
function translatePage() {
    const lang = getCurrentLanguage();
    // console.log('Translating page to:', lang);
    
    // Find all elements with 'language' attribute
    const elements = document.querySelectorAll('[language]');
    
    elements.forEach(element => {
        const key = element.getAttribute('language');
        const translation = getTranslation(key, lang);
        
        // Determine whether to replace text content or placeholder
        if (element.tagName.toLowerCase() === 'input' || 
            element.tagName.toLowerCase() === 'textarea') {
            // For input elements, set placeholder
            element.setAttribute('placeholder', translation);
        } else if (element.tagName.toLowerCase() === 'option' && 
                   element.getAttribute('value') === 'scanning') {
            // Special handling for scanning option
            element.textContent = translation;
        } else {
            // For other elements, set text content
            element.textContent = translation;
        }
    });
}

// If the page is loaded, translate it
document.addEventListener('DOMContentLoaded', function() {
    // Ensure that translatePage is called after createHomePage
    // In main.js, you will see that loadI18n() needs to be placed after creatHomePage()
    // console.log('i18n system loaded. Call translatePage() after DOM is ready.');
});