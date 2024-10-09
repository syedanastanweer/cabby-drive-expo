import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

// Box component representing an individual box
function Box({ color }) {
  const box = useRef(); // Ref to access the mesh
  const time = useRef(0); // Ref to keep track of elapsed time
  const [position, setPosition] = useState(getInitialPosition()); // State to manage box position
  const [xRotSpeed] = useState(() => Math.random()); // Random x-axis rotation speed
  const [yRotSpeed] = useState(() => Math.random()); // Random y-axis rotation speed
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05); // Random scale for the box

  // Function to generate an initial random position for the box
  function getInitialPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
    if (v.x < 0) v.x -= 1.75; // Adjust x position if it's negative
    if (v.x > 0) v.x += 1.75; // Adjust x position if it's positive

    return v;
  }

  // Function to reset the box's position when it goes out of view
  function resetPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10);
    if (v.x < 0) v.x -= 1.75; // Adjust x position if it's negative
    if (v.x > 0) v.x += 1.75; // Adjust x position if it's positive

    setPosition(v); // Update the position state
  }

  // Frame update logic for animation
  useFrame((state, delta) => {
    time.current += delta * 1.2; // Update time
    let newZ = position.z - time.current; // Calculate new Z position

    // Reset position if the box goes out of bounds
    if (newZ < -10) {
      resetPosition();
      time.current = 0; // Reset time
    }

    // Set the box's position and rotation
    box.current.position.set(position.x, position.y, newZ);
    box.current.rotation.x += delta * xRotSpeed; // Rotate around x-axis
    box.current.rotation.y += delta * yRotSpeed; // Rotate around y-axis
  });

  return (
    <mesh
      ref={box}
      rotation-x={Math.PI * 0.5} // Set initial rotation around x-axis
      scale={scale} // Set scale of the box
      castShadow // Enable shadow casting
    >
      <boxGeometry args={[1, 1, 1]} /> // Geometry for the box
      <meshStandardMaterial color={color} envMapIntensity={0.15} /> {/* Material with color and environment map intensity */}
    </mesh>
  );
}

// Boxes component to create an array of Box components
function Boxes() {
  // State to manage an array of boxes
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) a.push(0); // Create an array of 100 items
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        // Create a Box for each item in the array, alternating colors
        <Box
          key={i}
          color={i % 2 === 0 ? [1, 1, 0] : [1, 1, 1]} // Yellow for even index, white for odd index
        />
      ))}
    </>
  );
}

export default Boxes;
