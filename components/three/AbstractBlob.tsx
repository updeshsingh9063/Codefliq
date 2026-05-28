"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const originalPositions = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 5), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(meshRef.current.geometry.attributes.position.array);
    }

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const orig = originalPositions.current;

    for (let i = 0; i < positions.length; i += 3) {
      const x = orig[i], y = orig[i + 1], z = orig[i + 2];
      const noise =
        Math.sin(x * 2.5 + t * 0.6) * 0.18 +
        Math.sin(y * 3.5 + t * 0.8) * 0.12 +
        Math.cos(z * 3 + t * 0.7) * 0.15;
      const len = Math.sqrt(x * x + y * y + z * z);
      const scale = 1 + noise;
      positions[i] = (x / len) * 2 * scale;
      positions[i + 1] = (y / len) * 2 * scale;
      positions[i + 2] = (z / len) * 2 * scale;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = t * 0.06;

    // Hue shift
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    mat.color.setHSL(0.63 + Math.sin(t * 0.3) * 0.08, 0.8, 0.5);
    mat.emissive.setHSL(0.63 + Math.sin(t * 0.3) * 0.08, 0.6, 0.08);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
      <group>
        <mesh ref={meshRef} geometry={geometry}>
          <meshPhysicalMaterial color="#4f6ef7" transparent opacity={0.18} roughness={0.2} metalness={0.9} clearcoat={1} clearcoatRoughness={0.05} emissive="#4f6ef7" emissiveIntensity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={geometry}>
          <meshBasicMaterial color="#7c5cfc" wireframe transparent opacity={0.12} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (r1.current) { r1.current.rotation.z = t * 0.4; }
    if (r2.current) { r2.current.rotation.z = -t * 0.25; r2.current.rotation.y = t * 0.1; }
    if (r3.current) { r3.current.rotation.x = t * 0.2; r3.current.rotation.z = t * 0.08; }
  });

  return (
    <group>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.012, 8, 128]} />
        <meshBasicMaterial color="#4f6ef7" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[3.9, 0.008, 8, 128]} />
        <meshBasicMaterial color="#7c5cfc" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 6, 1.2, 0]}>
        <torusGeometry args={[4.6, 0.005, 8, 128]} />
        <meshBasicMaterial color="#00e5c3" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function OrbitParticles({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.8 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00e5c3" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

export default function AbstractBlob() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1} color="#4f6ef7" />
      <pointLight position={[-4, -4, 3]} intensity={0.6} color="#7c5cfc" />
      <pointLight position={[0, 4, -4]} intensity={0.4} color="#00e5c3" />
      <Blob />
      <OrbitRings />
      <OrbitParticles />
    </>
  );
}
