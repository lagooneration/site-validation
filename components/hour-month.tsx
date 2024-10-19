"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart with gradient fill"

const chartData = [
  { month: "January", sunlight: 266, units: 99 },
  { month: "February", sunlight: 275, units: 115 },
  { month: "March", sunlight: 278, units: 120 },
  { month: "April", sunlight: 287, units: 127 },
  { month: "May", sunlight: 299, units: 132 },
  { month: "June", sunlight: 314, units: 140 },
  { month: "July", sunlight: 316, units: 141 },
  { month: "August", sunlight: 311, units: 136 },
  { month: "September", sunlight: 294, units: 122 },
  { month: "October", sunlight: 284, units: 110 },
  { month: "November", sunlight: 272, units: 101 },
  { month: "December", sunlight: 254, units: 96 },
]

const chartConfig = {
  desktop: {
    label: "Sunlight",
    color: "hsl(24, 100%, 59%)",
  },
  mobile: {
    label: "Units",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function HourMonth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunlight Coverage</CardTitle>
        <CardDescription>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              4.2 units per day <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="units"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="sunlight"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}