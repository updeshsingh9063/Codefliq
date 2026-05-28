"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NodeData {
  position: [number, number, number];
  connections: number[];
  color: string;
}

function generateNetwork(nodeCount = 40): NodeData[] {
  const nodes: NodeData[] = [];
  const colors = ["#4f6ef7", "#7c5cfc", "#00e5c3", "#4f6ef7", "#7c5cfc"];

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2 + Math.random() * 3;
    nodes.push({
      position: [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.6,
        r * Math.cos(phi),
      ],
      connections: [],
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  // Connect nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodes[i].position[0] - nodes[j].position[0];
      const dy = nodes[i].position[1] - nodes[j].position[1];
      const dz = nodes[i].position[2] - nodes[j].position[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 2.5 && nodes[i].connections.length < 4) {
        nodes[i].connections.push(j);
      }
    }
  }
  return nodes;
}

function NetworkNodes({ nodes }: { nodes: NodeData[] }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const scale = 1 + Math.sin(t * 1.2 + i * 0.5) * 0.25;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function NetworkEdges({ nodes }: { nodes: NodeData[] }) {
  const groupRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const result: { points: THREE.Vector3[]; key: string }[] = [];
    nodes.forEach((node, i) => {
      node.connections.forEach((j) => {
        result.push({
          points: [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...nodes[j].position),
          ],
          key: `${i}-${j}`,
        });
      });
    });
    return result;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map(({ points, key }) => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          // @ts-expect-error R3F line
          <line key={key} geometry={geo}>
            <lineBasicMaterial color="#4f6ef7" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
          </line>
        );
      })}
    </group>
  );
}

function DataPackets({ nodes }: { nodes: NodeData[] }) {
  const refs = useRef<THREE.Mesh[]>([]);

  const packets = useMemo(() => {
    return nodes.flatMap((node, i) =>
      node.connections.slice(0, 2).map((j, k) => ({
        from: new THREE.Vector3(...node.position),
        to: new THREE.Vector3(...nodes[j].position),
        key: `${i}-${j}-${k}`,
        speed: 0.3 + Math.random() * 0.3,
        offset: Math.random(),
      }))
    ).slice(0, 20);
  }, [nodes]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    refs.current.forEach((mesh, i) => {
      if (!mesh || !packets[i]) return;
      const { from, to, speed, offset } = packets[i];
      const progress = ((t * speed + offset) % 1);
      mesh.position.lerpVectors(from, to, progress);
    });
  });

  return (
    <>
      {packets.map((packet, i) => (
        <mesh key={packet.key} ref={(el) => { if (el) refs.current[i] = el; }}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00e5c3" transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </>
  );
}

export default function NeuralNetwork3D() {
  const nodes = useMemo(() => generateNetwork(40), []);
  const outerGroupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#4f6ef7" />
      <pointLight position={[-5, -5, 3]} intensity={0.3} color="#7c5cfc" />
      <group ref={outerGroupRef}>
        <NetworkEdges nodes={nodes} />
        <NetworkNodes nodes={nodes} />
        <DataPackets nodes={nodes} />
      </group>
    </>
  );
}
