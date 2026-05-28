"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingGrid() {
  const gridRef = useRef<THREE.Group>(null!);

  const gridLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; axis: "x" | "z" }[] = [];
    const size = 30;
    const divisions = 30;
    const step = size / divisions;

    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      // X-axis lines
      lines.push({
        start: new THREE.Vector3(i * step, 0, -size / 2),
        end: new THREE.Vector3(i * step, 0, size / 2),
        axis: "z",
      });
      // Z-axis lines
      lines.push({
        start: new THREE.Vector3(-size / 2, 0, i * step),
        end: new THREE.Vector3(size / 2, 0, i * step),
        axis: "x",
      });
    }
    return lines;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI * 0.4;
      gridRef.current.position.y = -2 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={gridRef}>
      {gridLines.map((line, i) => {
        const points = [line.start, line.end];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          // @ts-expect-error - SVG line vs R3F line conflict
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color="#4f6ef7"
              transparent
              opacity={0.08 + Math.abs(Math.sin(i * 0.1)) * 0.05}
            />
          </line>
        );
      })}
      {/* Central glow */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial
          color="#4f6ef7"
          transparent
          opacity={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
