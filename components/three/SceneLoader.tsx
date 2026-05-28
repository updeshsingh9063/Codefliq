"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, ReactNode } from "react";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface SceneLoaderProps {
  children: ReactNode;
  className?: string;
  camera?: { position?: [number, number, number]; fov?: number };
  interactive?: boolean;
  postProcessing?: boolean;
  bloomIntensity?: number;
}

function FallbackGlow() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-accent-blue/10 blur-3xl animate-pulse" />
      <div className="w-48 h-48 rounded-full bg-accent-purple/10 blur-3xl animate-pulse absolute" style={{ animationDelay: "0.5s" }} />
    </div>
  );
}

function PostProcessingEffects({ bloomIntensity = 0.5 }: { bloomIntensity?: number }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0005, 0.0005)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

export default function SceneLoader({
  children,
  className = "",
  camera = { position: [0, 0, 5], fov: 75 },
  interactive = false,
  postProcessing = false,
  bloomIntensity = 0.5,
}: SceneLoaderProps) {
  return (
    <div className={`three-canvas-container ${!interactive ? "no-interaction" : ""} ${className}`}>
      <Suspense fallback={<FallbackGlow />}>
        <Canvas
          camera={camera}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          {children}
          {postProcessing && <PostProcessingEffects bloomIntensity={bloomIntensity} />}
        </Canvas>
      </Suspense>
    </div>
  );
}
