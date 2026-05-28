"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function OrbitRing() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);
  const particles = useRef<THREE.Points>(null!);

  const particlePositions = new Float32Array(200 * 3);
  for (let i = 0; i < 200; i++) {
    const angle = (i / 200) * Math.PI * 2;
    const r = 3.2 + (Math.random() - 0.5) * 0.4;
    particlePositions[i * 3] = Math.cos(angle) * r;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
    particlePositions[i * 3 + 2] = Math.sin(angle) * r;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.z = t * 0.3; ring1.current.rotation.x = Math.sin(t * 0.1) * 0.2; }
    if (ring2.current) { ring2.current.rotation.z = -t * 0.2; ring2.current.rotation.y = t * 0.1; }
    if (ring3.current) { ring3.current.rotation.x = t * 0.15; ring3.current.rotation.y = Math.cos(t * 0.15) * 0.3; }
    if (particles.current) { particles.current.rotation.y = t * 0.05; }
  });

  return (
    <group>
      {/* Ring 1 - blue */}
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.012, 8, 128]} />
        <meshBasicMaterial color="#4f6ef7" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 2 - purple, tilted */}
      <mesh ref={ring2} rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[3.4, 0.008, 8, 128]} />
        <meshBasicMaterial color="#7c5cfc" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 3 - teal, different tilt */}
      <mesh ref={ring3} rotation={[Math.PI / 6, 1.0, 0]}>
        <torusGeometry args={[4.0, 0.005, 8, 128]} />
        <meshBasicMaterial color="#00e5c3" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring particles */}
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} color="#4f6ef7" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}
