import { MeshProps } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

const Gola: React.FC<MeshProps> = (props) => {
  const meshRef = useRef<Mesh>(null);

  return (
    <>
    {/* <mesh ref={meshRef} {...props} castShadow receiveShadow>
      <boxGeometry args={[6, 10, 6]} />
      <meshStandardMaterial color="white" />
    </mesh>
    <mesh ref={meshRef} {...props} position={[-1, 7.5, -1]} castShadow receiveShadow>
        <cylinderGeometry args={[.6, .6]} />
        <meshStandardMaterial color="white" />  
    </mesh> */}
    {/* <mesh ref={meshRef} {...props} position={[-1, 4.4, -1]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="grey" />
    </mesh> */}
    
    <mesh {...props} castShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, .1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="white" transparent opacity={.3} />
    </mesh>
    </>
  );
};

export default Gola;
