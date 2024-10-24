'use client'
import { useSearchParams } from "next/navigation"
// import { useState, useEffect } from "react"





import React, { useState } from 'react';

interface SolarInput {
  solarRadiation: number[]; // Array of monthly solar radiation values (kWh/m²/day)
  panelArea: number; // Total panel area in m²
  panelEfficiency: number; // Efficiency of solar panels (e.g., 0.18 for 18%)
  performanceRatio: number; // Performance ratio (e.g., 0.8)
  costPerKWh: number; // Cost of electricity per kWh
}

export const Documentation: React.FC = () => {
  const [inputs, setInputs] = useState<SolarInput>({
    solarRadiation: Array(12).fill(0), // Initialize with 12 months of 0 values
    panelArea: 0,
    panelEfficiency: 0.18,
    performanceRatio: 0.8,
    costPerKWh: 0.15, // Default cost per kWh
  });

  const [savings, setSavings] = useState<number>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === 'solarRadiation' && index !== undefined) {
      const newRadiation = [...inputs.solarRadiation];
      newRadiation[index] = parseFloat(value);
      setInputs({ ...inputs, solarRadiation: newRadiation });
    } else {
      setInputs({ ...inputs, [name]: parseFloat(value) });
    }
  };

  const calculateSavings = () => {
    const { solarRadiation, panelArea, panelEfficiency, performanceRatio, costPerKWh } = inputs;

    let totalEnergy = 0;

    // Calculate energy production for each month
    for (let i = 0; i < 12; i++) {
      const monthlyEnergy = solarRadiation[i] * 30 * panelArea * panelEfficiency * performanceRatio;
      totalEnergy += monthlyEnergy;
    }

    // Calculate total savings in currency
    const totalSavings = totalEnergy * costPerKWh;
    setSavings(totalSavings);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solar Energy Savings Calculator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Panel Area (m²):</label>
          <input
            type="number"
            name="panelArea"
            value={inputs.panelArea}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Panel Efficiency (%):</label>
          <input
            type="number"
            name="panelEfficiency"
            value={inputs.panelEfficiency * 100}
            onChange={(e) =>
              setInputs({ ...inputs, panelEfficiency: parseFloat(e.target.value) / 100 })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Performance Ratio:</label>
          <input
            type="number"
            name="performanceRatio"
            value={inputs.performanceRatio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Cost per kWh (currency):</label>
          <input
            type="number"
            name="costPerKWh"
            value={inputs.costPerKWh}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-medium">Monthly Solar Radiation (kWh/m²/day):</label>
          {inputs.solarRadiation.map((value, index) => (
            <input
              key={index}
              type="number"
              name="solarRadiation"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Month ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={calculateSavings}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Calculate Savings
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Total Savings: {savings.toFixed(2)} currency</h2>
      </div>
    </div>
  );
};





// export default function Documentation() {
//   return(
//     <div>
//       <h1>Documentation</h1>
//     </div>
//   )
// }



