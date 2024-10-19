"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", sunlight: 222, units: 150 },
  { date: "2024-04-02", sunlight: 97, units: 180 },
  { date: "2024-04-03", sunlight: 167, units: 120 },
  { date: "2024-04-04", sunlight: 242, units: 260 },
  { date: "2024-04-05", sunlight: 373, units: 290 },
  { date: "2024-04-06", sunlight: 301, units: 340 },
  { date: "2024-04-07", sunlight: 245, units: 180 },
  { date: "2024-04-08", sunlight: 409, units: 320 },
  { date: "2024-04-09", sunlight: 59, units: 110 },
  { date: "2024-04-10", sunlight: 261, units: 190 },
  { date: "2024-04-11", sunlight: 327, units: 350 },
  { date: "2024-04-12", sunlight: 292, units: 210 },
  { date: "2024-04-13", sunlight: 342, units: 380 },
  { date: "2024-04-14", sunlight: 137, units: 220 },
  { date: "2024-04-15", sunlight: 120, units: 170 },
  { date: "2024-04-16", sunlight: 138, units: 190 },
  { date: "2024-04-17", sunlight: 446, units: 360 },
  { date: "2024-04-18", sunlight: 364, units: 410 },
  { date: "2024-04-19", sunlight: 243, units: 180 },
  { date: "2024-04-20", sunlight: 89, units: 150 },
  { date: "2024-04-21", sunlight: 137, units: 200 },
  { date: "2024-04-22", sunlight: 224, units: 170 },
  { date: "2024-04-23", sunlight: 138, units: 230 },
  { date: "2024-04-24", sunlight: 387, units: 290 },
  { date: "2024-04-25", sunlight: 215, units: 250 },
  { date: "2024-04-26", sunlight: 75, units: 130 },
  { date: "2024-04-27", sunlight: 383, units: 420 },
  { date: "2024-04-28", sunlight: 122, units: 180 },
  { date: "2024-04-29", sunlight: 315, units: 240 },
  { date: "2024-04-30", sunlight: 454, units: 380 },
  { date: "2024-05-01", sunlight: 165, units: 220 },
  { date: "2024-05-02", sunlight: 293, units: 310 },
  { date: "2024-05-03", sunlight: 247, units: 190 },
  { date: "2024-05-04", sunlight: 385, units: 420 },
  { date: "2024-05-05", sunlight: 481, units: 390 },
  { date: "2024-05-06", sunlight: 498, units: 520 },
  { date: "2024-05-07", sunlight: 388, units: 300 },
  { date: "2024-05-08", sunlight: 149, units: 210 },
  { date: "2024-05-09", sunlight: 227, units: 180 },
  { date: "2024-05-10", sunlight: 293, units: 330 },
  { date: "2024-05-11", sunlight: 335, units: 270 },
  { date: "2024-05-12", sunlight: 197, units: 240 },
  { date: "2024-05-13", sunlight: 197, units: 160 },
  { date: "2024-05-14", sunlight: 448, units: 490 },
  { date: "2024-05-15", sunlight: 473, units: 380 },
  { date: "2024-05-16", sunlight: 338, units: 400 },
  { date: "2024-05-17", sunlight: 499, units: 420 },
  { date: "2024-05-18", sunlight: 315, units: 350 },
  { date: "2024-05-19", sunlight: 235, units: 180 },
  { date: "2024-05-20", sunlight: 177, units: 230 },
  { date: "2024-05-21", sunlight: 82, units: 140 },
  { date: "2024-05-22", sunlight: 81, units: 120 },
  { date: "2024-05-23", sunlight: 252, units: 290 },
  { date: "2024-05-24", sunlight: 294, units: 220 },
  { date: "2024-05-25", sunlight: 201, units: 250 },
  { date: "2024-05-26", sunlight: 213, units: 170 },
  { date: "2024-05-27", sunlight: 420, units: 460 },
  { date: "2024-05-28", sunlight: 233, units: 190 },
  { date: "2024-05-29", sunlight: 78, units: 130 },
  { date: "2024-05-30", sunlight: 340, units: 280 },
  { date: "2024-05-31", sunlight: 178, units: 230 },
  { date: "2024-06-01", sunlight: 178, units: 200 },
  { date: "2024-06-02", sunlight: 470, units: 410 },
  { date: "2024-06-03", sunlight: 103, units: 160 },
  { date: "2024-06-04", sunlight: 439, units: 380 },
  { date: "2024-06-05", sunlight: 88, units: 140 },
  { date: "2024-06-06", sunlight: 294, units: 250 },
  { date: "2024-06-07", sunlight: 323, units: 370 },
  { date: "2024-06-08", sunlight: 385, units: 320 },
  { date: "2024-06-09", sunlight: 438, units: 480 },
  { date: "2024-06-10", sunlight: 155, units: 200 },
  { date: "2024-06-11", sunlight: 92, units: 150 },
  { date: "2024-06-12", sunlight: 492, units: 420 },
  { date: "2024-06-13", sunlight: 81, units: 130 },
  { date: "2024-06-14", sunlight: 426, units: 380 },
  { date: "2024-06-15", sunlight: 307, units: 350 },
  { date: "2024-06-16", sunlight: 371, units: 310 },
  { date: "2024-06-17", sunlight: 475, units: 520 },
  { date: "2024-06-18", sunlight: 107, units: 170 },
  { date: "2024-06-19", sunlight: 341, units: 290 },
  { date: "2024-06-20", sunlight: 408, units: 450 },
  { date: "2024-06-21", sunlight: 169, units: 210 },
  { date: "2024-06-22", sunlight: 317, units: 270 },
  { date: "2024-06-23", sunlight: 480, units: 530 },
  { date: "2024-06-24", sunlight: 132, units: 180 },
  { date: "2024-06-25", sunlight: 141, units: 190 },
  { date: "2024-06-26", sunlight: 434, units: 380 },
  { date: "2024-06-27", sunlight: 448, units: 490 },
  { date: "2024-06-28", sunlight: 149, units: 200 },
  { date: "2024-06-29", sunlight: 103, units: 160 },
  { date: "2024-06-30", sunlight: 446, units: 400 },
]

const chartConfig = {
  views: {
    label: "Units saved",
  },
  sunlight: {
    label: "Sunlight",
    color: "hsl(var(--chart-1))",
  },
  units: {
    label: "Units",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Barchart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sunlight")

  const total = React.useMemo(
    () => ({
      sunlight: chartData.reduce((acc, curr) => acc + curr.sunlight, 0),
      units: chartData.reduce((acc, curr) => acc + curr.units, 0),
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Energy Savings</CardTitle>
          <CardDescription>
            Energy savings for last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["sunlight", "units"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
