"use client"
// SunSimulation.tsx
import { useMemo, useRef, RefObject, useEffect } from 'react';
import { Vector3, Color, BufferGeometry, BufferAttribute, MathUtils, OrthographicCamera, CameraHelper } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { Sphere, Billboard, Ring, Plane, Line, useHelper } from '@react-three/drei';
import { DateTime } from 'luxon';
import tzLookup from 'tz-lookup';
import { getPosition } from 'suncalc';
import { Sky } from '@react-three/drei';
// import { Line } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';





const RADIUS = 50;
const night = new Color('#00008B');
const day = new Color('orange');

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const _color = new Color();

function getSunColor(y: number) {
  const nightStart = -RADIUS * .5;
  const dayStart = RADIUS * .5;
  if (y <= nightStart) return night.toArray();
  if (y >= dayStart) return day.toArray();
  const d = (y - nightStart) / (dayStart - nightStart);
  return _color.copy(night).lerp(day, d).toArray();
}


export const SunSimulation = () => {
  const { timeOfDay, month, longitude, latitude } = useControls({
    timeOfDay: { value: 12, min: 0, max: 23, step: 0.1 },
    month: { value: 6, min: 1, max: 12, step: 0.1 },
    longitude: { value: 0, min: -179, max: 180, step: 0.1 },
    latitude: { value: 51, min: -80, max: 80, step: 0.1 },
    // showCamHelper: false,
    // cameraScale: { value: 0.2, min: 0.1, max: 2_000_000 },
  });

  // const { position, sunPath } = useSun({ latitude, longitude, month, timeOfDay });

  // function Sun({ latitude, longitude }: { longitude: number, latitude: number }) {

    // const { position, sunPath } = useSun({ latitude, longitude, month, timeOfDay });
  
    const { position, sunPath } = useSun({ latitude, longitude, month, timeOfDay });
  
    const { showSunRay, cameraScale } = useControls({
      showSunRay: false,
      cameraScale: {
        value: 0.2,
        min: 0.1,
        max: 2_000_000,
      }
    });
  
    const camera = useRef<OrthographicCamera>(null);

    useFrame(() => {
      if (!camera.current) return;
      camera.current.left = -cameraScale;
      camera.current.right = cameraScale;
      camera.current.top = -cameraScale;
      camera.current.bottom = cameraScale;
    });

    const sunRayRef = useRef<Line2 | LineSegments2>(null);

    useEffect(() => {
      if (sunRayRef.current) {
        const start = position;
        const end = new Vector3(0, 0, 0);
        sunRayRef.current.geometry.setFromPoints([start, end]);
      }
    }, [position]);

    return (
      <>
        <ambientLight intensity={0.1} />
        <SunPath path={sunPath} />
        <Analemma latitude={latitude} longitude={longitude} />
        {showSunRay && (
          <Line
            ref={sunRayRef as React.Ref<Line2 | LineSegments2>}
            points={[position, new Vector3(0, 0, 0)]}
            color="yellow"
            lineWidth={1}
          />
        )}
        <directionalLight
          name="SunLight"
          castShadow
          position={position}
          intensity={position.y >= 0 ? 1.5 * Math.PI : 0}
          shadow-mapSize={1024}
        >
          <Sky 
            sunPosition={position}
            mieCoefficient={0.1}
            mieDirectionalG={0.9999}
            rayleigh={0.199}
          />
          <Sphere args={[2]} material-color="orange" visible={position.y >= 0} />
          <Billboard visible={position.y < 0}>
            <Ring args={[3, 4]} material-color="orange" />
          </Billboard>
          <orthographicCamera
            ref={camera}
            attach="shadow-camera"
            left={-cameraScale}
            right={cameraScale}
            top={-cameraScale}
            bottom={cameraScale}
            near={0.1}
            far={100_000_000}
          />
        </directionalLight>
        <hemisphereLight
          args={["#343838", "#005f6b"]}
          position={position}
          visible={position.y < 0}
          intensity={Math.PI}
        />
        <Floor />
      </>
    );
  };

// Removed CamHelper function as it's no longer needed

function SunPath({ path }: { path: Vector3[] }) {
  const geometry = useMemo(() => {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array(path.flatMap(v => [v.x, v.y, v.z]));
    const colors = new Float32Array(path.map(p => p.y).flatMap(getSunColor));
    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    return geometry;
  }, [path]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="white" vertexColors />
    </line>
  );
}


function Floor() {
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
}



function useSun({ latitude, longitude, month, timeOfDay }: { longitude: number, latitude: number, month: number, timeOfDay: number }) {
  const date = useMemo(() => {
    const timeZone = tzLookup(latitude, longitude);
    return DateTime.now().setZone(timeZone).set({
      month: Math.floor(month),
      day: Math.floor((month % 1) * 27) + 1,
      hour: Math.floor(timeOfDay),
      minute: (timeOfDay % 1) * 60,
      second: 0,
      millisecond: 0,
    }).toJSDate();
  }, [latitude, longitude, month, timeOfDay]);

  const { position, sunPath } = useMemo(() => {
    const position = getSunPosition({ date, latitude, longitude });
    const sunPath: Vector3[] = [];
    for (let hour = 0; hour <= 24; hour++) {
      const tempDate = new Date(date);
      tempDate.setHours(hour);
      sunPath.push(new Vector3(...getSunPosition({ date: tempDate, latitude, longitude })));
    }
    return { position: new Vector3(...position), sunPath };
  }, [date, latitude, longitude]);

  return { position, sunPath };
}

function getSunPosition({ date, latitude, longitude, radius = RADIUS }: {
  date: Date; latitude: number; longitude: number; radius?: number;
}): [number, number, number] {
  const sun = getPosition(date, latitude, longitude);
  const x = radius * Math.cos(sun.altitude) * -Math.sin(sun.azimuth);
  const z = radius * Math.cos(sun.altitude) * Math.cos(sun.azimuth);
  const y = radius * Math.sin(sun.altitude);
  return [x, y, z];
}

const Analemma = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const analemma = useMemo(() => getAnalemma({ latitude, longitude }), [latitude, longitude]);

  return (
    <>
      {analemma.map((points, i) => (
        <Line
          key={i}
          points={points}
          dashed
          dashScale={0.4}
          lineWidth={2}
          color="orange"
          opacity={0.5}
          transparent
        />
      ))}
    </>
  );
};

function getAnalemma({ latitude, longitude }: { latitude: number; longitude: number }) {
  const analemma: Vector3[][] = [];
  const timeZone = tzLookup(latitude, longitude);
  const dateTime = DateTime.now()
    .setZone(timeZone)
    .set({ minute: 0, second: 0, millisecond: 0 });

  for (let hour = 0; hour < 24; hour++) {
    analemma.push([]);
    for (let day = 0; day < 365; day++) {
      const date = dateTime.set({ day, hour }).toJSDate();
      analemma[hour].push(new Vector3(...getSunPosition({ date, latitude, longitude })));
    }
  }

  return analemma;
}