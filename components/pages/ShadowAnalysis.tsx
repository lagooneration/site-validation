'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import {
  Box,
  Book,
  Bot,
  Copy,
  SquareArrowOutDownLeft,
  LandPlot,
  Moon,
  ImageUp,
  Settings,
  Settings2,
  Share,
  Sun,
  Bell,
  Info,
  Paperclip,
  MoveLeft,
} from "lucide-react"
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
        <Leva collapsed={true} titleBar={{ title: "Shadow Analysis", position: { x: -42, y: 95 } }} />
          <div
            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
          >
            <form className="grid w-full items-start gap-6">
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Upload
                </legend>
                <div className="flex flex-row gap-4">
                <TooltipProvider>
                <Tooltip>
                        <TooltipTrigger asChild>
                                <input type="file" accept="image/*" onChange={handleFileChange} /> 
                        </TooltipTrigger>
                        <TooltipContent side="top">Location screenshot</TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  {propertyName}
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input id="lat" type="number" placeholder={`${latitude}`} />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="long">Longitude</Label>
                    <Input id="long" type="number" placeholder={`${longitude}`}/>
                  </div>
                  </div>
                  <div className="grid gap-3 w-1/2">
                    <Day />     
                    <Month />
                  </div>
              </fieldset>
              <div className="grid gap-3">
                  <DataCharts />
                </div>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <div className="w-[1088px] h-[800px]">
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
                <Button>
                  <Paperclip className="size-3.5" />
                  </Button>  
                  <Button>
                  <Box className="size-3.5" />
                  </Button>  
                <Button  type="button" size="sm" className="ml-auto gap-1.5">
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