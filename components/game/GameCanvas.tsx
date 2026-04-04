"use client";

import { KeyboardControls, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { useGame } from "@/lib/game/GameProvider";
import { BedroomScene } from "./BedroomScene";
import { FPS_KEY_MAP } from "./controls";
import { FirstPersonRig } from "./FirstPersonRig";
import { InterviewScene } from "./InterviewScene";
import { OfficeScene } from "./OfficeScene";
import { GameViewSurfaceProvider } from "./GameViewSurfaceContext";

function SceneSwitch() {
  const { state } = useGame();
  switch (state.phase) {
    case "bedroom":
      return <BedroomScene />;
    case "interview":
      return <InterviewScene />;
    case "office":
      return <OfficeScene />;
    default:
      return <BedroomScene />;
  }
}

export function GameCanvas() {
  return (
    <GameViewSurfaceProvider>
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#1a2332"]} />
        <fog attach="fog" args={["#1a2332", 14, 48]} />
        <ambientLight intensity={0.38} />
        <directionalLight
          castShadow
          position={[-14, 18, 10]}
          intensity={1.05}
          color="#fff5e6"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
        />
        <directionalLight position={[6, 10, -4]} intensity={0.22} color="#93c5fd" />
        <SoftShadows size={12} samples={14} focus={0.45} />
        <KeyboardControls map={FPS_KEY_MAP}>
          <Suspense fallback={null}>
            <Physics gravity={[0, -18, 0]} interpolate={true}>
              <SceneSwitch />
              <FirstPersonRig />
            </Physics>
          </Suspense>
        </KeyboardControls>
      </Canvas>
    </GameViewSurfaceProvider>
  );
}
