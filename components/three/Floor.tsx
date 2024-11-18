import { MathUtils } from 'three';
import { Plane } from '@react-three/drei';

const Floor: React.FC = () => {
  return (
    <Plane
      args={[1000, 1000]}
      position={[0, -1, 0]}
      rotation={[-90 * MathUtils.DEG2RAD, 0, 0]}
      receiveShadow
    >
      <shadowMaterial opacity={0.5} />
    </Plane>
  );
};

export default Floor;