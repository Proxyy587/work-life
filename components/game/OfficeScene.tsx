"use client";

import { RigidBody, CuboidCollider } from "@react-three/rapier";

const W = 7;
const H = 3.2;
const T = 0.12;

export function OfficeScene() {
  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W * 2, W * 2]} />
          <meshStandardMaterial color="#44403c" roughness={0.88} />
        </mesh>
        <CuboidCollider position={[0, -0.06, 0]} args={[W, 0.06, W]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, H + 0.06, 0]}>
          <boxGeometry args={[W * 2, 0.12, W * 2]} />
          <meshStandardMaterial color="#292524" roughness={0.9} />
        </mesh>
        <CuboidCollider position={[0, H + 0.06, 0]} args={[W, 0.06, W]} />
      </RigidBody>

      {[
        [0, H / 2, -W],
        [0, H / 2, W],
        [W, H / 2, 0],
        [-W, H / 2, 0],
      ].map((pos, i) => (
        <RigidBody key={i} type="fixed" colliders={false}>
          <mesh receiveShadow position={pos as [number, number, number]}>
            <boxGeometry args={i < 2 ? [W * 2, H, T] : [T, H, W * 2]} />
            <meshStandardMaterial color="#57534e" roughness={0.78} />
          </mesh>
          <CuboidCollider
            position={pos as [number, number, number]}
            args={i < 2 ? [W, H / 2, T] : [T, H / 2, W]}
          />
        </RigidBody>
      ))}

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[-3.8, 1.55, -2]}>
          <boxGeometry args={[0.12, 3, 5.5]} />
          <meshStandardMaterial color="#57534e" roughness={0.7} />
        </mesh>
        <CuboidCollider position={[-3.8, 1.55, -2]} args={[0.06, 1.5, 2.75]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.8, 1.55, -2]}>
          <boxGeometry args={[0.12, 3, 5.5]} />
          <meshStandardMaterial color="#57534e" roughness={0.7} />
        </mesh>
        <CuboidCollider position={[3.8, 1.55, -2]} args={[0.06, 1.5, 2.75]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[0, 0.4, 1.15]} receiveShadow>
          <boxGeometry args={[2, 0.8, 1]} />
          <meshStandardMaterial color="#57534e" roughness={0.65} />
        </mesh>
        <CuboidCollider position={[0, 0.4, 1.15]} args={[1, 0.4, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[0, 0.95, 0.82]}>
          <boxGeometry args={[2.1, 0.06, 0.7]} />
          <meshStandardMaterial color="#292524" roughness={0.55} />
        </mesh>
        <CuboidCollider position={[0, 0.95, 0.82]} args={[1.05, 0.03, 0.35]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[0, 1.32, 0.86]}>
          <boxGeometry args={[1.4, 0.55, 0.05]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.25}
            roughness={0.35}
          />
        </mesh>
        <CuboidCollider position={[0, 1.32, 0.86]} args={[0.7, 0.275, 0.025]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.2, 0.25, -1.2]}>
          <boxGeometry args={[1.1, 0.5, 1.1]} />
          <meshStandardMaterial color="#166534" roughness={0.6} />
        </mesh>
        <CuboidCollider position={[3.2, 0.25, -1.2]} args={[0.55, 0.25, 0.55]} />
      </RigidBody>
      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow position={[3.2, 0.65, -1.2]}>
          <sphereGeometry args={[0.5, 10, 10]} />
          <meshStandardMaterial color="#22c55e" roughness={0.45} />
        </mesh>
        <CuboidCollider position={[3.2, 0.65, -1.2]} args={[0.35, 0.5, 0.35]} />
      </RigidBody>
    </group>
  );
}
