// PlaneWithTexture.tsx
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { MeshProps } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
// import { useSearchParams } from 'next/navigation'

interface PlaneWithTextureProps extends MeshProps {
  texturePath: string;  // Allow for dynamic textures if needed
}

const Land: React.FC<PlaneWithTextureProps> = ({ texturePath, ...props }) => {
  
  
  // Load the texture using the Three.js TextureLoader
  const texture = useLoader(TextureLoader, texturePath);
  const meshRef = useRef<Mesh>(null!); // Ref for accessing the mesh if needed

  return (
    <mesh ref={meshRef} {...props}>
      {/* PlaneGeometry: width = 5, height = 5 */}
      <planeGeometry args={[10, 10]} />
      {/* Material with the loaded texture */}
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Land;