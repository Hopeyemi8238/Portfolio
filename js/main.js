/**
 * Application Entry Point
 * Bootstraps the Theme Controller, Navigation Tracker, and 3D Scene Engine.
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initScene } from './scene.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scene');
    const themeBtn = document.getElementById('themeBtn');
    const sections = Array.from(document.querySelectorAll('[data-station]'));
    const railLinks = Array.from(document.querySelectorAll('.rail a'));

    // 1. Initialize Navigation Controller
    const navigation = initNavigation(sections, railLinks);

    // 2. Initialize 3D Scene Engine
    const scene = initScene({
        canvas,
        getProgress: navigation.getProgress,
        onActiveStationChange: (idx) => navigation.setActive(idx)
    });

    // 3. Initialize Theme Controller & bind to 3D Scene
    initTheme(themeBtn, () => {
        if (scene) {
            scene.syncThemeMaterials();
        }
    });

    // 4. Handle resize synchronization
    window.addEventListener('resize', () => {
        navigation.computeTops();
    });
});
