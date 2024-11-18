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


const DefaultImagePlaceholder = () => (
  <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
    <div className="w-48 flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400">
      <svg
        viewBox="0 0 16 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
      >
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
      </svg>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
)


const ShadowAnalysis: React.FC = () => {

const searchParams = useSearchParams()

  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")
  const capacity = searchParams.get("capacity")
  const propertyName = searchParams.get("propertyName")
  // const screenshot = searchParams.get("screenshot")

  // State to hold the uploaded image
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("/assets/location1.png") 
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  // Update handleFileChange
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const objectUrl = URL.createObjectURL(file)
      setImageUrl(objectUrl)
      setShowPlaceholder(false)
    }
  }

  // Add handleReset function
  const handleReset = () => {
    setUploadedImage(null)
    setShowPlaceholder(true)
    if (imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl)
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
                    {showPlaceholder ? (
                      <DefaultImagePlaceholder />
                    ) : (
                      <Image 
                        src={imageUrl} 
                        alt="location" 
                        width={220} 
                        height={200} 
                        onError={() => setShowPlaceholder(true)}
                      />
                    )}

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
                <Button 
                  variant="destructive" 
                  type="button" 
                  size="sm" 
                  className="ml-auto gap-1.5"
                  onClick={handleReset}
                >
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