"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useControls } from "leva"

const formatTime = (hours: number, minutes: number) => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export function Day() {
  const [time, setTime] = useState(12 * 60); // Default to 12:00

  const handleValueChange = (value: number[]) => {
    setTime(Math.round(value[0]));
  };

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  const { hour } = useControls({
    hour: {
      value: 12,
      min: 0,
      max: 24,
      step: 1,
    },
  });

  React.useEffect(() => {
    setTime(time);
  }, [time]);

  return (
    <div className="grid gap-3">
      <Label htmlFor="daytime">Time: <span className="text-blue-500">{formatTime(hours, minutes)}</span></Label>
      <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">

      <Slider
        id="daytime"
        defaultValue={[12 * 60]}
        max={24 * 60 - 1}
        step={1}
        onValueChange={handleValueChange}
      />
      </div>
    </div>
  );
}