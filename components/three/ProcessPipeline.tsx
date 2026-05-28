"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PipelineTube() {
  const tubeRef = useRef<THREE.Mesh>(null!);

  const { tubeMesh, curve } = useMemo(() => {
    const points = [
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-2.5, 1, 0),
      new THREE.Vector3(0, -0.5, 0),
      new THREE.Vector3(2.5, 0.8, 0),
      new THREE.Vector3(5, 0, 0),
    ];

    const c = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(c, 64, 0.05, 8, false);

    return { tubeMesh: tubeGeo, curve: c };
  }, []);

  return (
    <mesh ref={tubeRef} geometry={tubeMesh}>
      <meshBasicMaterial
        color="#4f6ef7"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function EnergyOrb({ curveRef }: { curveRef: THREE.CatmullRomCurve3 }) {
  const orbRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (!orbRef.current) return;
    const t = (state.clock.getElapsedTime() * 0.08) % 1;
    const point = curveRef.getPointAt(t);
    orbRef.current.position.copy(point);
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial
        color="#00e5c3"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function StepNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodePositions: [number, number, number][] = [
    [-5, 0, 0],
    [-2.5, 1, 0],
    [0, -0.5, 0],
    [2.5, 0.8, 0],
    [5, 0, 0],
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const scale = 1 + Math.sin(t * 1.5 + i * 0.8) * 0.2;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#4f6ef7" : "#7c5cfc"}
            transparent
            opacity={0.7}
            emissive={i % 2 === 0 ? "#4f6ef7" : "#7c5cfc"}
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function AmbientParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
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
        color="#7c5cfc"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ProcessPipeline() {
  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(-2.5, 1, 0),
      new THREE.Vector3(0, -0.5, 0),
      new THREE.Vector3(2.5, 0.8, 0),
      new THREE.Vector3(5, 0, 0),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 3]} intensity={0.5} color="#4f6ef7" />
      <PipelineTube />
      <EnergyOrb curveRef={curve} />
      <StepNodes />
      <AmbientParticles />
    </>
  );
}
