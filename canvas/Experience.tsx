import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import Land from '@/components/three/Land';
import Earth from '@/components/three/Earth';
// import SunPath from '@/components/three/Sunpath';
import { SunSimulation } from '@/components/sun-simulation';
import { useControls } from 'leva';
import { Vector3 } from 'three';



const Experience: React.FC<{ uploadedImage: File | null }> = ({ uploadedImage }) => {
    const texturePath = uploadedImage ? URL.createObjectURL(uploadedImage) : null;
    
    const { showGrid, showCompass } = useControls({
        showGrid: { value: false, label: 'Grid' },
        showCompass: { value: false, label: 'Compass' }
    });

    const compassDirections = useMemo(() => {
        const radius = 1.2;
        return [
          { label: 'N', position: new Vector3(0, 0, -radius) },
          { label: 'S', position: new Vector3(0, 0, radius) },
          { label: 'E', position: new Vector3(radius, 0, 0) },
          { label: 'W', position: new Vector3(-radius, 0, 0) },
        ];
      }, []);

    return (
        <>
            <Canvas camera={{ position: [1.5, 3, 3], fov: 75, near: 0.1, far: 1000 }}>
                <ambientLight intensity={0.2}/>
                {/* <SunPath /> */}
                <Earth />
                <SunSimulation />
                {showCompass && compassDirections.map(({ label, position }) => (
                <Text
                    key={label}
                    position={position}
                    rotation={[-Math.PI / 2, 0, 0]}
                    color="white"
                    fontSize={0.2}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
                ))}
                {texturePath && (
                    <Land texturePath={texturePath} position={[0, 0.5, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow/>
                )}
                {showGrid && <Grid args={[100, 100]} />}
                <OrbitControls />
            </Canvas>
        </>
    );
};

export default Experience;