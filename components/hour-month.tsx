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
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';



const calculateTiltAngle = (latitude: number): number => {
  // Simplified formula for tilt angle
  return Math.abs(latitude) * 0.76 + 3.1;
};

const calculateAzimuthAngle = (longitude: number): number => {
  // Simplified formula for azimuth angle
  return (longitude + 180) % 360;
};

const fetchPVWattsData = async (tilt: number, azimuth: number, latitude: number, longitude: number, capacity: number) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_PVWATTS_API_KEY;
    if (!apiKey) {
      throw new Error('PVWATTS_API_KEY is not defined in .env.local');
    }
    const url = `https://developer.nrel.gov/api/pvwatts/v8.json?api_key=${apiKey}&system_capacity=${capacity}&module_type=0&losses=14&array_type=1&tilt=${tilt}&azimuth=${azimuth}&lat=${latitude}&lon=${longitude}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

export const description = "An area chart with gradient fill"



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

export const HourMonth = () => {

  const searchParams = useSearchParams()

  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const capacity = searchParams.get("capacity");

  const [tiltAngle, setTiltAngle] = useState<number | null>(null);
  const [azimuthAngle, setAzimuthAngle] = useState<number | null>(null);
  const [pvWattsData, setPvWattsData] = useState<any | null>(null);

  useEffect(() => {
    if (latitude && longitude && capacity) {
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const cap = parseFloat(capacity);
      const tilt = calculateTiltAngle(lat);
      const azimuth = calculateAzimuthAngle(lon);
      setTiltAngle(tilt);
      setAzimuthAngle(azimuth);
      console.table({tilt, azimuth, lat, lon, cap})
      
      fetchPVWattsData(tilt, azimuth, lat, lon, cap)
        .then(data => setPvWattsData(data))
        .catch(error => console.error('Error fetching PVWatts data:', error));
    }
  }, [latitude, longitude, capacity]);


  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (pvWattsData && pvWattsData.outputs && pvWattsData.station_info) {
      const { solrad_monthly, solrad_annual } = pvWattsData.outputs;
      // const { location, state, country } = pvWattsData.station_info;

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      const newChartData = solrad_monthly.map((value: number, index: number) => ({
        month: monthNames[index],
        monthly: value,
        annual: solrad_annual
      }));
      
      setChartData(newChartData);
    }
  }, [pvWattsData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solar Radiation</CardTitle>
        <CardDescription>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {pvWattsData?.outputs?.solrad_annual.toFixed(2)} kWh/m²/day (Annual Average) <TrendingUp className="h-4 w-4" />
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
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillMonthly" x1="0" y1="0" x2="0" y2="1">
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
            </defs>
            <Area
              dataKey="monthly"
              type="monotone"
              fill="url(#fillMonthly)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              name="Monthly Solar Radiation"
            />
            <Area
              dataKey="annual"
              type="monotone"
              fill="url(#fillAnnual)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              name="Annual Solar Radiation"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-muted-foreground">
          {pvWattsData?.station_info?.location}
          <br />
          {pvWattsData?.station_info?.state}, {pvWattsData?.station_info?.country}
        </div>
      </CardFooter>
    </Card>
  )
}