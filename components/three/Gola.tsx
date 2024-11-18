import { MeshProps } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

const Gola: React.FC<MeshProps> = (props) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} {...props} castShadow receiveShadow>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Gola;
