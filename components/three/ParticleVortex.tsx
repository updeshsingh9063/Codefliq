"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleVortex({ count = 3000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, colors, sizes, angles] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ang = new Float32Array(count);

    const blue = new THREE.Color("#4f6ef7");
    const purple = new THREE.Color("#7c5cfc");
    const teal = new THREE.Color("#00e5c3");

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const spiralAngle = t * Math.PI * 12;
      const radius = t * 8 + Math.random() * 0.5;
      const y = (t - 0.5) * 10 + (Math.random() - 0.5) * 2;

      pos[i * 3] = Math.cos(spiralAngle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(spiralAngle) * radius;

      const mixColor = t < 0.33 ? blue.clone().lerp(purple, t * 3) :
                       t < 0.66 ? purple.clone().lerp(teal, (t - 0.33) * 3) :
                       teal.clone().lerp(blue, (t - 0.66) * 3);

      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;

      sz[i] = Math.random() * 3 + 0.5;
      ang[i] = spiralAngle;
    }
    return [pos, col, sz, ang];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      (state.pointer.x * viewport.width) / 2,
      0.03
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      (state.pointer.y * viewport.height) / 2,
      0.03
    );

    pointsRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + mouse.current.y * 0.01;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const frac = i / count;
      const baseAngle = angles[i];
      const radius = frac * 8 + Math.sin(t * 0.5 + frac * 10) * 0.3;

      posArray[idx] = Math.cos(baseAngle + t * 0.15) * radius;
      posArray[idx + 1] += Math.sin(t * 0.3 + i * 0.01) * 0.002;
      posArray[idx + 2] = Math.sin(baseAngle + t * 0.15) * radius;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
