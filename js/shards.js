/**
 * Floating Ambient Shards
 * An InstancedMesh of 240 glowing octahedra placed between station nodes
 * to provide cinematic spatial depth and atmospheric motion.
 */

import { PALETTE } from './objects.js';

export function createShards(THREE, scene, stationCount, stationPositions, shardTotal = 240) {
    const shardMesh = new THREE.InstancedMesh(
        new THREE.OctahedronGeometry(1, 0),
        new THREE.MeshStandardMaterial({
            roughness: 0.35,
            metalness: 0.25,
            flatShading: true
        }),
        shardTotal
    );

    const shardBase = [];
    const shardPhase = [];
    const shardSpeed = [];
    const shardScale = [];

    const paletteColors = [
        PALETTE.cyan,
        PALETTE.azure,
        PALETTE.emerald,
        PALETTE.amber,
        PALETTE.purple,
        PALETTE.coral
    ].map((c) => new THREE.Color(c));

    function lerp(a, b, f) {
        return a + (b - a) * f;
    }

    for (let s = 0; s < shardTotal; s++) {
        let p;
        let tries = 0;
        let ok = false;
        do {
            const kk = Math.random() * (stationCount - 1);
            const a = Math.floor(kk);
            const b = Math.min(a + 1, stationCount - 1);
            const ff = kk - a;
            p = new THREE.Vector3(
                lerp(stationPositions[a][0], stationPositions[b][0], ff) + (Math.random() - 0.5) * 26,
                lerp(stationPositions[a][1], stationPositions[b][1], ff) + (Math.random() - 0.5) * 14,
                lerp(stationPositions[a][2], stationPositions[b][2], ff) + (Math.random() - 0.5) * 18
            );
            ok = true;
            for (let q = 0; q < stationCount; q++) {
                if (p.distanceTo(new THREE.Vector3(...stationPositions[q])) < 4.5) {
                    ok = false;
                    break;
                }
            }
            tries++;
        } while (!ok && tries < 12);

        shardBase.push(p);
        shardPhase.push(Math.random() * 6.28);
        shardSpeed.push(0.2 + Math.random() * 0.5);
        shardScale.push(0.05 + Math.random() * 0.17);
        shardMesh.setColorAt(s, paletteColors[s % paletteColors.length]);
    }

    scene.add(shardMesh);

    const dummy = new THREE.Object3D();

    function update(t) {
        for (let i = 0; i < shardTotal; i++) {
            dummy.position.copy(shardBase[i]);
            dummy.position.y += Math.sin(t * shardSpeed[i] + shardPhase[i]) * 0.35;
            dummy.rotation.set(t * shardSpeed[i], t * shardSpeed[i] * 0.7 + shardPhase[i], 0);
            dummy.scale.setScalar(shardScale[i]);
            dummy.updateMatrix();
            shardMesh.setMatrixAt(i, dummy.matrix);
        }
        shardMesh.instanceMatrix.needsUpdate = true;
    }

    update(0);

    return {
        mesh: shardMesh,
        update
    };
}
