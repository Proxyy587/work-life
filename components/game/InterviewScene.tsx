"use client";

import { DummyFigure } from "./DummyFigure";

export function InterviewScene() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshToonMaterial color="#374151" />
      </mesh>

      <mesh castShadow position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.15, 1.6]} />
        <meshToonMaterial color="#292524" />
      </mesh>

      <DummyFigure
        position={[-0.85, 0, -0.35]}
        color="#171717"
        accent="#fca5a5"
        name="Guillermo Rauch"
        subtitle="CEO"
      />
      <DummyFigure
        position={[0.85, 0, -0.35]}
        color="#1d4ed8"
        accent="#bfdbfe"
        name="Theo"
        subtitle="Engineering"
      />

      <mesh position={[0, 2.8, -2.4]}>
        <planeGeometry args={[5, 2.8]} />
        <meshToonMaterial color="#0f172a" />
      </mesh>
      <mesh position={[0, 2.8, -2.35]}>
        <planeGeometry args={[4.6, 2.4]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
    </group>
  );
}
