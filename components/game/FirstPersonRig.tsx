"use client";

import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useGame } from "@/lib/game/GameProvider";
import { useGameViewSurface } from "./GameViewSurfaceContext";
import { useInteractionHint } from "./InteractionHintContext";

const MOVE_SPEED = 5.2;
const CAP_HALF_H = 0.48;
const CAP_R = 0.34;
const CAM_Y = 1.55;

const SPAWNS = {
  bedroom: { pos: [0, 0, 1.2] as [number, number, number], yaw: 0 },
  interview: { pos: [0, 0, 3.2] as [number, number, number], yaw: Math.PI },
  office: { pos: [0, 0, 2.4] as [number, number, number], yaw: 0 },
} as const;

const BEDROOM_DESK = new THREE.Vector3(3.4, 1, -2.05);
const BEDROOM_DOOR = new THREE.Vector3(0, 1, 4.35);

export function FirstPersonRig() {
  const body = useRef<RapierRigidBody>(null);
  const yawG = useRef<THREE.Group>(null);
  const pitchG = useRef<THREE.Group>(null);
  const yaw = useRef(0);
  const pitch = useRef(0);
  const { gl } = useThree();
  const { surfaceRef } = useGameViewSurface();
  const {
    state,
    questions,
    setPc,
    tryDoor,
    menuOpen,
    lookSensitivity,
  } = useGame();
  const { setHint } = useInteractionHint();
  const interactDown = useRef(false);
  const draggingLook = useRef(false);
  const captureId = useRef<number | null>(null);
  const blockRef = useRef(true);
  const sensRef = useRef(lookSensitivity);

  const forward = useKeyboardControls((s) => s.forward);
  const back = useKeyboardControls((s) => s.back);
  const left = useKeyboardControls((s) => s.left);
  const right = useKeyboardControls((s) => s.right);
  const interact = useKeyboardControls((s) => s.interact);

  const blockMovement =
    menuOpen ||
    state.showPc ||
    !!state.doorMessage ||
    (state.phase === "interview" &&
      !state.interviewResult &&
      state.interviewIndex < questions.length);

  blockRef.current = blockMovement;
  sensRef.current = lookSensitivity;

  const phaseKey = state.phase;

  const endLookDrag = useCallback(() => {
    const el = gl.domElement;
    if (captureId.current != null) {
      try {
        if (el.hasPointerCapture(captureId.current)) {
          el.releasePointerCapture(captureId.current);
        }
      } catch {
        /* ignore */
      }
      captureId.current = null;
    }
    draggingLook.current = false;
    const wrap = surfaceRef.current;
    if (wrap) {
      wrap.style.cursor = blockRef.current ? "default" : "grab";
    }
  }, [gl.domElement, surfaceRef]);

  const endLookDragRef = useRef(endLookDrag);
  endLookDragRef.current = endLookDrag;

  useEffect(() => {
    const s = SPAWNS[phaseKey];
    const rb = body.current;
    if (!rb) return;
    rb.setTranslation({ x: s.pos[0], y: s.pos[1], z: s.pos[2] }, true);
    rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
    yaw.current = s.yaw;
    pitch.current = 0;
    if (yawG.current) yawG.current.rotation.y = yaw.current;
    if (pitchG.current) pitchG.current.rotation.x = pitch.current;
    endLookDragRef.current();
  }, [phaseKey]);

  useEffect(() => {
    if (blockMovement) {
      endLookDrag();
    } else {
      const wrap = surfaceRef.current;
      if (wrap) wrap.style.cursor = "grab";
    }
  }, [blockMovement, endLookDrag, surfaceRef]);

  useEffect(() => {
    const el = gl.domElement;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || blockRef.current) return;
      e.preventDefault();
      draggingLook.current = true;
      captureId.current = e.pointerId;
      el.setPointerCapture(e.pointerId);
      const wrap = surfaceRef.current;
      if (wrap) wrap.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (!draggingLook.current || blockRef.current) return;
      const s = sensRef.current;
      yaw.current -= e.movementX * s;
      pitch.current -= e.movementY * s;
      pitch.current = Math.max(-1.28, Math.min(1.28, pitch.current));
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== captureId.current) return;
      endLookDrag();
    };

    const onLost = () => {
      endLookDrag();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", onLost);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("lostpointercapture", onLost);
      const wrap = surfaceRef.current;
      if (wrap) wrap.style.cursor = "auto";
    };
  }, [gl.domElement, endLookDrag, surfaceRef]);

  useFrame(() => {
    const rb = body.current;
    if (!rb) return;

    if (yawG.current) yawG.current.rotation.y = yaw.current;
    if (pitchG.current) pitchG.current.rotation.x = pitch.current;

    const t = rb.translation();
    const p = new THREE.Vector3(t.x, t.y, t.z);

    const sy = Math.sin(yaw.current);
    const cy = Math.cos(yaw.current);
    const fx = -sy;
    const fz = -cy;
    const rx = cy;
    const rz = -sy;

    if (!blockMovement) {
      let mx = 0;
      let mz = 0;
      if (forward) {
        mx += fx;
        mz += fz;
      }
      if (back) {
        mx -= fx;
        mz -= fz;
      }
      if (left) {
        mx -= rx;
        mz -= rz;
      }
      if (right) {
        mx += rx;
        mz += rz;
      }
      const len = Math.hypot(mx, mz);
      if (len > 1e-6) {
        mx = (mx / len) * MOVE_SPEED;
        mz = (mz / len) * MOVE_SPEED;
      }
      const lv = rb.linvel();
      rb.setLinvel({ x: mx, y: lv.y, z: mz }, true);
    } else {
      const lv = rb.linvel();
      rb.setLinvel({ x: 0, y: lv.y, z: 0 }, true);
    }

    if (state.phase === "bedroom" && !blockMovement) {
      const fd = new THREE.Vector3(fx, 0, fz).normalize();
      const toDesk = new THREE.Vector3(BEDROOM_DESK.x - p.x, 0, BEDROOM_DESK.z - p.z);
      const toDoor = new THREE.Vector3(BEDROOM_DOOR.x - p.x, 0, BEDROOM_DOOR.z - p.z);
      const dDesk = toDesk.length();
      const dDoor = toDoor.length();
      toDesk.normalize();
      toDoor.normalize();
      const dotDesk = fd.dot(toDesk);
      const dotDoor = fd.dot(toDoor);

      let hint: string | null = null;
      if (dDesk < 2.1 && dotDesk > 0.45) hint = "E · Open PC";
      else if (dDoor < 2.2 && dotDoor > 0.4) hint = "E · Try door";
      setHint(hint);

      if (interact && !interactDown.current) {
        if (dDesk < 2.1 && dotDesk > 0.45) setPc(true);
        else if (dDoor < 2.2 && dotDoor > 0.4) tryDoor();
      }
    } else {
      setHint(null);
    }

    interactDown.current = interact;
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      mass={1}
      type="dynamic"
      ccd
      enabledRotations={[false, false, false]}
      linearDamping={0.35}
      friction={0.9}
      position={SPAWNS.bedroom.pos}
    >
      <CapsuleCollider
        args={[CAP_HALF_H, CAP_R]}
        position={[0, CAP_HALF_H + CAP_R, 0]}
      />
      <group ref={yawG}>
        <group ref={pitchG}>
          <PerspectiveCamera
            makeDefault
            fov={72}
            near={0.12}
            far={120}
            position={[0, CAM_Y, 0]}
          />
        </group>
      </group>
    </RigidBody>
  );
}
