"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function IridescentTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32, 2, 3), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.12;
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.z = t * 0.05;

      // Iridescent hue shift
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      const hue = (Math.sin(t * 0.3) * 0.05) + 0.63;
      material.color.setHSL(hue, 0.8, 0.5);
      material.emissive.setHSL(hue, 0.6, 0.15);
    }
    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Main mesh */}
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial
            color="#4f6ef7"
            transparent
            opacity={0.2}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
            side={THREE.DoubleSide}
            emissive="#4f6ef7"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Wireframe overlay */}
        <lineSegments ref={wireRef}>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial color="#7c5cfc" transparent opacity={0.15} />
        </lineSegments>

        {/* Inner glow */}
        <mesh>
          <torusKnotGeometry args={[1.5, 0.52, 100, 16, 2, 3]} />
          <meshBasicMaterial
            color="#4f6ef7"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalParticles({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 20;
      const r = 2.5 + Math.sin(t * 10) * 0.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00e5c3"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function TorusKnot() {
  return (
    <>
      <IridescentTorusKnot />
      <OrbitalParticles />
    </>
  );
}
