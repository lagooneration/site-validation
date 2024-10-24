'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SquareArrowOutDownLeft, TrendingUp } from 'lucide-react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Day } from "../ui/day"
import { Month } from "../ui/month"
// import { HourMonth } from "../hour-month"
import { DataCharts } from "../data-charts"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
// import { SunCanvas } from "@/components/sun-canvas"
import { Badge } from "@/components/ui/badge"
import Experience from "@/canvas/Experience"
// import { SliderProvider } from '../ui/SliderContext'
import { Leva } from 'leva'


const ShadowAnalysis: React.FC = () => {

const searchParams = useSearchParams()

  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")
  const capacity = searchParams.get("capacity")
  const propertyName = searchParams.get("propertyName")
  // const screenshot = searchParams.get("screenshot")

  // State to hold the uploaded image
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }


   return (
    <main className="grid flex-1 gap-4 overflow-hidden p-4 md:grid-cols-2 lg:grid-cols-3">
        <Leva collapsed={true} titleBar={{ title: "Shadow Analysis", position: { x: -55, y: 100 } }} />
          <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  {propertyName}
                </legend>
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid grid-rows-2 gap-2">
                      <div className="grid grid-cols-2 items-center">
                        <Label>
                        <span className="text-muted-foreground">Latitude:</span>
                        </Label>
                        <Input id="lat" type="number" placeholder={`${latitude}`} />
                        <Label>
                        <span className="text-muted-foreground">Longitude:</span>
                        </Label>
                        <Input id="long" type="number" placeholder={`${longitude}`}/>
                      </div>
                      <div className="grid gap-3 mt-4">
                        <Day />     
                      </div>
                    </div>

                    <div className="h-full w-full flex items-center justify-center">
                      <Image src="/assets/location1.png" alt="sun" width={220} height={200} />
                    </div>
                </div>
                  
              </fieldset>
              <div className="grid gap-3">
                  <DataCharts />
                </div>
                <div className="grid -gap-3">
                
                </div>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="w-[1086px] h-[800px]">
                <Experience uploadedImage={uploadedImage} />
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
                <TooltipProvider>
                <Tooltip>
                        <TooltipTrigger asChild>
                                <input type="file" accept="image/*" onChange={handleFileChange} /> 
                        </TooltipTrigger>
                        <TooltipContent side="top">Location</TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
                <Button variant="destructive" type="button" size="sm" className="ml-auto gap-1.5">
                  Reset
                  <SquareArrowOutDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </main>
   )


}

export default ShadowAnalysis