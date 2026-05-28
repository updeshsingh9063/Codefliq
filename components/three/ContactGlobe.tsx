"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeWireframe() {
  const globeRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2, 24, 24]} />
        <meshBasicMaterial
          color="#4f6ef7"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#4f6ef7"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude lines */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => {
        const radius = Math.sqrt(4 - y * y);
        return (
          <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
            <meshBasicMaterial
              color="#4f6ef7"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function GlobeDots({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.02;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00e5c3"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionArcs() {
  const groupRef = useRef<THREE.Group>(null!);

  const arcs = useMemo(() => {
    const arcData: { points: THREE.Vector3[] }[] = [];
    const connections = [
      { from: [1.2, 1, 1], to: [-1, 0.5, 1.5] },
      { from: [-1.5, 0.8, 0.8], to: [0.5, -1.2, 1.2] },
      { from: [0.8, -0.5, 1.6], to: [-0.8, 1.2, 1.2] },
      { from: [1.5, 0.2, 1], to: [0, -1.5, 1.2] },
    ];

    connections.forEach(({ from, to }) => {
      const start = new THREE.Vector3(...from);
      const end = new THREE.Vector3(...to);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.multiplyScalar(1.4); // Push outward for arc

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const pts = curve.getPoints(30);
      arcData.push({ points: pts });
    });

    return arcData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {arcs.map((arc, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(arc.points);
        return (
          // @ts-expect-error - SVG line vs R3F line conflict
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color="#00e5c3"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}
    </group>
  );
}

function AmbientParticles({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#4f6ef7"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ContactGlobe() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#4f6ef7" />
      <pointLight position={[-3, -3, 3]} intensity={0.3} color="#7c5cfc" />

      <GlobeWireframe />
      <GlobeDots />
      <ConnectionArcs />
      <AmbientParticles />
    </>
  );
}
