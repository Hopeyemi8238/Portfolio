/**
 * Theme Controller
 * Manages light / dark theme switching, localStorage persistence,
 * system preference synchronization, and UI state.
 */

const doc = document.documentElement;

export function effectiveTheme() {
    const attr = doc.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function toggleTheme() {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    doc.setAttribute('data-theme', next);
    try {
        localStorage.setItem('portfolio-theme', next);
    } catch (e) {
        // localStorage might be unavailable or disabled
    }
    return next;
}

export function initTheme(themeBtn, onThemeChangeCallback = () => {}) {
    // 1. Restore saved theme preference if present
    try {
        const saved = localStorage.getItem('portfolio-theme');
        if (!doc.hasAttribute('data-theme') && (saved === 'light' || saved === 'dark')) {
            doc.setAttribute('data-theme', saved);
        }
    } catch (e) {
        // Ignore localStorage error
    }

    function syncUI() {
        const isDark = effectiveTheme() === 'dark';
        if (themeBtn) {
            themeBtn.classList.toggle('is-dark', isDark);
            themeBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        }
        onThemeChangeCallback();
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            toggleTheme();
        });
    }

    // Observe changes to html data-theme attribute
    const observer = new MutationObserver(syncUI);
    observer.observe(doc, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Listen to system dark/light mode preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncUI);

    // Initial sync
    syncUI();

    return {
        syncUI,
        effectiveTheme,
        toggleTheme
    };
}
