import React from 'react';
import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLightHelper, SpotLightHelper } from 'three';
import * as THREE from 'three';

const Lights: React.FC = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Uncomment these lines to see the light helpers
  useHelper(directionalLightRef, DirectionalLightHelper, 1);
  useHelper(spotLightRef, SpotLightHelper, 1);

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      <ambientLight intensity={0.1} />

      {/* Main directional light simulating sunlight */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spot light for dramatic highlighting */}
      <spotLight
        ref={spotLightRef}
        position={[-5, 8, -5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Soft, warm fill light */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffaa00" />

      {/* Cool rim light for edge definition */}
      <pointLight position={[-3, 5, -3]} intensity={0.3} color="#4466ff" />
    </>
  );
};

export default Lights;
