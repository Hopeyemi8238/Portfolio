/**
 * 3D Procedural Tech Objects
 * Highly detailed tech-native models representing:
 * 0. Quantum Processor Core (Foundational Engineering)
 * 1. Modular Server Architecture (Full-Stack Backend & APIs)
 * 2. Real-Time Mobile Quiz Terminal (React Native & 8s Engine)
 * 3. Encrypted Geodesic Network (Clean Architecture & Member Vault)
 * 4. Global Broadcast Satellite & Digital Earth (Media & News Platform)
 * 5. Interactive Quantum Nexus (Developer Connectivity & Hyperdrive)
 */

export const PALETTE = {
    azure: 0x3b82f6,    // Friendly Electric Azure / Silicon Valley Blue
    cobalt: 0x3b82f6,   // Compatibility alias
    cyan: 0x38bdf8,     // Luminous Sky Cyan / Frost Glass
    purple: 0x8b5cf6,   // Velvet Iris / Modern Tech Violet
    emerald: 0x10b981,  // Friendly Mint / Healthy Bio-Emerald
    amber: 0xf59e0b,    // Warm Solar Gold / Circuit Amber
    coral: 0xf43f5e,    // Friendly Rose Coral Accent
    slate: 0x1e293b,    // Obsidian Titanium / Hardware Graphite
    silver: 0xf1f5f9    // Anodized Platinum / Clean Aluminum
};

export const STATION_POSITIONS = [
    [0, 0, 0],       // 0: Intro (Quantum Microprocessor)
    [7, -1.5, -15],  // 1: About (Modular Server Blades)
    [-6, 1.5, -30],  // 2: ThinkRich (Mobile Quiz Terminal)
    [7, -1, -45],    // 3: Chowse (Smart Nutrition & Meal Matrix)
    [-6, 1.2, -60],  // 4: GAT24 (Global Satellite & Earth)
    [7, -1.2, -75],  // 5: Kingkam (Real Estate Blueprint & Beacon)
    [-6, 1.5, -90],  // 6: New Grace (Digital Academic Portal Prism)
    [1, 0, -105]     // 7: Contact (Interactive Tech Nexus)
];

export const STATION_SWAYS = [0, 3.2, -3.2, 3.2, -3.2, 3.2, -3.2, 0];

