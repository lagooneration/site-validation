// canvas/Experience.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from '@/components/three/Lights';
import Cube from '@/components/three/Cube';
import Land from '@/components/three/Land';
import Atmosphere from '@/components/three/Atmosphere';
// import { Leva } from 'leva';

const Experience = () => {
  return (
      <Canvas camera={{ position: [3, -3, 3], fov: 75 }}>
      <Lights />
      {/* <Cube position={[0, 1, 0]} /> */}
      {/* <Plane rotation={[-Math.PI / 2, 0, 0]} /> */}
      <Atmosphere />
      {/* <Land texturePath="/assets/location1.png" position={[0, 0.5, -0.5]} rotation={[-Math.PI / 2, 0, 0]} castShadow/> */}
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;
