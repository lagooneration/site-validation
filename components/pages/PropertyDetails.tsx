'use client'
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
  const [panelCapacity, setPanelCapacity] = useState<number>(10); // in kW
  const [budget, setBudget] = useState<number>(50000); // in INR
  const [electricityCost, setElectricityCost] = useState<number>(7); // per kWh
  const [interestRate, setInterestRate] = useState<number>(8); // annual interest rate
  const [years, setYears] = useState<number>(5); // loan period
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
                <div className="grid grid-rows-2 gap-4">
                  <div className="grid gap-3 w-1/2">
                  <Label>Panel Capacity: {panelCapacity} kW</Label>
                  <div className="flex items-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                  <Input
                    type="range"
                    min="10"
                    max="1000"
                    value={panelCapacity}
                    onChange={(e) => setPanelCapacity(parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  </div>
                </div>
                <div className="grid gap-3 w-1/2">
                <Label>Budget (INR): ₹{budget}</Label>
                <div className="flex items-center h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
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
            <Label>Estimated EMI: ₹{emi} / month</Label>
            </div>
                </div>
                </fieldset>
            </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="w-[1086px] h-[800px] flex flex-col items-center justify-center">
                {/* <Experience uploadedImage={uploadedImage} /> */}
                <Label>Return on Investment (ROI) Graph</Label>

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
              <div className="flex flex-col gap-4">
              <span className='flex flex-col items-start w-full justify-between text-muted-foreground gap-2'>
              <Label>Energy Saved Annually: {energySaved.toFixed(2)} kWh</Label>
              <Label>Money Saved Annually: ₹{(energySaved * electricityCost).toFixed(2)}</Label>
              
            </span>
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