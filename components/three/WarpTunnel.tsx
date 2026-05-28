"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WarpTunnel() {
  const groupRef = useRef<THREE.Group>(null!);
  const tubeRef = useRef<THREE.Mesh>(null!);

  const { curve, streaks } = useMemo(() => {
    // Tunnel curve going into the screen
    const pts = [
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(0.5, 0.2, 6),
      new THREE.Vector3(-0.3, -0.1, 2),
      new THREE.Vector3(0, 0, -5),
      new THREE.Vector3(0, 0, -20),
    ];
    const c = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(c, 100, 1.5, 12, false);

    // Speed streaks
    const streakData: Float32Array[] = [];
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 2;
      const r = 0.8 + Math.random() * 0.6;
      const len = 1 + Math.random() * 3;
      const z = -10 + Math.random() * 20;
      const pts2 = new Float32Array([
        Math.cos(angle) * r, Math.sin(angle) * r, z,
        Math.cos(angle) * r, Math.sin(angle) * r, z - len,
      ]);
      streakData.push(pts2);
    }

    return { curve: c, streaks: streakData };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.3;
    }
    if (tubeRef.current) {
      const mat = tubeRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(t * 2) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tunnel cylinder */}
      <mesh ref={tubeRef} geometry={new THREE.TubeGeometry(curve, 100, 1.5, 12, false)}>
        <meshBasicMaterial color="#4f6ef7" transparent opacity={0.04} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Speed streaks */}
      {streaks.map((pts, i) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
        return (
          // @ts-expect-error R3F line
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color={i % 3 === 0 ? "#4f6ef7" : i % 3 === 1 ? "#7c5cfc" : "#00e5c3"}
              transparent
              opacity={0.3 + Math.random() * 0.3}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}

      {/* Central glow */}
      <mesh position={[0, 0, -3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#00e5c3" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
