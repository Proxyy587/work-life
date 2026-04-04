"use client";

import { Html } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

type Props = {
  position?: [number, number, number];
  color: string;
  accent?: string;
  name: string;
  subtitle?: string;
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  scale?: number;
};

export function DummyFigure({
  position = [0, 0, 0],
  color,
  accent = "#ffffff",
  name,
  subtitle,
  onClick,
  scale = 1,
}: Props) {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <capsuleGeometry args={[0.32, 0.75, 6, 12]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh castShadow position={[0, 1.12, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={accent} roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[0.12, 1.14, 0.22]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.35, 0.22, 0.08]} />
        <meshStandardMaterial color="#111827" roughness={0.3} />
      </mesh>
      <Html position={[0, 1.55, 0]} center distanceFactor={8}>
        <div className="pointer-events-none whitespace-nowrap rounded-md bg-black/80 px-2 py-0.5 text-center text-[10px] font-semibold text-white shadow-lg">
          {name}
          {subtitle ? (
            <div className="text-[9px] font-normal text-zinc-300">{subtitle}</div>
          ) : null}
        </div>
      </Html>
    </group>
  );
}
