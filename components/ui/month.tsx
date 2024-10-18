"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useSlider } from "@/components/ui/SliderContext";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Month() {
  const { value, setValue } = useSlider();

  const handleValueChange = (value: number[]) => {
    setValue(prev => ({ ...prev, month: Math.round(value[0]) }));
  };


  return (
    <div className="grid gap-3">
      <Label htmlFor="month">Month: <span className="text-blue-500">{monthNames[value.month - 1]}</span></Label>
      <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <Slider
        id="month"
        value={[value.month]} 
        max={12}
        step={1}
        onValueChange={handleValueChange}
      />
      </div>
    </div>
  );
}