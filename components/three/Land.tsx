// PlaneWithTexture.tsx
import { useLoader } from '@react-three/fiber';
import { DoubleSide, TextureLoader } from 'three';
import { MeshProps } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Mesh, PlaneGeometry } from 'three';

interface PlaneWithTextureProps extends MeshProps {
  texturePath: string;
}

const Land: React.FC<PlaneWithTextureProps> = ({ texturePath, ...props }) => {
  const texture = useLoader(TextureLoader, texturePath);
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    if (texture) {
      // Get the aspect ratio of the loaded texture
      const aspectRatio = texture.image.width / texture.image.height;
      
      // Update the plane geometry to match the texture's aspect ratio
      // Keep the width at 80 and adjust the height accordingly
      const width = 80;
      const height = width / aspectRatio;
      
      if (meshRef.current) {
        const geometry = meshRef.current.geometry;
        geometry.dispose(); // Clean up old geometry
        meshRef.current.geometry = new PlaneGeometry(width, height);
      }
    }
  }, [texture]);

  return (
    <mesh ref={meshRef} {...props}>
      <planeGeometry args={[80, 80]} /> {/* Initial size, will be updated */}
      <meshBasicMaterial map={texture} side={DoubleSide} />
    </mesh>
  );
};

export default Land;