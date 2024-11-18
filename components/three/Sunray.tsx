import { useMemo, forwardRef, useEffect, useRef } from 'react';
import { Vector3, Quaternion, SpotLight, SpotLightHelper } from 'three';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface SunrayProps {
  position: Vector3;
  cameraScale: number;
  visible?: boolean;
  opacity?: number;
  color?: string;
}

const Sunray = forwardRef<THREE.Mesh, SunrayProps>(({
  position,
  cameraScale,
  visible = true,
  opacity = 0.2,
  color = '#ffff00'
}, ref) => {
  const spotLightRef = useRef<SpotLight>(new SpotLight(0xffffff, 400, 25, Math.PI / 2, 1, 1));
  const spotLightHelperRef = useRef<SpotLightHelper | null>(null);

  useEffect(() => {
    if (spotLightRef.current) {
      // spotLightRef.current.position.set(0, 0, 0);
      spotLightRef.current.target.position.set(0, 0, 0);
      spotLightRef.current.target.updateMatrixWorld();
    }
  }, []);

  const cylinderProps = useMemo(() => {
    const start = position;
    const end = new Vector3(0, 0, 0);
    const distance = position.length();

    const direction = new Vector3().subVectors(end, start).normalize();
    const quaternion = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction
    );

    const midPoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
    const lightPosition = new Vector3().copy(start);
    
    return {
      position: midPoint,
      quaternion: quaternion,
      height: distance,
      bottomRadius: 0.5,
      topRadius: Math.max(0.5, cameraScale * 0.05),
      lightPosition,
    };
  }, [position, cameraScale]);

  const spotlightAngle = useMemo(() => {
    return 0.004 + (cameraScale / 200) * (1.000 - 0.004);
  }, [cameraScale]);

  useEffect(() => {
    if (spotLightRef.current && !spotLightHelperRef.current) {
      spotLightHelperRef.current = new SpotLightHelper(spotLightRef.current);
    }
    return () => {
      if (spotLightHelperRef.current) {
        spotLightHelperRef.current.dispose();
        spotLightHelperRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (spotLightHelperRef.current) {
      spotLightHelperRef.current.update();
    }
  }, [spotlightAngle, position]);

  if (!visible) return null;

  return (
    <>
      <Cylinder
        ref={ref}
        args={[
          cylinderProps.topRadius,
          cylinderProps.bottomRadius,
          cylinderProps.height,
          8,
          1
        ]}
        position={cylinderProps.position}
        quaternion={cylinderProps.quaternion}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </Cylinder>
      <spotLight
        ref={spotLightRef}
        position={cylinderProps.lightPosition}
        angle={spotlightAngle}
        penumbra={0.5}
        intensity={1000}
        color={'red'}
        castShadow
        distance={100}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {spotLightHelperRef.current && <primitive object={spotLightHelperRef.current} />}
      </>
  );
});

Sunray.displayName = 'Sunray';

export default Sunray;