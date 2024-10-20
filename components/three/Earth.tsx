// components/Cube.tsx
import { MeshProps, useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, TextureLoader } from 'three';

const Earth: React.FC = () => {
  // const texture = new TextureLoader().load('/earth/earth.jpg');
  // const specularClouds = new TextureLoader().load('/earth/disp.jpg');

  // const earthTexture = useLoader(TextureLoader, '/earth/day.jpg')

  const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    '/earth/day.jpg',
    '/earth/disp.png',
    '/earth/earthNormal.jpg',
    '/earth/specularClouds.jpg',
  ])


  return (
    <mesh>
      <sphereGeometry args={[4, 64, 64]} />
      <meshStandardMaterial 
      displacementScale={0.2}
      map={colorMap}
      displacementMap={displacementMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      />
    </mesh>
  );
};

export default Earth;
