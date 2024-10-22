"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useSlider } from "@/components/ui/SliderContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formatTime = (value: number) => {
  const hours = Math.floor(value);
  const minutes = Math.round((value % 1) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export function Day() {
  const { value, setValue } = useSlider();
  const [showTooltip, setShowTooltip] = useState(false);
  const defaultValue = 12; // 12 hours

  React.useEffect(() => {
    setValue(defaultValue);
  }, []);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  const isDaytime = (time: number) => {
    return time >= 6 && time < 18;
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="daytime">Time: <span className={isDaytime(value) ? "text-yellow-500" : "text-blue-500"}>{formatTime(value)}</span></Label>
      <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
        <TooltipProvider>
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <Slider
                id="daytime"
                value={[value]}
                max={23.9}
                min={0}
                step={0.1}
                onValueChange={handleValueChange}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {isDaytime(value) ? (
                <svg
                  id="dayIcon"
                  height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  className="fill-yellow-500"
                >
                  <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
                </svg>
              ) : (
                <svg
                  id="nightIcon"
                  height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-500"
                >
                  <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z" />
                </svg>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}