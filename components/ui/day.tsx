"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useControls } from "leva";
import { useSlider } from "@/components/ui/SliderContext";

const formatTime = (hours: number, minutes: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export function Day() {
  const { value, setValue } = useSlider();
  const hours = Math.floor(value.daytime / 60);
  const minutes = value.daytime % 60;

  const handleValueChange = (value: number[]) => {
    setValue(prev => ({ ...prev, daytime: Math.round(value[0]) }));
  };


  const { hour } = useControls({
    hour: {
      value: 12,
      min: 0,
      max: 24,
      step: 1,
    },
  });


  return (
    <div className="grid gap-3">
      <Label htmlFor="daytime">Time: <span className="text-blue-500">{formatTime(hours, minutes)}</span></Label>
      <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
        <Slider
          id="daytime"
          value={[value.daytime]} // Use the context value
          max={24 * 60 - 1}
          step={1}
          onValueChange={handleValueChange}
        />
      </div>
    </div>
  );
}