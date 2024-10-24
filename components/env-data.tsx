"use client"
import React, { useEffect, useState } from 'react';
import {
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    XAxis,
    YAxis,
  } from "recharts"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
  import { CartesianGrid } from 'recharts';



  const chartConfig = {
    daylight: {
      label: "Daylight",
      color: "hsl(var(--chart-5))",
    },
    sunshine: {
      label: "Sunshine",
      color: "hsl(var(--chart-4))",
    },
    cloud: {
      label: "Cloud",
      color: "hsl(var(--chart-5))",
    },
  }

  export const EnvData = () => {
  const [envData, setEnvData] = useState<{
    temperature: number;
    humidity: number;
    daylight: number[];
    sunshine: number[];
    temp: number[];
    hum: number[];
    cloud: number;
    dates: string[];
  } | null>(null);

  useEffect(() => {
    const fetchEnvData = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=27.103&longitude=78.231&hourly=temperature_2m,relative_humidity_2m,cloud_cover&daily=daylight_duration,sunshine_duration&timezone=auto`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        if (data.daily && data.hourly) {
          setEnvData({
            temperature: data.hourly.temperature_2m[0],
            humidity: data.hourly.relative_humidity_2m[0],
            temp: data.hourly.temperature_2m,
            hum: data.hourly.relative_humidity_2m,
            cloud: data.hourly.cloud_cover[0],
            daylight: data.daily.daylight_duration,
            sunshine: data.daily.sunshine_duration,
            dates: data.daily.time,
          });
        } else {
          console.error("Missing daily or hourly data in the API response");
        }
      } catch (error) {
        console.error("Error fetching environmental data:", error);
      }
    };

    fetchEnvData();
  }, []);

  const chartData = envData?.dates.map((date, index) => ({
    date,
    temperature: envData.temp[index],
    // humidity: envData.hum[index],
  })) || [];

  return (
    <>
    <Card
          className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1"
        >
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription>Temperature</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {envData?.temperature?.toFixed(1) || 'N/A'}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                °C 
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Humidity</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {envData?.humidity?.toFixed(1) || 'N/A'}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                %
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                temperature: {
                  label: "Temperature",
                  color: "hsl(var(--chart-1))",
                },
                humidity: {
                  label: "Humidity",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="w-full"
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10,
                  bottom: 20,
                }}
                data={chartData}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }}
                />
                <Line
                  dataKey="temperature"
                  type="natural"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: "hsl(var(--chart-1))",
                    stroke: "hsl(var(--chart-1))",
                    r: 4,
                  }}
                />
                <Line
                  dataKey="humidity"
                  type="natural"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: "hsl(var(--chart-2))",
                    stroke: "hsl(var(--chart-2))",
                    r: 4,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card
          className="max-w-lg" x-chunk="charts-01-chunk-5"
        >
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Sunlight</div>
                <div className="flex items-baseline gap-1 text-xl text-pink-500 font-bold tabular-nums leading-none">
                {envData?.daylight?.[0] ? (envData.daylight[0] / 3600).toFixed(1) : 'N/A'}
                  <span className="text-sm font-normal text-pink-300">
                    hours
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Sunshine</div>
                <div className="flex items-baseline gap-1 text-xl text-fuchsia-400 font-bold tabular-nums leading-none">
                {envData?.sunshine?.[0] ? (envData.sunshine[0] / 3600).toFixed(1) : 'N/A'}
                  <span className="text-sm font-normal text-fuchsia-300">
                  hours
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Cloud</div>
                <div className="flex items-baseline gap-1 text-xl text-indigo-400 font-bold tabular-nums leading-none">
                {envData?.cloud?.toFixed(1) || 'N/A'}
                  <span className="text-sm font-normal text-indigo-300">
                    %
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={[
                  {
                    activity: "Daylight",
                    value: envData?.daylight?.[0] ? parseFloat((envData.daylight[0] / 3600).toFixed(1)) : 0,
                    fill: "var(--color-daylight)",
                  },
                  {
                    activity: "Sunshine",
                    value: envData?.sunshine?.[0] ? parseFloat((envData.sunshine[0] / 3600).toFixed(1)) : 0,
                    fill: "var(--color-sunshine)",
                  },
                ]}
                innerRadius="20%"
                barSize={16}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 24]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        </>
  );
};
