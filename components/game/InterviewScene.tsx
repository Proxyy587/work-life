"use client";

import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { DummyFigure } from "./DummyFigure";

const W = 5.5;
const H = 3;
const T = 0.12;

export function InterviewScene() {
  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W * 2, W * 2]} />
          <meshStandardMaterial color="#3f3f46" roughness={0.88} />
        </mesh>
        <CuboidCollider position={[0, -0.06, 0]} args={[W, 0.06, W]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <mesh receiveShadow position={[0, H + 0.06, 0]}>
          <boxGeometry args={[W * 2, 0.12, W * 2]} />
          <meshStandardMaterial color="#27272a" roughness={0.9} />
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
            <boxGeometry
              args={i < 2 ? [W * 2, H, T] : [T, H, W * 2]}
            />
            <meshStandardMaterial color="#3f3f46" roughness={0.78} />
          </mesh>
          <CuboidCollider
            position={pos as [number, number, number]}
            args={i < 2 ? [W, H / 2, T] : [T, H / 2, W]}
          />
        </RigidBody>
      ))}

      <RigidBody type="fixed" colliders={false}>
        <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
          <boxGeometry args={[3.4, 0.14, 1.7]} />
          <meshStandardMaterial color="#292524" roughness={0.55} />
        </mesh>
        <CuboidCollider position={[0, 0.35, 0]} args={[1.7, 0.07, 0.85]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false} position={[-0.85, 0, -0.35]}>
        <DummyFigure
          position={[0, 0, 0]}
          color="#171717"
          accent="#fca5a5"
          name="Guillermo Rauch"
          subtitle="CEO"
        />
        <CuboidCollider position={[0, 0.85, 0]} args={[0.35, 0.85, 0.35]} />
      </RigidBody>

      <RigidBody type="fixed" colliders={false} position={[0.85, 0, -0.35]}>
        <DummyFigure
          position={[0, 0, 0]}
          color="#1d4ed8"
          accent="#bfdbfe"
          name="Theo"
          subtitle="Engineering"
        />
        <CuboidCollider position={[0, 0.85, 0]} args={[0.35, 0.85, 0.35]} />
      </RigidBody>

      <mesh position={[0, 2.65, -W + 0.08]}>
        <planeGeometry args={[4.5, 2.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.65, -W + 0.09]}>
        <planeGeometry args={[4.2, 2.1]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
    </group>
  );
}
