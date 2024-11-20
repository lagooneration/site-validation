import { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import Land from '@/components/three/Land';
import Earth from '@/components/three/Earth';
// import Cube from '@/components/three/Cube';
// import SunPath from '@/components/three/Sunpath';
import { SunSimulation } from '@/components/sun-simulation';
import { useControls } from 'leva';
import { Vector3 } from 'three';
import { useSearchParams } from 'next/navigation';
import Building from '@/components/three/Building';
import { useCallback } from 'react';
import { useThree } from '@react-three/fiber';




const ScreenshotHandler: React.FC<{ onScreenshot?: (dataUrl: string) => void }> = ({ onScreenshot }) => {
    const { gl, scene, camera } = useThree();

    const handleScreenshot = useCallback(() => {
        if (!onScreenshot) return;
        
        // Force a render
        gl.render(scene, camera);
        
        // Get the canvas data
        const dataUrl = gl.domElement.toDataURL('image/png');
        
        // Pass the data URL to the callback
        onScreenshot(dataUrl);
    }, [gl, scene, camera, onScreenshot]);

    // Expose handleScreenshot to window for external access
    useEffect(() => {
        (window as any).takeScreenshot = handleScreenshot;
        return () => {
            delete (window as any).takeScreenshot;
        };
    }, [handleScreenshot]);

    return null; // This component doesn't render anything
};


const Experience: React.FC<{ 
    uploadedImage: File | null,
    onScreenshot?: (dataUrl: string) => void 
  }> = ({ uploadedImage, onScreenshot }) => {

    const [size, setSize] = useState({ width: 0, height: 0 });
    
    useEffect(() => {
        // Handle initial size
        const updateSize = () => {
            const container = document.querySelector('.canvas-container');
            if (container) {
                setSize({
                    width: container.clientWidth,
                    height: container.clientHeight
                });
            }
        };

        // Initial size
        updateSize();

        // Add resize listener
        window.addEventListener('resize', updateSize);

        // Cleanup
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    
    const searchParams = useSearchParams();
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const texturePath = uploadedImage ? URL.createObjectURL(uploadedImage) : null;
    
    const { showGrid, showCompass, showEarth } = useControls({
        showGrid: { value: true, label: 'Grid' },
        showCompass: { value: false, label: 'Compass' },
        showEarth: { value: true, label: 'Earth' },
        // showGola: { value: false, label: 'Gola' }
        // showCube: { value: false, label: 'Cube' }
    });

    const compassDirections = useMemo(() => {
        const radius = 50.0;
        return [
          { label: 'N', position: new Vector3(0, 0, -radius) },
          { label: 'S', position: new Vector3(0, 0, radius) },
          { label: 'E', position: new Vector3(radius, 0, 0) },
          { label: 'W', position: new Vector3(-radius, 0, 0) },
        ];
      }, []);
    

    return (
        <div className="canvas-container relative w-full h-full">
            <Canvas 
            camera={{ position: [72, -72, -128], fov: 75, near: 0.1, far: 1000 }} 
            shadows
            gl={{ preserveDrawingBuffer: true }}
            >
                <ambientLight intensity={0.2}/>
                {/* <SunPath /> */}
                {showEarth && <Earth />}
                {/* {showGola && <Gola />} */}
                {/* {showCube && <Cube />} */}
                {showCompass && compassDirections.map(({ label, position }) => (
                <Text
                    key={label}
                    position={position.add(new Vector3(0, 1, 1))}
                    rotation={[-Math.PI / 3, 0, 0]}
                    strokeWidth={0.08}
                    strokeColor="black"
                    color={label === 'N' ? 'red' : 'white'}
                    fontSize={8}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
                ))}
                {texturePath && (
                    <Land texturePath={texturePath} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow/>
                )}
                {showGrid && <Grid args={[100, 100]} position={[0, -1.5, 0]} />}
                <SunSimulation 
                    initialLatitude={latitude ? parseFloat(latitude) : undefined}
                    initialLongitude={longitude ? parseFloat(longitude) : undefined}
                />
                <OrbitControls />
                <Building />
                <ScreenshotHandler onScreenshot={onScreenshot} />
            </Canvas>
        </div>
    );
};

export default Experience;