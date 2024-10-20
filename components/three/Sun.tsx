import { Canvas, MeshProps } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls, Sky } from '@react-three/drei';

interface SunProps extends MeshProps {
  sunPosition: Vector3; // Accept sunPosition as a prop
}

const Sun: React.FC<SunProps> = ({ sunPosition, ...props }) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={sunPosition.toArray()} intensity={1} castShadow/>
      <Sky sunPosition={sunPosition.toArray()} />
      <OrbitControls />
      <mesh position={[0,8,0]} castShadow>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={meshRef} {...props} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </Canvas>
  );
};

export default Sun;