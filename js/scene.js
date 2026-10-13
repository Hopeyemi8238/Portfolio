/**
 * 3D Scene Controller
 * Coordinates Three.js WebGLRenderer, PerspectiveCamera, Lights, Fog,
 * Catmull-Rom flight path, procedural stations, shards, and animation loop.
 */

import { STATION_POSITIONS, STATION_SWAYS, createStationMakers } from './objects.js';
import { createShards } from './shards.js';

const doc = document.documentElement;

export function initScene({ canvas, getProgress, onActiveStationChange }) {
    const THREE = window.THREE;
    if (!THREE) {
        doc.classList.add('no-webgl');
        console.warn('Three.js library is not loaded.');
        return null;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
    } catch (e) {
        doc.classList.add('no-webgl');
        console.error('WebGL initialization failed:', e);
        return null;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeaf0f6, 12, 44);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    scene.add(camera);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x8fa3bd, 0.75);
    scene.add(hemi);

    // Studio Key Light (crisp frontal directional light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
    keyLight.position.set(4, 7, 8);
    keyLight.target.position.set(0, 0, -10);
    camera.add(keyLight);
    camera.add(keyLight.target);

    // Warm Studio Fill Light (soft friendly bounce from opposite angle)
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.45);
    fillLight.position.set(-5, -4, 6);
    camera.add(fillLight);

    // Atmospheric Rim / Edge Accent Light (highlights silhouettes & specular facets)
    const rimLight = new THREE.DirectionalLight(0xc7d2fe, 0.4);
    rimLight.position.set(0, 8, -8);
    camera.add(rimLight);

    // Dynamic Materials Registry
    const inkMats = [];

    function mat(color) {
        return new THREE.MeshStandardMaterial({
            color,
            roughness: 0.28,
            metalness: 0.25,
            flatShading: true
        });
    }

    function inkLine(opacity) {
        const m = new THREE.LineBasicMaterial({
            color: 0x0f1b33,
            transparent: true,
            opacity
        });
        inkMats.push(m);
        return m;
    }

    function inkWire(opacity) {
        const m = new THREE.MeshBasicMaterial({
            color: 0x0f1b33,
            wireframe: true,
            transparent: true,
            opacity
        });
        inkMats.push(m);
        return m;
    }

    function syncThemeMaterials() {
        const cs = getComputedStyle(doc);
        const bg = new THREE.Color(cs.getPropertyValue('--bg').trim() || '#eaf0f6');
        const ink = new THREE.Color(cs.getPropertyValue('--ink').trim() || '#0f1b33');
        const dark = bg.r + bg.g + bg.b < 1.5;

        scene.fog.color.copy(bg);
        inkMats.forEach((m) => {
            m.color.copy(ink);
        });
        hemi.intensity = dark ? 0.65 : 0.8;
        keyLight.intensity = dark ? 0.85 : 0.95;
        fillLight.intensity = dark ? 0.35 : 0.45;
        rimLight.intensity = dark ? 0.5 : 0.35;
    }

    // Pointer coordinates
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener(
        'pointermove',
        (e) => {
            pointerX = (e.clientX / window.innerWidth) * 2 - 1;
            pointerY = (e.clientY / window.innerHeight) * 2 - 1;
        },
        { passive: true }
    );

    // Instantiate Station Objects
    const makers = createStationMakers(THREE, {
        mat,
        inkWire,
        inkLine,
        getPointer: () => ({ x: pointerX, y: pointerY })
    });

    const objs = [];
    const stationCount = makers.length;

    makers.forEach((make, i) => {
        const group = make();
        const holder = new THREE.Group();
        holder.add(group);
        holder.position.set(
            STATION_POSITIONS[i][0],
            STATION_POSITIONS[i][1],
            STATION_POSITIONS[i][2]
        );
        scene.add(holder);
        objs.push({
            holder,
            group,
            spin: 0,
            boost: 0,
            tx: 0,
            ty: 0
        });
    });

    // Background Shards
    const shards = createShards(THREE, scene, stationCount, STATION_POSITIONS);

    // Responsive Camera Flight Path (Catmull-Rom Spline)
    let camCurve;
    let lookCurve;
    let objScale = 1;
    let narrow = false;

    function rebuildPath() {
        const offx = narrow ? 0 : 3.4;
        const offy = narrow ? -2.6 : 0;
        const dist = narrow ? 15 : 11.5;
        const sw = narrow ? 0.4 : 1;
        const cp = [];
        const lp = [];

        for (let i = 0; i < stationCount; i++) {
            const L = new THREE.Vector3(
                STATION_POSITIONS[i][0] - offx,
                STATION_POSITIONS[i][1] + offy,
                STATION_POSITIONS[i][2]
            );
            lp.push(L);
            cp.push(new THREE.Vector3(L.x + STATION_SWAYS[i] * sw, L.y + 0.6, L.z + dist));
        }

        camCurve = new THREE.CatmullRomCurve3(cp, false, 'catmullrom', 0.5);
        lookCurve = new THREE.CatmullRomCurve3(lp, false, 'catmullrom', 0.5);
        objScale = narrow ? 0.72 : 1;
    }

    function layout() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        narrow = w < 760 || w / h < 0.85;
        rebuildPath();
    }

    window.addEventListener('resize', layout);
    layout();
    syncThemeMaterials();

    // Render & Animation Loop
    function easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    function clamp01(x) {
        return x < 0 ? 0 : x > 1 ? 1 : x;
    }

    const camPos = new THREE.Vector3();
    const lookPos = new THREE.Vector3();
    let last = performance.now();
    let t = 0;
    let f = getProgress();
    let activeIdx = -1;
    let px = 0;
    let py = 0;

    function frame(now) {
        requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;

        const target = getProgress();
        f = reduceMotion ? target : f + (target - f) * (1 - Math.exp(-dt * 5));

        // Ease camera motion inside segments for lingering station stops
        const fi = Math.min(Math.floor(f), stationCount - 2);
        const fr = clamp01(f - fi);
        const fe = fi + fr * fr * fr * (fr * (fr * 6 - 15) + 10);
        const tt = fe / (stationCount - 1);

        camCurve.getPoint(tt, camPos);
        lookCurve.getPoint(tt, lookPos);

        if (!reduceMotion) {
            const k = 1 - Math.exp(-dt * 4);
            px += (pointerX - px) * k;
            py += (pointerY - py) * k;
        }

        camera.position.set(camPos.x + px * 0.7, camPos.y - py * 0.45, camPos.z);
        camera.lookAt(lookPos);

        const idx = Math.max(0, Math.min(stationCount - 1, Math.round(fe)));
        if (idx !== activeIdx) {
            activeIdx = idx;
            if (onActiveStationChange) {
                onActiveStationChange(idx);
            }
            if (!reduceMotion && objs[idx]) {
                objs[idx].boost = 5;
            }
        }

        const intro = reduceMotion ? 1 : easeOutBack(clamp01((t - 0.15) / 1.7));
        const kt = 1 - Math.exp(-dt * 5);

        for (let i = 0; i < stationCount; i++) {
            const o = objs[i];
            const d = Math.abs(fe - i);
            const vis = d < 2.4;
            o.holder.visible = vis;
            if (!vis) continue;

            const w = clamp01(1 - d);
            let grow = clamp01((2.4 - d) / 0.8);
            grow = grow * grow * (3 - 2 * grow);
            o.holder.scale.setScalar(objScale * grow * (i === 0 ? intro : 1));

            o.boost *= Math.exp(-dt * 2.5);
            o.spin += ((reduceMotion ? 0 : 0.12) + o.boost) * dt;
            o.tx += (py * 0.3 * w - o.tx) * kt;
            o.ty += (px * 0.6 * w - o.ty) * kt;
            o.holder.rotation.set(o.tx, o.spin + o.ty, 0);

            if (!reduceMotion && o.group.userData.update) {
                o.group.userData.update(t, dt);
            }
        }

        if (!reduceMotion && shards) {
            shards.update(t);
        }

        renderer.render(scene, camera);
    }

    requestAnimationFrame(frame);

    return {
        syncThemeMaterials,
        layout
    };
}
