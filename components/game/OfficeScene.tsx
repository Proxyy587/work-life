"use client";

import { DummyFigure } from "./DummyFigure";

export function OfficeScene() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshToonMaterial color="#44403c" />
      </mesh>

      <mesh castShadow position={[-4, 1.6, -4]} receiveShadow>
        <boxGeometry args={[0.15, 3.2, 6]} />
        <meshToonMaterial color="#57534e" />
      </mesh>
      <mesh castShadow position={[4, 1.6, -4]} receiveShadow>
        <boxGeometry args={[0.15, 3.2, 6]} />
        <meshToonMaterial color="#57534e" />
      </mesh>

      <mesh castShadow position={[0, 0.4, 1.2]} receiveShadow>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshToonMaterial color="#57534e" />
      </mesh>
      <mesh castShadow position={[0, 0.95, 0.85]}>
        <boxGeometry args={[2.1, 0.06, 0.7]} />
        <meshToonMaterial color="#292524" />
      </mesh>
      <mesh castShadow position={[0, 1.32, 0.88]}>
        <boxGeometry args={[1.4, 0.55, 0.05]} />
        <meshToonMaterial color="#0ea5e9" emissive="#0284c7" emissiveIntensity={0.25} />
      </mesh>

      <DummyFigure
        position={[0, 0, 2.2]}
        color="#6366f1"
        accent="#fde68a"
        name="You"
        subtitle="Vercel — Day 1"
        scale={0.9}
      />

      <mesh castShadow position={[3, 0.25, -1]}>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshToonMaterial color="#166534" />
      </mesh>
      <mesh castShadow position={[3, 0.65, -1]}>
        <sphereGeometry args={[0.55, 10, 10]} />
        <meshToonMaterial color="#22c55e" />
      </mesh>
    </group>
  );
}
