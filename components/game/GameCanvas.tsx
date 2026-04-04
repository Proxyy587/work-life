"use client";

import { OrbitControls, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGame } from "@/lib/game/GameProvider";
import { BedroomScene } from "./BedroomScene";
import { InterviewScene } from "./InterviewScene";
import { OfficeScene } from "./OfficeScene";

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
  const { state } = useGame();
  const cam =
    state.phase === "bedroom"
      ? { position: [5.5, 3.8, 6.2] as [number, number, number], target: [0, 0.5, 0] as [number, number, number] }
      : state.phase === "interview"
        ? { position: [0, 2.2, 4.5] as [number, number, number], target: [0, 1, 0] as [number, number, number] }
        : { position: [4.5, 3.2, 5.5] as [number, number, number], target: [0, 0.8, 1] as [number, number, number] };

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        camera={{ fov: 42, near: 0.1, far: 80, position: cam.position }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#0f172a"]} />
        <fog attach="fog" args={["#0f172a", 12, 38]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow
          position={[6, 12, 8]}
          intensity={1.15}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={40}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <SoftShadows size={10} samples={12} focus={0.5} />
        <Suspense fallback={null}>
          <SceneSwitch />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={state.phase === "interview" ? 3.5 : 4}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2 - 0.08}
          target={cam.target}
        />
      </Canvas>
    </div>
  );
}
