// import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import Lights from '@/components/three/Lights';
import Atmosphere from '@/components/three/Atmosphere';
import Cube from '@/components/three/Cube';
import Land from '@/components/three/Land';
import Earth from '@/components/three/Earth';
import SunPath from '@/components/three/Sunpath';
import SunSimulation from '@/components/sun-simulation'
import { DoubleSide, TextureLoader } from 'three';
// import { Vector3 } from 'three';

const Experience: React.FC<{ uploadedImage: File | null }> = ({ uploadedImage }) => {
    const texturePath = uploadedImage ? URL.createObjectURL(uploadedImage) : null;

  return (
      <Canvas camera={{ position: [3, -3, 3], fov: 75, near: 0.1, far: 1000 }}>
      {/* <Lights /> */}
      {/* <Cube position={[0, 1, 0]} /> */}
      {/* <Plane rotation={[-Math.PI / 2, 0, 0]} /> */}
      <ambientLight intensity={0.2}/>
      <SunPath />
      <Earth />
      {/* <Atmosphere /> */}
      <SunSimulation />
      {texturePath && (
        <Land texturePath={texturePath} position={[0, 0.5, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow/>
      )}
      {/* <Land texturePath="/assets/location1.png" position={[0, 0.5, -0.5]} rotation={[-Math.PI / 2, 0, 0]} castShadow/> */}
      <OrbitControls />
    </Canvas>
  );
};

export default Experience;