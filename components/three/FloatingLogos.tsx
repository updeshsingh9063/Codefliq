"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const TECH_LABELS = [
  { name: "Next.js", color: "#ffffff" },
  { name: "React", color: "#61dafb" },
  { name: "TypeScript", color: "#4f6ef7" },
  { name: "Tailwind", color: "#00e5c3" },
  { name: "Node.js", color: "#68a063" },
  { name: "PostgreSQL", color: "#7c5cfc" },
  { name: "Prisma", color: "#4f6ef7" },
  { name: "Figma", color: "#ff7262" },
];

function TechSphere({
  position,
  color,
  size = 0.15,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  delay?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() + delay;
      ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.2;
      ref.current.position.x = position[0] + Math.cos(t * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const lineData: THREE.Vector3[][] = [];
    // Connect adjacent spheres
    for (let i = 0; i < TECH_LABELS.length; i++) {
      const next = (i + 1) % TECH_LABELS.length;
      const angle1 = (i / TECH_LABELS.length) * Math.PI * 2;
      const angle2 = (next / TECH_LABELS.length) * Math.PI * 2;
      const r = 2.5;

      const start = new THREE.Vector3(
        Math.cos(angle1) * r,
        Math.sin(angle1 * 2) * 0.5,
        Math.sin(angle1) * r
      );
      const end = new THREE.Vector3(
        Math.cos(angle2) * r,
        Math.sin(angle2 * 2) * 0.5,
        Math.sin(angle2) * r
      );

      lineData.push([start, end]);
    }
    return lineData;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {lines.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          // @ts-expect-error - SVG line vs R3F line conflict
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color="#4f6ef7"
              transparent
              opacity={0.1}
            />
          </line>
        );
      })}
    </group>
  );
}

export default function FloatingLogos() {
  const groupRef = useRef<THREE.Group>(null!);

  const positions = useMemo(() => {
    return TECH_LABELS.map((_, i) => {
      const angle = (i / TECH_LABELS.length) * Math.PI * 2;
      const r = 2.5;
      return [
        Math.cos(angle) * r,
        Math.sin(angle * 2) * 0.5,
        Math.sin(angle) * r,
      ] as [number, number, number];
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#4f6ef7" />
      <pointLight position={[-3, -3, 2]} intensity={0.4} color="#7c5cfc" />

      <group ref={groupRef}>
        {TECH_LABELS.map((tech, i) => (
          <TechSphere
            key={tech.name}
            position={positions[i]}
            color={tech.color}
            size={0.12 + Math.random() * 0.08}
            delay={i * 0.5}
          />
        ))}
        <ConnectionLines />
      </group>
    </>
  );
}
