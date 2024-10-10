import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import './App.css';
import Ground from './components/Ground';
import Car from './components/Car';
import Rings from './components/Rings';
import Boxes from './components/Boxes';
import FloatingGrid from './components/FloatingGrid';

function CarShow() {
  return (
    <>
      {/* OrbitControls to allow the user to interact with the scene (rotate, zoom) */}
      <OrbitControls
        target={[0, 0.35, 0]}  // Target point of rotation
        maxPolarAngle={1.45}    // Limit the vertical rotation
        minDistance={3}         // Minimum zoom distance
        maxDistance={10}        // Maximum zoom distance to prevent zooming out too far
      />

      {/* PerspectiveCamera with an FOV of 50 degrees */}
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Set background color to black */}
      <color args={[0, 0, 0]} attach="background" />

      {/* Two spotlights to illuminate the scene */}
      <spotLight
        color={[1, 1, 0]}  // Yellow color
        intensity={1.5}    // Intensity of the light
        angle={0.6}        // Spread angle of the spotlight
        penumbra={0.5}     // Soft edges of the spotlight
        position={[5, 5, 0]} // Position in the scene
        castShadow         // Enable casting shadows
        shadow-bias={-0.0001} // Bias to avoid shadow artifacts
      />
      <spotLight
        color={[1, 1, 1]}  // White color
        intensity={2}      // Intensity of the light
        angle={0.6}        // Spread angle of the spotlight
        penumbra={0.5}     // Soft edges of the spotlight
        position={[-5, 5, 0]} // Position in the scene
        castShadow         // Enable casting shadows
        shadow-bias={-0.0001} // Bias to avoid shadow artifacts
      />

      {/* Ground component (the floor of the scene) */}
      <Ground />

      {/* Reflective environment and car model */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      {/* Additional components for visual effects */}
      <Rings />
      <Boxes />
      <FloatingGrid />

      {/* Post-processing effects like Bloom and Chromatic Aberration */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.3}          // The bloom intensity
          width={300}              // Render width
          height={300}             // Render height
          kernelSize={5}           // Blur kernel size
          luminanceThreshold={0.15} // Mask out darker elements
          luminanceSmoothing={0.025} // Smoothness of luminance threshold
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}  // Blend mode
          offset={[0.0005, 0.0012]}             // Color offset
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
