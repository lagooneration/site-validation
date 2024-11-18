import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useMemo } from 'react';

const Building: React.FC = () => {
  const { scene } = useGLTF('/models/house.glb');
  const { showSunRay } = useControls({
    showSunRay: {
      value: false,
      label: 'Ray'
    }
  });

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.scale.set(0.5, 0.5, 0.5);
    cloned.position.set(0, 2.6, 0);
    cloned.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  if (!showSunRay) return null;

  return <primitive object={clonedScene} />;
};

export default Building;
