import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import Model2 from '../assets/Car_Tran_04.glb';
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

/*
author: Allay Design (https://sketchfab.com/Alister.Dsouza)
license: CC-BY-NC-ND-4.0 (http://creativecommons.org/licenses/by-nc-nd/4.0/)
source: https://sketchfab.com/3d-models/nissan-gtrs-max-nfs-most-wanted-bmw-version-1d4a30cf127c426b9e8d8a46aded19df
title: Nissan GTRs - Max (NFS Most Wanted BMW Version)
*/

function Car(props) {
  const { scene } = useGLTF(Model2);

  useEffect(() => {
    // Set scale and position
    scene.scale.set(1.6, 1.6, 1.6); // Scale the model
    scene.position.y = 0.66; // Position above the ground, adjust as needed
    scene.rotation.set(0, Math.PI / 2, 0);
    
    // Traverse the scene to set shadow properties
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 10;
      }
    });

    // Clean up on component unmount
    return () => {
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.castShadow = false;
          object.receiveShadow = false;
        }
      });
    };
  }, [scene]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const group = scene.children[0]?.children[7]; // Ensure group exists

    if (group) {
      group.children.forEach(child => {
        if (child.rotation) {
          child.rotation.y = elapsedTime * 2; // Rotate all children
        }
      });
    }
  });

  return <primitive object={scene} {...props} />;
}

export default Car;

useGLTF.preload(Model2);
