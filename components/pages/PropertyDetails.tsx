'use client'
// import React from 'react'

// const PropertyDetails = () => {
//   return (
//     <div className="h-full w-full">
//       <h2>Property Details</h2>
//       {/* Add your shadow analysis content here */}
//     </div>
//   )
// }

// export default PropertyDetails;



import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Vector3 } from 'three';
import { Sun } from '@/components/three/Sun';


import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"




const chartConfig = {
  desktop: {
    label: "Sunlight",
    color: "hsl(24, 100%, 59%)",
  },
  mobile: {
    label: "Units",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const PropertyDetails: React.FC = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
const [month, setMonth] = useState(0);
const [timeOfDay, setTimeOfDay] = useState(12);
const [sunPosition, setSunPosition] = useState(new Vector3(0, 1, 0));
const [chartData, setChartData] = useState([
  { month: "January", sunlight: 266, units: 99 },
  { month: "February", sunlight: 275, units: 115 },
  { month: "March", sunlight: 278, units: 120 },
  { month: "April", sunlight: 287, units: 127 },
  { month: "May", sunlight: 299, units: 132 },
  { month: "June", sunlight: 314, units: 140 },
  { month: "July", sunlight: 316, units: 141 },
  { month: "August", sunlight: 311, units: 136 },
  { month: "September", sunlight: 294, units: 122 },
  { month: "October", sunlight: 284, units: 110 },
  { month: "November", sunlight: 272, units: 101 },
  { month: "December", sunlight: 254, units: 96 },
]);

  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const [timeOfDay, setTimeOfDay] = useState(12); // 0 to 24
  // const [month, setMonth] = useState(6); // 1 to 12
  // const [sunPosition, setSunPosition] = useState(new THREE.Vector3());

  // const calculateSunPosition = (lat: number, lon: number, time: number, month: number) => {
  //   const phi = (lat * Math.PI) / 180;
  //   const theta = ((time / 24) * 2 * Math.PI) - Math.PI / 2;
  //   const declination = 23.45 * Math.sin(((360 / 365) * (month - 81)) * (Math.PI / 180));
  //   const delta = (declination * Math.PI) / 180;

  //   const x = Math.cos(phi) * Math.cos(theta);
  //   const y = Math.sin(phi) * Math.cos(delta) - Math.cos(phi) * Math.sin(delta) * Math.sin(theta);
  //   const z = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.sin(theta);

  //   return new THREE.Vector3(x, y, z);
  // };

  // useEffect(() => {
  //   setSunPosition(calculateSunPosition(latitude, longitude, timeOfDay, month));
  // }, [latitude, longitude, timeOfDay, month]);


  useEffect(() => {
    updateSunPosition();
  }, [latitude, longitude, month, timeOfDay]);

  const updateSunPosition = () => {
    // Calculate sun position based on latitude, month, and time of day
    const elevation = Math.sin((timeOfDay / 24) * Math.PI) * Math.cos(latitude * Math.PI / 180);
    const azimuth = Math.cos((timeOfDay / 24) * Math.PI);
    setSunPosition(new Vector3(azimuth, elevation, 0));
  };

  const handleSunlightChange = (sunlightPercentage: number) => {
    const updatedChartData = chartData.map((data, index) => {
      if (index === month) {
        const units = calculateUnits(sunlightPercentage);
        return { ...data, sunlight: sunlightPercentage, units };
      }
      return data;
    });
    setChartData(updatedChartData);
  };

  const calculateUnits = (sunlightPercentage: number) => {
    // Implement your logic to calculate electrical units based on sunlight percentage
    // This is a placeholder implementation
    return Math.round(sunlightPercentage * 1.5);
  };

  return (
    <div className="flex flex-row items-center justify-center h-full">
      <div className="flex flex-col w-[200px] items-start justify-evenly gap-4 p-4">
        <label>
          Latitude:
          <input
            type="range"
            min="-90"
            max="90"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
        </label>
        <label>
          Longitude:
          <input
            type="range"
            min="-180"
            max="180"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </label>
        <label>
          Time of Day:
          <input
            type="range"
            min="0"
            max="24"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(Number(e.target.value))}
          />
        </label>
        <label>
          Month:
          <input
            type="range"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
      <Card>
      <CardHeader>
        <CardTitle>Sunlight Coverage</CardTitle>
        <CardDescription>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              4.2 units per day <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="units"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="sunlight"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
      </div>
      <div className="w-[500px] h-full">
      {/* <Sun
        sunPosition={sunPosition}
        latitude={latitude}
        month={month}
        timeOfDay={timeOfDay}
        onSunlightChange={handleSunlightChange}
      /> */}
      </div>
    </div>
  );
};

export default PropertyDetails;