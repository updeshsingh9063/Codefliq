"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

function RobotModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const leftArmRef = useRef<THREE.Mesh>(null!);
  const rightArmRef = useRef<THREE.Mesh>(null!);
  const leftLegRef = useRef<THREE.Mesh>(null!);
  const rightLegRef = useRef<THREE.Mesh>(null!);
  const headRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Walking animation cycle
    const walkSpeed = 3;
    const walkAmount = 0.5; // Angle of swing
    
    if (leftArmRef.current && rightArmRef.current && leftLegRef.current && rightLegRef.current) {
      leftArmRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmount;
      rightArmRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * walkAmount;
      
      leftLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * walkAmount;
      rightLegRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmount;
    }

    // Gentle head bobbing
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.5) * 0.2;
      headRef.current.rotation.z = Math.cos(t * 2) * 0.05;
    }

    // Subtle group bounce (simulate steps)
    if (groupRef.current) {
      groupRef.current.position.y = Math.abs(Math.sin(t * walkSpeed * 2)) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 2.2, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
        {/* Visor / Eye */}
        <mesh position={[0, 0.1, 0.41]}>
          <boxGeometry args={[0.6, 0.2, 0.05]} />
          <meshStandardMaterial color="#00e5c3" emissive="#00e5c3" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3]} />
        <meshStandardMaterial color="#4a4a6a" metalness={0.5} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.7]} />
        <meshPhysicalMaterial color="#4f6ef7" metalness={0.6} roughness={0.3} />
        {/* Core glow */}
        <mesh position={[0, 0, 0.36]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#7c5cfc" emissive="#7c5cfc" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      </mesh>

      {/* Left Arm (hinged at shoulder) */}
      <group position={[-0.8, 1.4, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.6, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm (hinged at shoulder) */}
      <group position={[0.8, 1.4, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.6, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Left Leg (hinged at hip) */}
      <group position={[-0.3, 0, 0]}>
        <mesh ref={leftLegRef} position={[0, -0.6, 0]}>
          <boxGeometry args={[0.35, 1.2, 0.35]} />
          <meshStandardMaterial color="#1a1a32" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Leg (hinged at hip) */}
      <group position={[0.3, 0, 0]}>
        <mesh ref={rightLegRef} position={[0, -0.6, 0]}>
          <boxGeometry args={[0.35, 1.2, 0.35]} />
          <meshStandardMaterial color="#1a1a32" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function WalkingRobot3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [3, 2, 6], fov: 45 }}>

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#4f6ef7" />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#7c5cfc" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Rotate slightly towards the form */}
          <group rotation={[0, Math.PI / 4, 0]}>
            <RobotModel />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
