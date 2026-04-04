"use client";

import { useMemo } from "react";
import * as THREE from "three";

type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
};

export function DaySkyBackdrop({
  position = [-5.34, 1.45, 0],
  rotation = [0, Math.PI / 2, 0],
}: Props) {
  const mat = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      uniforms: {
        topC: { value: new THREE.Color("#6ec8ff") },
        botC: { value: new THREE.Color("#c8e8ff") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topC;
        uniform vec3 botC;
        varying vec2 vUv;
        void main() {
          vec3 col = mix(botC, topC, smoothstep(0.0, 1.0, vUv.y));
          float sun = smoothstep(0.04, 0.0, distance(vUv, vec2(0.72, 0.72)));
          col += vec3(1.0, 0.95, 0.75) * sun * 0.55;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
    return m;
  }, []);

  return (
    <mesh position={position} rotation={rotation} material={mat}>
      <planeGeometry args={[7, 3.6]} />
    </mesh>
  );
}
