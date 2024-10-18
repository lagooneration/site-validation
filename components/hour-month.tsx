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
  { month: "January", sunlight: 186, units: 80 },
  { month: "February", sunlight: 305, units: 200 },
  { month: "March", sunlight: 237, units: 120 },
  { month: "April", sunlight: 73, units: 190 },
  { month: "May", sunlight: 209, units: 130 },
  { month: "June", sunlight: 214, units: 140 },
  { month: "July", sunlight: 214, units: 140 },
  { month: "August", sunlight: 214, units: 140 },
  { month: "September", sunlight: 214, units: 140 },
  { month: "October", sunlight: 214, units: 140 },
  { month: "November", sunlight: 214, units: 140 },
  { month: "December", sunlight: 214, units: 140 },
]

const chartConfig = {
  desktop: {
    label: "Sunlight",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Units",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function HourMonth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sunlight Coverage</CardTitle>
        <CardDescription>
          Yearly sunlight hours 
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
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              4.2 units per day <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2023
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}