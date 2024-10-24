"use client"

import React, { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export const description = "An interactive bar chart"

const Emicalc: React.FC = () => {
  // Input Variables
  const [panelCapacity, setPanelCapacity] = useState<number>(0); // in kW
  const [budget, setBudget] = useState<number>(0); // in INR
  const [electricityCost, setElectricityCost] = useState<number>(7); // per kWh
  const [interestRate, setInterestRate] = useState<number>(8); // annual interest rate
  const [years, setYears] = useState<number>(5); // loan period
  const [energySaved, setEnergySaved] = useState<number>(0); // in kWh per year
  const [electricityBill, setElectricityBill] = useState<number>(10000); // monthly electricity bill in INR
  const [costReduction, setCostReduction] = useState<number>(0); // percentage reduction in electricity cost

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
  
  // Calculate percentage reduction in electricity cost
  const calculateCostReduction = () => {
    const monthlySavings = (energySaved / 12) * electricityCost;
    const reductionPercentage = (monthlySavings / electricityBill) * 100;
    setCostReduction(parseFloat(reductionPercentage.toFixed(2)));
  };

  // Update EMI, energy savings, and ROI on state change
  useEffect(() => {
    calculateEMI();
    estimateEnergySaved();
    generateRoiData();
    calculateCostReduction();
    setBudget(panelCapacity * 52000);
  }, [panelCapacity, budget, electricityCost, interestRate, years, electricityBill]);

  return (
    <div className="flex flex-col gap-4">
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <div className="grid grid-cols-2 gap-2 items-center justify-between">
                  <Label className="flex flex-row items-center gap-2">
                  <span className="text-muted-foreground">Panel Capacity: </span>
                  <span className="flex items-center h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  {panelCapacity} kW
                  </span>
                  </Label>
                  <div className="flex items-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <Input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={panelCapacity}
                    onChange={(e) => setPanelCapacity(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
        <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2 items-center">
            <Label>
            <span className="text-muted-foreground">Unit Cost (kWh):</span>
            </Label>
                  <Input
                    type="number"
                    value={electricityCost}
                    onChange={(e) => setElectricityCost(parseFloat(e.target.value))}
                  />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Label>
            <span className="text-muted-foreground">Interest (%):</span>
            </Label>
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-2 items-center">
            <Label>
            <span className="text-muted-foreground">Bill (monthly):</span>
            </Label>
                  <Input
                    type="number"
                    value={electricityBill}
                    onChange={(e) => setElectricityBill(parseFloat(e.target.value))}
                  />
            </div>
            <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Label>
            <span className="text-muted-foreground">Period (Years):</span>
            </Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
            />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
      <form className="grid w-full items-start gap-6">
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Label>Solar Energy Generated: {energySaved.toFixed(2)} kWh / year</Label>
                <Label>Cost Reduction: {costReduction}%</Label>
                <Label>
                  Estimated EMI:{' '} 
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(emi)} / month
                </Label>
              </div>
              <div className="grid gap-3">
              <Label>Estimated Budget:{' '} 
                <span className="text-red-500">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(budget)}
                </span>
              </Label>
              </div>
            </form>
            <Card
              className="w-full mt-4" x-chunk="charts-01-chunk-6"
            >
              <CardHeader className="p-4 pb-0">
                <CardDescription>
                Predicted annual savings based on the expected irradiance.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
                <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
                <span className="text-green-500">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format((energySaved/12) * electricityCost)}
                </span>
                </div>
                <ChartContainer
                  config={{
                    calories: {
                      label: "Calories",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="ml-auto w-[64px]"
                >
                  <BarChart
                    accessibilityLayer
                    margin={{
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: "2024-01-01",
                        calories: 354,
                      },
                      {
                        date: "2024-01-02",
                        calories: 514,
                      },
                      {
                        date: "2024-01-03",
                        calories: 345,
                      },
                      {
                        date: "2024-01-04",
                        calories: 734,
                      },
                      {
                        date: "2024-01-05",
                        calories: 645,
                      },
                      {
                        date: "2024-01-06",
                        calories: 456,
                      },
                      {
                        date: "2024-01-07",
                        calories: 345,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="calories"
                      fill="var(--color-calories)"
                      radius={2}
                      fillOpacity={0.2}
                      activeIndex={6}
                      activeBar={<Rectangle fillOpacity={0.8} />}
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={4}
                      hide
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
      </CardContent>
    </Card>
    
  </div>
  )
}

export default Emicalc;
