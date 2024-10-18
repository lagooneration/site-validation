// canvas/Experience.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from '@/components/three/Lights';
import Cube from '@/components/three/Cube';
// import Plane from '../components/three/Plane';

const Experience = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
      <Lights />
      <Cube position={[0, 1, 0]} />
      {/* <Plane rotation={[-Math.PI / 2, 0, 0]} /> */}
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;
