"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Enhanced HeroScene with TorusKnot + ParticleVortex ───────────────────── */

function ParticleField({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const blue = new THREE.Color("#4f6ef7");
    const purple = new THREE.Color("#7c5cfc");
    const teal = new THREE.Color("#00e5c3");
    const palette = [blue, purple, teal];

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const spiralAngle = t * Math.PI * 16;
      const radius = t * 10 + Math.random() * 0.8;
      pos[i * 3] = Math.cos(spiralAngle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = Math.sin(spiralAngle) * radius - 2;
      const c = palette[Math.floor(t * 3)].clone();
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.07 + state.pointer.x * 0.05;
    mesh.current.rotation.x = Math.sin(t * 0.05) * 0.08 + state.pointer.y * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.65} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function TorusKnotHero() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1.8, 0.55, 200, 32, 2, 3), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.color.setHSL(0.63 + Math.sin(t * 0.25) * 0.06, 0.8, 0.5);
      mat.emissive.setHSL(0.63 + Math.sin(t * 0.25) * 0.06, 0.6, 0.12);
    }
    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group>
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial color="#4f6ef7" transparent opacity={0.18} roughness={0.08} metalness={0.95} clearcoat={1} clearcoatRoughness={0.05} emissive="#4f6ef7" emissiveIntensity={0.15} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={wireRef} geometry={geometry}>
          <meshBasicMaterial color="#7c5cfc" wireframe transparent opacity={0.12} />
        </mesh>
        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#4f6ef7" transparent opacity={0.02} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </Float>
  );
}

function LightBeams() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, -3]} rotation={[0, 0, angle]}>
            <planeGeometry args={[0.04, 14]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#4f6ef7" : "#7c5cfc"} transparent opacity={0.035} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 8, 22]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4f6ef7" />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#7c5cfc" />
      <pointLight position={[0, 0, -5]} intensity={0.3} color="#00e5c3" />
      <TorusKnotHero />
      <ParticleField count={2000} />
      <LightBeams />
    </>
  );
}
