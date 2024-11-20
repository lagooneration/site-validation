import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useMemo } from 'react';

const Building: React.FC = () => {
  const { scene } = useGLTF('/models/building.glb');
  const { showHouse } = useControls({
    showHouse: {
      value: false,
      label: 'House'
    }
  });

  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.scale.set(0.5, 0.5, 0.5);
    cloned.rotation.set(0, Math.PI / 2, 0);
    cloned.position.set(0, 2.3, 0);
    cloned.traverse((node: any) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  if (!showHouse) return null;

  return <primitive object={clonedScene} />;
};

export default Building;
