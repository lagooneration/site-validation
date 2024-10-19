// components/Cube.tsx
import { MeshProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

const Earth = () => {
 

  return (
    <mesh>
      <sphereGeometry args={[4, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Earth;
