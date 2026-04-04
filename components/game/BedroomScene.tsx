"use client";

import { useGame } from "@/lib/game/GameProvider";
import { DummyFigure } from "./DummyFigure";

export function BedroomScene() {
  const { tryDoor, setPc } = useGame();

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshToonMaterial color="#2d3748" />
      </mesh>

      <mesh position={[0, 2.2, -5]} receiveShadow>
        <boxGeometry args={[14, 5, 0.2]} />
        <meshToonMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshToonMaterial color="#334155" />
      </mesh>
      <mesh position={[5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshToonMaterial color="#334155" />
      </mesh>

      <group
        position={[4.2, 0, -2.5]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          setPc(true);
        }}
      >
        <mesh castShadow position={[0, 0.4, 0]}>
          <boxGeometry args={[1.4, 0.8, 0.7]} />
          <meshToonMaterial color="#78350f" />
        </mesh>
        <mesh castShadow position={[0, 0.95, -0.15]}>
          <boxGeometry args={[1.5, 0.08, 0.5]} />
          <meshToonMaterial color="#451a03" />
        </mesh>
        <mesh castShadow position={[0, 1.35, -0.1]}>
          <boxGeometry args={[1.1, 0.65, 0.06]} />
          <meshToonMaterial color="#0ea5e9" emissive="#0369a1" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 1.35, 0.02]}>
          <boxGeometry args={[1.05, 0.6, 0.02]} />
          <meshBasicMaterial color="#020617" />
        </mesh>
      </group>

      <mesh castShadow position={[-3.2, 0.35, -3]}>
        <boxGeometry args={[1.8, 0.7, 2.4]} />
        <meshToonMaterial color="#4c1d95" />
      </mesh>
      <mesh castShadow position={[-3.2, 0.85, -3]}>
        <boxGeometry args={[1.9, 0.5, 2.5]} />
        <meshToonMaterial color="#5b21b6" />
      </mesh>

      <group
        position={[0, 0, 4.85]}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          tryDoor();
        }}
      >
        <mesh castShadow position={[0, 1.1, 0]}>
          <boxGeometry args={[1.8, 2.2, 0.2]} />
          <meshToonMaterial color="#92400e" />
        </mesh>
        <mesh position={[0.55, 1.05, 0.12]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshToonMaterial color="#fbbf24" />
        </mesh>
      </group>

      <DummyFigure
        position={[-1.2, 0, 0.5]}
        color="#6366f1"
        accent="#fde68a"
        name="You"
        subtitle="Player"
        scale={0.95}
      />
    </group>
  );
}