export function createStationMakers(THREE, { mat, inkWire, inkLine, getPointer }) {

    /**
     * Helper: Hardware metallic material with premium satin specular sheen
     */
    function techMat(color, roughness = 0.28, metalness = 0.32) {
        return new THREE.MeshStandardMaterial({
            color,
            roughness,
            metalness,
            flatShading: true
        });
    }

    /**
     * Station 0: Quantum Microprocessor Core
     * Holographic chip substrate, floating glowing CPU core, orbital tracking gimbal rings,
     * and orbiting data packets.
     */
    function makeHero() {
        const g = new THREE.Group();

        // 1. Motherboard CPU Substrate Socket (Dark silicon chip base)
        const socket = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.2, 3.2), techMat(PALETTE.slate, 0.5, 0.7));
        socket.position.y = -1.4;
        g.add(socket);

        // Chip Heat-Spreader Cap
        const heatSpreader = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 2.4), techMat(PALETTE.silver, 0.2, 0.8));
        heatSpreader.position.y = -1.2;
        g.add(heatSpreader);

        // Circuit Pin array (Gold contact pins around chip perimeter)
        for (let i = -1.3; i <= 1.3; i += 0.52) {
            [-1.65, 1.65].forEach((posZ) => {
                const pin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.3), techMat(PALETTE.amber, 0.2, 0.9));
                pin.position.set(i, -1.4, posZ);
                g.add(pin);
            });
            [-1.65, 1.65].forEach((posX) => {
                const pin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.12), techMat(PALETTE.amber, 0.2, 0.9));
                pin.position.set(posX, -1.4, i);
                g.add(pin);
            });
        }

        // 2. Floating Quantum Processing Core (Crystal Octahedron + inner core)
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), techMat(PALETTE.cyan, 0.1, 0.2));
        const coreWire = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), inkWire(0.6));
        const innerCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 0), techMat(PALETTE.purple, 0.3, 0.1));
        core.add(coreWire, innerCore);
        g.add(core);

        // 3. Concentric Gimbal Gyroscope Rings (HUD tech rings)
        const gyro1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.05, 16, 100), techMat(PALETTE.cobalt, 0.3, 0.6));
        const gyro2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.04, 16, 100), techMat(PALETTE.amber, 0.3, 0.6));
        gyro1.rotation.x = Math.PI / 3;
        gyro2.rotation.set(Math.PI / 4, 0.5, 0);
        g.add(gyro1, gyro2);

        // 4. Orbiting Data Packets
        const dataPackets = [];
        for (let i = 0; i < 6; i++) {
            const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), techMat(i % 2 === 0 ? PALETTE.cyan : PALETTE.emerald, 0.2, 0.5));
            g.add(p);
            dataPackets.push(p);
        }

        // 5. Vertical Laser Scan Plane
        const scannerRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.03, 8, 80), techMat(PALETTE.emerald, 0.2, 0.1));
        g.add(scannerRing);

        g.userData.update = function (t) {
            core.rotation.y = t * 0.5;
            core.rotation.x = Math.sin(t * 0.4) * 0.2;
            innerCore.rotation.set(-t * 0.8, t * 0.6, 0);

            gyro1.rotation.z = t * 0.3;
            gyro2.rotation.x = Math.PI / 4 + t * 0.25;

            // Scanner oscillating up and down
            scannerRing.position.y = Math.sin(t * 1.5) * 1.3;
            scannerRing.scale.setScalar(1 + Math.sin(t * 3) * 0.08);

            // Orbiting data packets
            dataPackets.forEach((p, i) => {
                const angle = t * 0.8 + (i * Math.PI * 2) / 6;
                const r = 2.4 + Math.sin(t * 1.2 + i) * 0.3;
                p.position.set(Math.cos(angle) * r, Math.sin(angle * 2) * 0.7, Math.sin(angle) * r);
                p.rotation.set(angle, angle * 1.5, 0);
            });
        };

        return g;
    }

    /**
     * Station 1: Modular Server Architecture (Full-Stack Cloud Blades)
     * 5 high-tech server blade rack tiers with LED arrays, heat sinks, and glowing data bus conduits.
     */
    function makeStack() {
        const g = new THREE.Group();
        const blades = [];
        const leds = [];
        const bladeColors = [PALETTE.cobalt, PALETTE.cyan, PALETTE.purple, PALETTE.emerald, PALETTE.amber];

        // 5 Server Rack Blades
        for (let i = 0; i < 5; i++) {
            const bladeGroup = new THREE.Group();

            // Main server blade chassis
            const chassis = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.36, 2.2), techMat(PALETTE.slate, 0.4, 0.7));
            bladeGroup.add(chassis);

            // Front faceplate / status bezel
            const faceplate = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.38, 0.08), techMat(bladeColors[i % 5], 0.3, 0.5));
            faceplate.position.z = 1.12;
            bladeGroup.add(faceplate);

            // Rack Ear Mounts
            [-1.56, 1.56].forEach((x) => {
                const ear = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.12), techMat(PALETTE.silver, 0.2, 0.9));
                ear.position.set(x, 0, 1.12);
                bladeGroup.add(ear);
            });

            // Activity LED Array on faceplate
            for (let j = -1.0; j <= 1.0; j += 0.5) {
                const led = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), techMat(j > 0 ? PALETTE.emerald : PALETTE.cyan, 0.1, 0.1));
                led.position.set(j, 0, 1.18);
                bladeGroup.add(led);
                leds.push({ mesh: led, phase: Math.random() * 6.28, speed: 2 + Math.random() * 4 });
            }

            bladeGroup.position.y = (i - 2) * 0.72;
            g.add(bladeGroup);
            blades.push(bladeGroup);
        }

        // 4 Vertical Fiber-Optic Data Conduits (Corner Pillars)
        [[-1.4, -1.0], [1.4, -1.0], [-1.4, 1.0], [1.4, 1.0]].forEach(([cx, cz]) => {
            const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.8, 16), techMat(PALETTE.cyan, 0.2, 0.2));
            conduit.position.set(cx, 0, cz);
            g.add(conduit);
        });

        g.rotation.x = 0.25;

        g.userData.update = function (t) {
            blades.forEach((b, i) => {
                // Harmonic architectural expansion & horizontal yaw pulse
                b.rotation.y = Math.sin(t * 0.7 + i * 0.5) * 0.22;
                b.position.y = (i - 2) * 0.72 + Math.sin(t * 1.1 + i * 0.8) * 0.08;
            });

            // Status LEDs pulsing / blinking
            leds.forEach((l) => {
                const s = 0.7 + Math.sin(t * l.speed + l.phase) * 0.5;
                l.mesh.scale.setScalar(Math.max(0.3, s));
            });
        };

        return g;
    }

    /**
     * Station 2: ThinkRich Mobile Quiz Terminal & 8s Engine
     * Sleek 3D smartphone chassis with floating holographic 8-second countdown timer ring
     * and orbiting dynamic quiz option nodes (A, B, C, D).
     */
    function makeKnot() {
        const g = new THREE.Group();

        // 1. Modern Smartphone Chassis
        const phone = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 4.0, 0.16), techMat(PALETTE.slate, 0.3, 0.8));
        const screen = new THREE.Mesh(new THREE.BoxGeometry(1.9, 3.8, 0.04), techMat(PALETTE.cobalt, 0.2, 0.4));
        screen.position.z = 0.07;
        const cameraIsland = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.06), techMat(PALETTE.slate, 0.2, 0.9));
        cameraIsland.position.set(0, 1.76, 0.1);

        phone.add(body, screen, cameraIsland);
        g.add(phone);

        // 2. Projected 8-Second Countdown Speedometer Gauge Ring (ThinkRich mechanic)
        const gaugeGroup = new THREE.Group();
        gaugeGroup.position.set(0, 0.2, 0.8);

        // Circular timer gauge ring
        const timerRing = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.06, 16, 80), techMat(PALETTE.amber, 0.2, 0.3));
        const timerHalo = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.02, 12, 80), inkWire(0.5));

        // Radial timer needle / countdown hand
        const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), techMat(PALETTE.cyan, 0.1, 0.5));
        needle.position.y = 0.55;
        const needlePivot = new THREE.Group();
        needlePivot.add(needle);

        // Center hub of the countdown timer
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24), techMat(PALETTE.amber, 0.2, 0.8));
        hub.rotation.x = Math.PI / 2;

        gaugeGroup.add(timerRing, timerHalo, needlePivot, hub);
        g.add(gaugeGroup);

        // 3. Floating 3D Quiz Options (A, B, C, D Crystals)
        const optionNodes = [];
        const optionOffsets = [
            [-1.9, 1.2, 0.4],
            [1.9, 1.2, 0.4],
            [-1.9, -1.2, 0.4],
            [1.9, -1.2, 0.4]
        ];

        const optionColors = [PALETTE.emerald, PALETTE.cyan, PALETTE.purple, PALETTE.amber];
        optionOffsets.forEach(([ox, oy, oz], idx) => {
            const opt = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.28, 0),
                techMat(optionColors[idx % optionColors.length], 0.2, 0.4)
            );
            opt.position.set(ox, oy, oz);
            g.add(opt);
            optionNodes.push(opt);
        });

        g.userData.update = function (t) {
            // Smooth phone hover tilt
            phone.rotation.y = Math.sin(t * 0.8) * 0.28;
            phone.rotation.x = Math.cos(t * 0.6) * 0.14;

            // Gauge rotates with countdown ticking rotation (simulating 8-second timer cycle)
            needlePivot.rotation.z = -((t * 2) % (Math.PI * 2));
            gaugeGroup.rotation.y = phone.rotation.y * 0.7;

            // Quiz option nodes pulsating & floating
            optionNodes.forEach((node, i) => {
                node.rotation.set(t * (1 + i * 0.2), t * 0.8, 0);
                node.position.y = optionOffsets[i][1] + Math.sin(t * 2 + i * 1.5) * 0.15;
            });
        };

        return g;
    }

    /**
     * Station 3: Chowse Smart Meal & Nutrition Matrix
     * Hexagonal nutrient lattice, rotating dietary macro calibration dial rings,
     * central calorie / energy core, and orbiting grocery aisle data pods.
     */
    function makeChowse() {
        const g = new THREE.Group();

        // 1. Central Calorie & Nutrition Optimization Core (Faceted Icosahedron)
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 0), techMat(PALETTE.emerald, 0.2, 0.4));
        const coreHalo = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 0), inkWire(0.5));
        core.add(coreHalo);
        g.add(core);

        // 2. Dual Concentric Macro Calibration Dial Rings (Dietary Toggles & Budget Tracker)
        const dialRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.06, 16, 90), techMat(PALETTE.cyan, 0.2, 0.6));
        const dialRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.04, 16, 90), techMat(PALETTE.amber, 0.2, 0.7));
        dialRing1.rotation.x = Math.PI / 2.5;
        dialRing2.rotation.set(Math.PI / 3, 0.4, 0);
        g.add(dialRing1, dialRing2);

        // 3. Macro Nutrient Nodes (Carbs, Protein, Fats - 3 Hexagonal Crystals)
        const nutrientNodes = [];
        const nodeColors = [PALETTE.emerald, PALETTE.cyan, PALETTE.amber];
        for (let i = 0; i < 3; i++) {
            const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), techMat(nodeColors[i], 0.2, 0.5));
            g.add(node);
            nutrientNodes.push(node);
        }

        // 4. Orbiting Grocery Aisle Data Pods (Aisle Checklist tokens)
        const aislePods = [];
        const podTrack = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 12, 100), inkWire(0.35));
        podTrack.rotation.x = Math.PI / 4;
        g.add(podTrack);

        for (let p = 0; p < 4; p++) {
            const pod = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 0.22, 0.15),
                techMat(p % 2 === 0 ? PALETTE.emerald : PALETTE.cyan, 0.2, 0.8)
            );
            podTrack.add(pod);
            aislePods.push(pod);
        }

        g.userData.update = function (t) {
            core.rotation.set(t * 0.3, t * 0.4, 0);
            dialRing1.rotation.z = t * 0.4;
            dialRing2.rotation.z = -t * 0.3;

            // Nutrient nodes rotating in triangular formation
            nutrientNodes.forEach((node, i) => {
                const angle = (i * Math.PI * 2) / 3 + t * 0.6;
                const r = 1.9 + Math.sin(t * 1.5 + i) * 0.15;
                node.position.set(Math.cos(angle) * r, Math.sin(angle * 1.8) * 0.6, Math.sin(angle) * r);
                node.rotation.set(angle, angle * 1.2, 0);
            });

            // Aisle pods orbiting along track
            aislePods.forEach((pod, idx) => {
                const angle = (idx * Math.PI * 2) / 4 + t * 0.5;
                pod.position.set(Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, 0);
                pod.rotation.set(angle, angle * 1.5, 0);
            });
        };

        return g;
    }

    /**
     * Station 4: Green Africa Time (GAT24) Global Broadcast Satellite & Digital Earth
     * Telemetry wireframe globe with continental hotspots and orbiting communication satellite.
     */
    function makeLattice() {
        const g = new THREE.Group();

        // 1. Digital Wireframe Earth Globe
        const globeGroup = new THREE.Group();
        const earthWire = new THREE.Mesh(
            new THREE.SphereGeometry(1.7, 24, 16),
            new THREE.MeshBasicMaterial({ color: PALETTE.cobalt, wireframe: true, transparent: true, opacity: 0.35 })
        );
        globeGroup.add(earthWire);

        // Core glow sphere
        const innerGlobe = new THREE.Mesh(
            new THREE.SphereGeometry(1.5, 32, 24),
            techMat(PALETTE.slate, 0.6, 0.4)
        );
        globeGroup.add(innerGlobe);

        // Continental Data Beacons (Hotspots)
        const hotspotPositions = [
            [0.8, 0.4, 1.4],
            [-0.3, 0.2, 1.6],
            [0.2, -0.6, 1.5],
            [-1.1, 0.8, 1.0],
            [1.2, -0.4, 0.9]
        ];
        const hotspots = [];
        hotspotPositions.forEach(([hx, hy, hz]) => {
            const h = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12),
                techMat(PALETTE.emerald, 0.2, 0.2)
            );
            h.position.set(hx, hy, hz);
            h.lookAt(0, 0, 0);
            globeGroup.add(h);
            hotspots.push(h);
        });

        g.add(globeGroup);

        // 2. Broadcast Satellite Model
        const satelliteGroup = new THREE.Group();

        // Satellite Main Bus / Chassis
        const satBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), techMat(PALETTE.amber, 0.2, 0.8));
        // Solar Panel Wings
        const solarLeft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.28, 0.04), techMat(PALETTE.cyan, 0.2, 0.3));
        solarLeft.position.x = -0.6;
        const solarRight = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.28, 0.04), techMat(PALETTE.cyan, 0.2, 0.3));
        solarRight.position.x = 0.6;
        // Parabolic Dish Antenna
        const dish = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.18, 16, 1, true), techMat(PALETTE.silver, 0.2, 0.8));
        dish.position.z = 0.24;
        dish.rotation.x = Math.PI / 2;

        satelliteGroup.add(satBody, solarLeft, solarRight, dish);

        // Orbital Flight Path Ring
        const orbitTrack = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 12, 100), inkWire(0.4));
        orbitTrack.rotation.x = Math.PI / 3;
        orbitTrack.add(satelliteGroup);
        g.add(orbitTrack);

        // 3. Expanding Radio Broadcast Waves (Concentric pulses)
        const waveRings = [];
        for (let w = 0; w < 3; w++) {
            const ring = new THREE.Mesh(new THREE.RingGeometry(1.75, 1.82, 32), techMat(PALETTE.cyan, 0.2, 0.1));
            ring.position.set(0.2, 0.3, 1.6);
            ring.lookAt(0.2 * 2, 0.3 * 2, 1.6 * 2);
            g.add(ring);
            waveRings.push(ring);
        }

        g.userData.update = function (t) {
            // Earth continuous diurnal rotation
            globeGroup.rotation.y = t * 0.2;

            // Satellite tracking orbit
            satelliteGroup.position.set(Math.cos(t * 0.7) * 2.7, Math.sin(t * 0.7) * 2.7, 0);
            satelliteGroup.rotation.z = t * 0.7 + Math.PI / 2;

            // Expanding broadcast telemetry rings
            waveRings.forEach((ring, idx) => {
                const progress = ((t * 0.8 + idx * 0.33) % 1);
                ring.scale.setScalar(1 + progress * 0.9);
                if (ring.material) {
                    ring.material.opacity = 1 - progress;
                    ring.material.transparent = true;
                }
            });
        };

        return g;
    }

    /**
     * Station 5: Kingkam Ventures Real Estate Blueprint & Smart Architecture
     * Holographic tiered residential tower, cadastral blueprint site grid,
     * floating GPS location beacon, and orbiting LiDAR survey drone.
     */
    function makeRealEstate() {
        const g = new THREE.Group();

        // 1. Site Cadastral Blueprint Base Grid
        const siteGrid = new THREE.Mesh(
            new THREE.BoxGeometry(3.6, 0.1, 3.6),
            techMat(PALETTE.slate, 0.5, 0.7)
        );
        siteGrid.position.y = -1.6;
        const gridWire = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(3.6, 0.1, 3.6)),
            techMat(PALETTE.cyan, 0.2, 0.5)
        );
        siteGrid.add(gridWire);
        g.add(siteGrid);

        // 2. Modern Tiered Architectural Complex
        const towerGroup = new THREE.Group();
        const baseBlock = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 2.0), techMat(PALETTE.silver, 0.3, 0.8));
        baseBlock.position.y = -0.85;

        // Middle Tower Glass Volume
        const midBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), techMat(PALETTE.cobalt, 0.2, 0.4));
        midBlock.position.y = 0.45;

        // Penthouse / Upper Terrace
        const topBlock = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 1.1), techMat(PALETTE.emerald, 0.2, 0.5));
        topBlock.position.y = 1.45;

        // Rooftop Solar / Skylight Canopy
        const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 1.3), techMat(PALETTE.cyan, 0.2, 0.8));
        canopy.position.y = 1.88;

        towerGroup.add(baseBlock, midBlock, topBlock, canopy);
        g.add(towerGroup);

        // 3. Floating GPS Location Beacon (Inverted Pin)
        const beaconGroup = new THREE.Group();
        const pinCone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 16), techMat(PALETTE.amber, 0.2, 0.8));
        pinCone.rotation.x = Math.PI;
        const pinOrb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), techMat(PALETTE.amber, 0.1, 0.5));
        pinOrb.position.y = 0.35;
        beaconGroup.add(pinCone, pinOrb);
        beaconGroup.position.set(0, 2.7, 0);
        g.add(beaconGroup);

        // 4. Orbiting LiDAR Survey Drone
        const droneGroup = new THREE.Group();
        const droneBody = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.3), techMat(PALETTE.cyan, 0.2, 0.8));
        const droneHalo = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.02, 8, 24), techMat(PALETTE.emerald, 0.1, 0.2));
        droneGroup.add(droneBody, droneHalo);

        const surveyTrack = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.02, 12, 100), inkWire(0.35));
        surveyTrack.rotation.x = Math.PI / 2.6;
        surveyTrack.add(droneGroup);
        g.add(surveyTrack);

        g.userData.update = function (t) {
            towerGroup.rotation.y = t * 0.2;
            beaconGroup.position.y = 2.7 + Math.sin(t * 2) * 0.18;
            beaconGroup.rotation.y = t * 0.8;

            // Drone orbiting property
            droneGroup.position.set(Math.cos(t * 0.9) * 2.8, Math.sin(t * 0.9) * 2.8, 0);
            droneGroup.rotation.z = t * 0.9 + Math.PI / 2;
        };

        return g;
    }

    /**
     * Station 6: New Grace Academy Digital Academic Portal & Knowledge Prism
     * Open interactive portal tablet slate, multi-tier knowledge prism,
     * and orbiting student/staff credential cards.
     */
    function makeAcademy() {
        const g = new THREE.Group();

        // 1. Digital Portal Tablet Slate Base
        const tablet = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.14, 2.2), techMat(PALETTE.slate, 0.4, 0.7));
        tablet.position.y = -1.5;
        const screen = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.04, 1.9), techMat(PALETTE.cyan, 0.2, 0.3));
        screen.position.set(0, -1.42, 0);
        g.add(tablet, screen);

        // 2. Multi-tier Knowledge Prism (3 Ascending Stepped Octagonal Tiers)
        const prismGroup = new THREE.Group();
        const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 0.5, 8), techMat(PALETTE.cobalt, 0.3, 0.5));
        tier1.position.y = -0.8;
        const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.5, 0.5, 8), techMat(PALETTE.purple, 0.3, 0.5));
        tier2.position.y = -0.2;
        const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 0.5, 8), techMat(PALETTE.emerald, 0.3, 0.5));
        tier3.position.y = 0.4;

        // Apex Knowledge Gem / Graduation Shield
        const apexGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), techMat(PALETTE.amber, 0.15, 0.7));
        apexGem.position.y = 1.25;

        prismGroup.add(tier1, tier2, tier3, apexGem);
        g.add(prismGroup);

        // 3. Orbiting Student & Staff Credential Access Tokens
        const credentials = [];
        const credTrack = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.02, 12, 100), inkWire(0.4));
        credTrack.rotation.x = Math.PI / 3;
        g.add(credTrack);

        for (let i = 0; i < 4; i++) {
            const card = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.3, 0.05), techMat(i % 2 === 0 ? PALETTE.cyan : PALETTE.amber, 0.2, 0.8));
            credTrack.add(card);
            credentials.push(card);
        }

        g.userData.update = function (t) {
            tier1.rotation.y = t * 0.25;
            tier2.rotation.y = -t * 0.35;
            tier3.rotation.y = t * 0.45;
            apexGem.rotation.set(t * 0.5, t * 0.6, 0);
            apexGem.position.y = 1.25 + Math.sin(t * 1.8) * 0.12;

            // Credential cards in orbit
            credentials.forEach((card, idx) => {
                const angle = (idx * Math.PI * 2) / 4 + t * 0.6;
                card.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 2.6, 0);
                card.rotation.set(angle, angle * 1.2, 0);
            });
        };

        return g;
    }

    /**
     * Station 7: Interactive Quantum Nexus Gateway
     * High-energy particle accelerator rings with magnetic cursor tracking core
     * and vortex of interactive communication data packets.
     */
    function makePortal() {
        const g = new THREE.Group();

        // 1. Dual Concentric Warp Rings with Gear Notches
        const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.22, 24, 90), techMat(PALETTE.cobalt, 0.3, 0.6));
        const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.14, 20, 80), techMat(PALETTE.cyan, 0.2, 0.8));
        g.add(outerRing, innerRing);

        // 2. Cursor-Reactive Quantum Orb (Magnetic flux sphere)
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.85, 40, 30), techMat(PALETTE.purple, 0.1, 0.3));
        const orbWire = new THREE.Mesh(new THREE.SphereGeometry(1.05, 16, 12), inkWire(0.5));
        orb.add(orbWire);
        g.add(orb);

        // 3. Vortex of Cylindrical Data Bit Cubes
        const cubes = [];
        const cubeCount = 10;
        const cubeColors = [PALETTE.emerald, PALETTE.cyan, PALETTE.amber, PALETTE.purple, PALETTE.coral];
        for (let i = 0; i < cubeCount; i++) {
            const c = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 0.25, 0.25),
                techMat(cubeColors[i % cubeColors.length], 0.2, 0.4)
            );
            g.add(c);
            cubes.push(c);
        }

        g.userData.update = function (t) {
            const { x: px, y: py } = getPointer();

            // Opposing differential ring rotations
            outerRing.rotation.set(t * 0.25, t * 0.15, 0);
            innerRing.rotation.set(-t * 0.35, -t * 0.2, t * 0.1);

            // Magnetic cursor tracking: orb smoothly pulls toward mouse pointer
            orb.position.x += (px * 0.7 - orb.position.x) * 0.08;
            orb.position.y += (-py * 0.7 - orb.position.y) * 0.08;
            orb.rotation.y = t * 0.4;

            // Spiral cylindrical data vortex
            cubes.forEach((c, i) => {
                const angle = t * 0.6 + (i / cubeCount) * Math.PI * 2;
                const r = 3.1 + Math.sin(t * 1.2 + i) * 0.25;
                c.position.set(
                    Math.cos(angle) * r,
                    Math.sin(angle * 1.5) * 1.2,
                    Math.sin(angle) * r * 0.5
                );
                c.rotation.set(angle * 2, angle, 0);
            });
        };

        return g;
    }

    return [makeHero, makeStack, makeKnot, makeChowse, makeLattice, makeRealEstate, makeAcademy, makePortal];
}
