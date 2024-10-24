'use client'
// // import React from 'react'

// // const PropertyDetails = () => {
// //   return (
// //     <div className="h-full w-full">
// //       <h2>Property Details</h2>
// //       {/* Add your shadow analysis content here */}
// //     </div>
// //   )
// // }

// // export default PropertyDetails;

///////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Sky } from '@react-three/drei';
// import { Vector3 } from 'three';
// import { Sun } from '@/components/three/Sun';


// import { TrendingUp } from "lucide-react"
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"




// const chartConfig = {
//   desktop: {
//     label: "Sunlight",
//     color: "hsl(24, 100%, 59%)",
//   },
//   mobile: {
//     label: "Units",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

// const PropertyDetails: React.FC = () => {

//   const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
// const [month, setMonth] = useState(0);
// const [timeOfDay, setTimeOfDay] = useState(12);
// const [sunPosition, setSunPosition] = useState(new Vector3(0, 1, 0));
// const [chartData, setChartData] = useState([
//   { month: "January", sunlight: 266, units: 99 },
//   { month: "February", sunlight: 275, units: 115 },
//   { month: "March", sunlight: 278, units: 120 },
//   { month: "April", sunlight: 287, units: 127 },
//   { month: "May", sunlight: 299, units: 132 },
//   { month: "June", sunlight: 314, units: 140 },
//   { month: "July", sunlight: 316, units: 141 },
//   { month: "August", sunlight: 311, units: 136 },
//   { month: "September", sunlight: 294, units: 122 },
//   { month: "October", sunlight: 284, units: 110 },
//   { month: "November", sunlight: 272, units: 101 },
//   { month: "December", sunlight: 254, units: 96 },
// ]);



//   useEffect(() => {
//     updateSunPosition();
//   }, [latitude, longitude, month, timeOfDay]);

//   const updateSunPosition = () => {
//     // Calculate sun position based on latitude, month, and time of day
//     const elevation = Math.sin((timeOfDay / 24) * Math.PI) * Math.cos(latitude * Math.PI / 180);
//     const azimuth = Math.cos((timeOfDay / 24) * Math.PI);
//     setSunPosition(new Vector3(azimuth, elevation, 0));
//   };

//   const handleSunlightChange = (sunlightPercentage: number) => {
//     const updatedChartData = chartData.map((data, index) => {
//       if (index === month) {
//         const units = calculateUnits(sunlightPercentage);
//         return { ...data, sunlight: sunlightPercentage, units };
//       }
//       return data;
//     });
//     setChartData(updatedChartData);
//   };

//   const calculateUnits = (sunlightPercentage: number) => {
//     // Implement your logic to calculate electrical units based on sunlight percentage
//     // This is a placeholder implementation
//     return Math.round(sunlightPercentage * 1.5);
//   };

