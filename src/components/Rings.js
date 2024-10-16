import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color } from "three";

import React from 'react';

function Rings() {
  const itemsRef = useRef([]);
  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      let mesh = itemsRef.current[i];
      let z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      let dist = Math.abs(z);
      mesh.position.set(0, 0, -z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      // Update to Yellow and White colors
      if (i % 2 == 1) {
        // Yellow for odd rings
        mesh.material.emissive = new Color(1, 1, 0).multiplyScalar(colorScale); // Yellow
      } else {
        // White for even rings
        mesh.material.emissive = new Color(1, 1, 1).multiplyScalar(colorScale); // White
      }
    }
  });

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[1, 1, 1]} color={[0, 0, 0]} /> {/* White default */}
        </mesh>
      ))}
    </>
  );
}

export default Rings;
