/**
 * Navigation & Scroll Controller
 * Tracks station offsets, computes continuous scroll progress,
 * and updates side-rail active states and header display.
 */

const doc = document.documentElement;

export function initNavigation(sections, railLinks) {
    const N = sections.length;
    let tops = [];

    function computeTops() {
        tops = sections.map((s) => s.getBoundingClientRect().top + window.pageYOffset);
    }

    /**
     * Calculates fractional progress through the stations (0.0 to N - 1)
     */
    function getProgress() {
        const y = window.pageYOffset;
        let i = 0;
        for (let k = 0; k < N - 1; k++) {
            if (y >= tops[k]) i = k;
        }
        const a = tops[i];
        const b = tops[i + 1] !== undefined ? tops[i + 1] : a + 1;
        const f = i + (y - a) / Math.max(1, b - a);
        return Math.max(0, Math.min(N - 1, f));
    }

    /**
     * Updates active station UI in the navigation rail
     */
    function setActive(idx) {
        railLinks.forEach((link, i) => {
            if (i === idx) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
        doc.classList.toggle('show-mark', idx > 0);
    }

    // Scroll listener for sticky header / hint fade
    window.addEventListener(
        'scroll',
        () => {
            doc.classList.toggle('scrolled', window.pageYOffset > 40);
        },
        { passive: true }
    );

    // Dynamic resize observer for station positions
    if (window.ResizeObserver) {
        new ResizeObserver(computeTops).observe(document.body);
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(computeTops);
    }

    // Initial calculation
    computeTops();
    setActive(0);

    return {
        computeTops,
        getProgress,
        setActive,
        sectionCount: N
    };
}