//   return (
//     <div className="flex flex-row items-center justify-center h-full">
//       <div className="flex flex-col w-[200px] items-start justify-evenly gap-4 p-4">
//         <label>
//           Latitude:
//           <input
//             type="range"
//             min="-90"
//             max="90"
//             value={latitude}
//             onChange={(e) => setLatitude(Number(e.target.value))}
//           />
//         </label>
//         <label>
//           Longitude:
//           <input
//             type="range"
//             min="-180"
//             max="180"
//             value={longitude}
//             onChange={(e) => setLongitude(Number(e.target.value))}
//           />
//         </label>
//         <label>
//           Time of Day:
//           <input
//             type="range"
//             min="0"
//             max="24"
//             value={timeOfDay}
//             onChange={(e) => setTimeOfDay(Number(e.target.value))}
//           />
//         </label>
//         <label>
//           Month:
//           <input
//             type="range"
//             min="1"
//             max="12"
//             value={month}
//             onChange={(e) => setMonth(Number(e.target.value))}
//           />
//         </label>
//       </div>
//       <div>
//       <Card>
//       <CardHeader>
//         <CardTitle>Sunlight Coverage</CardTitle>
//         <CardDescription>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 font-medium leading-none">
//               4.2 units per day <TrendingUp className="h-4 w-4" />
//             </div>
//           </div>
//         </div>
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <defs>
//               <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-desktop)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-mobile)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>
//             <Area
//               dataKey="units"
//               type="natural"
//               fill="url(#fillMobile)"
//               fillOpacity={0.4}
//               stroke="var(--color-mobile)"
//               stackId="a"
//             />
//             <Area
//               dataKey="sunlight"
//               type="natural"
//               fill="url(#fillDesktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//       </div>
//       <div className="w-[500px] h-full">
//       {/* <Sun
//         sunPosition={sunPosition}
//         latitude={latitude}
//         month={month}
//         timeOfDay={timeOfDay}
//         onSunlightChange={handleSunlightChange}
//       /> */}
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
// import { SunCanvas } from "@/components/sun-canvas"
import { Badge } from "@/components/ui/badge"
import { SquareArrowOutDownLeft } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PropertyDetails: React.FC = () => {
  // Input Variables
  const [panelCapacity, setPanelCapacity] = useState<number>(5); // in kW
  const [budget, setBudget] = useState<number>(5000); // in USD
  const [electricityCost, setElectricityCost] = useState<number>(0.1); // per kWh
  const [interestRate, setInterestRate] = useState<number>(8); // annual interest rate
  const [years, setYears] = useState<number>(10); // loan period
  const [energySaved, setEnergySaved] = useState<number>(0); // in kWh per year

  // Calculated EMI value
  const [emi, setEmi] = useState<number>(0);

  // Dynamic chart data
  const [roiData, setRoiData] = useState<any>(null);

  // Calculate EMI using the standard EMI formula
  const calculateEMI = () => {
    const monthlyRate = interestRate / (12 * 100);
    const n = years * 12; // Total months
    const emiValue = (budget * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    setEmi(parseFloat(emiValue.toFixed(2)));
  };

  // Estimate Energy Savings based on Panel Capacity (Assumption: 4 hours sun/day)
  const estimateEnergySaved = () => {
    const yearlyEnergy = panelCapacity * 4 * 365; // kWh per year
    setEnergySaved(yearlyEnergy);
  };

  // Generate ROI data dynamically for the graph
  const generateRoiData = () => {
    const savingsPerYear = energySaved * electricityCost;
    const roi = Array.from({ length: years }, (_, i) => savingsPerYear * (i + 1)); // Accumulated savings
    setRoiData({
      labels: Array.from({ length: years }, (_, i) => `Year ${i + 1}`),
      datasets: [
        {
          label: 'Cumulative Savings (INR)',
          data: roi,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
        },
      ],
    });
  };

  // Update EMI, energy savings, and ROI on state change
  useEffect(() => {
    calculateEMI();
    estimateEnergySaved();
    generateRoiData();
  }, [panelCapacity, budget, electricityCost, interestRate, years]);

  return (

    <main className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                Finance
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                  <Label>Panel Capacity (kW): {panelCapacity}</Label>
                  <Input
                    type="range"
                    min="10"
                    max="1000"
                    value={panelCapacity}
                    onChange={(e) => setPanelCapacity(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="grid gap-3">
                <Label>Budget (INR): ₹{budget}</Label>
                <Input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="grid gap-3">
              <Label>Cost of Electricity per kWh (INR):</Label>
              <Input
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(parseFloat(e.target.value))}
              />
            </div>

            <legend className="-ml-1 px-1 text-sm font-medium">
                Variables
                </legend>

            <div className="grid gap-3"> 
              <Label>Interest Rate (%):</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              />
            </div>

            <div className="grid gap-3">
              <Label>Loan Period (Years):</Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              {/* <DataCharts /> */}
              <Label>Estimated EMI: ₹{emi} / month</Label>
                  {/* <h2>Estimated EMI: ₹{emi} / month</h2> */}
                  <Label>Energy Saved Annually: {energySaved.toFixed(2)} kWh</Label>
                  {/* <h2>Energy Saved Annually: {energySaved.toFixed(2)} kWh</h2> */}
            </div>
                  <div className="grid gap-3">
                  <Label>Return on Investment (ROI) Graph</Label>
                    
                  </div>
                </div>
                </fieldset>
            </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="w-[1086px] h-[800px] flex flex-col items-end justify-center">
                {/* <Experience uploadedImage={uploadedImage} /> */}
                {roiData && <Line data={roiData} />}
            </div>
            <Badge variant="outline" className="absolute left-6 top-6">
              Output
            </Badge>
            <div className="flex-1" />
            <form
              className="relative overflow-hidden rounded-lg border bg-muted focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
            >
                
              <div className="flex items-center p-3 pt-0 mt-3 gap-2"> 
              <div className="flex flex-row gap-4">
                </div>
                <Button variant="destructive" type="button" size="sm" className="ml-auto gap-1.5">
                  Reset
                  <SquareArrowOutDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
  );
};

export default PropertyDetails;



   {/* <div className='h-full w-full flex flex-row items-between justify-start'>
      <div className='flex flex-col items-between justify-evenly gap-4 p-4'>
      <h1>Finance</h1>

      <div>
        <Label>Panel Capacity (kW): {panelCapacity}</Label>
        <Input
          type="range"
          min="10"
          max="1000"
          value={panelCapacity}
          onChange={(e) => setPanelCapacity(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <Label>Budget (INR): ₹{budget}</Label>
        <Input
          type="range"
          min="50000"
          max="2000000"
          step="10000"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <Label>Cost of Electricity per kWh (INR):</Label>
        <Input
          type="number"
          value={electricityCost}
          onChange={(e) => setElectricityCost(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Interest Rate (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Loan Period (Years):</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value))}
        />
      </div>

      <h2>Estimated EMI: ₹{emi} / month</h2>
      <h2>Energy Saved Annually: {energySaved.toFixed(2)} kWh</h2>
      <div>
        </div>
        </div>
      <div className='w-auto h-full flex flex-col items-start justify-center'>
        <h3>Return on Investment (ROI) Graph</h3>
        {roiData && <Line data={roiData} />}
      </div>
    </div> */}