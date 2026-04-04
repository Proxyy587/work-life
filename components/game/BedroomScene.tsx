"use client";

import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { DaySkyBackdrop } from "./DaySkyBackdrop";

const W = 5;
const H = 3.2;
const T = 0.12;

export function BedroomScene() {
  return (
    <group>
      <DaySkyBackdrop />

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W * 2, W * 2]} />
          <meshStandardMaterial color="#334155" roughness={0.85} />
        </mesh>
        <CuboidCollider position={[0, -0.06, 0]} args={[W, 0.06, W]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, H + 0.06, 0]}>
          <boxGeometry args={[W * 2, 0.12, W * 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        <CuboidCollider position={[0, H + 0.06, 0]} args={[W, 0.06, W]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, H / 2, -W]}>
          <boxGeometry args={[W * 2, H, T]} />
          <meshStandardMaterial color="#1e293b" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[0, H / 2, -W]} args={[W, H / 2, T]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[-2.925, H / 2, W]}>
          <boxGeometry args={[2.05, H, T]} />
          <meshStandardMaterial color="#293548" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[-2.925, H / 2, W]} args={[2.05, H / 2, T]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[2.925, H / 2, W]}>
          <boxGeometry args={[2.05, H, T]} />
          <meshStandardMaterial color="#293548" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[2.925, H / 2, W]} args={[2.05, H / 2, T]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, 2.71, W]}>
          <boxGeometry args={[0.82, 0.52, T]} />
          <meshStandardMaterial color="#293548" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[0, 2.71, W]} args={[0.82, 0.52, T]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh position={[0, 1.05, W - 0.02]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.78, 2.05, 0.08]} />
          <meshStandardMaterial color="#78350f" roughness={0.65} />
        </mesh>
        <CuboidCollider position={[0, 1.05, W - 0.02]} args={[0.39, 1.025, 0.04]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[W, H / 2, 0]}>
          <boxGeometry args={[T, H, W * 2]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[W, H / 2, 0]} args={[T, H / 2, W]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[-W, 0.38, 0]}>
          <boxGeometry args={[T, 0.76, W * 2]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[-W, 0.38, 0]} args={[T, 0.38, W]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[-W, 2.65, 0]}>
          <boxGeometry args={[T, 1.1, W * 2]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[-W, 2.65, 0]} args={[T, 0.55, W]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[-W, 1.48, -3.15]}>
          <boxGeometry args={[T, 1.44, 1.7]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[-W, 1.48, -3.15]} args={[T, 0.72, 1.7 / 2]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[-W, 1.48, 3.15]}>
          <boxGeometry args={[T, 1.44, 1.7]} />
          <meshStandardMaterial color="#334155" roughness={0.75} />
        </mesh>
        <CuboidCollider position={[-W, 1.48, 3.15]} args={[T, 0.72, 1.7 / 2]} />
      </RigidBody>

      <mesh position={[-W + 0.06, 1.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.5, 1.35]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#38bdf8"
          emissiveIntensity={0.15}
          metalness={0.2}
          roughness={0.15}
          transparent
          opacity={0.45}
        />
      </mesh>

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[-3.15, 0.35, -2.45]}>
          <boxGeometry args={[1.75, 0.7, 2.35]} />
          <meshStandardMaterial color="#4c1d95" roughness={0.6} />
        </mesh>
        <CuboidCollider position={[-3.15, 0.35, -2.45]} args={[0.875, 0.35, 1.175]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[-3.15, 0.88, -2.45]}>
          <boxGeometry args={[1.85, 0.48, 2.45]} />
          <meshStandardMaterial color="#5b21b6" roughness={0.55} />
        </mesh>
        <CuboidCollider position={[-3.15, 0.88, -2.45]} args={[0.925, 0.24, 1.225]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.4, 0.4, -2.05]}>
          <boxGeometry args={[1.35, 0.8, 0.65]} />
          <meshStandardMaterial color="#78350f" roughness={0.55} />
        </mesh>
        <CuboidCollider position={[3.4, 0.4, -2.05]} args={[0.675, 0.4, 0.325]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.4, 0.95, -2.2]}>
          <boxGeometry args={[1.45, 0.08, 0.48]} />
          <meshStandardMaterial color="#451a03" roughness={0.5} />
        </mesh>
        <CuboidCollider position={[3.4, 0.95, -2.2]} args={[0.725, 0.04, 0.24]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.4, 1.35, -2.12]}>
          <boxGeometry args={[1.05, 0.62, 0.06]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.4}
            roughness={0.35}
          />
        </mesh>
        <CuboidCollider position={[3.4, 1.35, -2.12]} args={[0.525, 0.31, 0.03]} />
      </RigidBody>
      <mesh position={[3.4, 1.35, -2.04]}>
        <boxGeometry args={[1, 0.58, 0.02]} />
        <meshBasicMaterial color="#020617" />
      </mesh>

      <mesh position={[0.52, 1.02, W - 0.11]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}
