"use client"
import React, { useEffect, useState } from 'react';
import {
    Area,
    AreaChart,
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



  
  const chartConfig={
    stock: {
        label: "Stock Price",
        color: "hsl(var(--chart-2))",
      },
  }


  export const StockApi = () => {
  const [stockData, setStockData] = useState<{
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
    data: Array<{
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }>;
  } | null>(null);

  const [chartData, setChartData] = useState<Array<{
    date: string;
    close: number;
  }>>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const apiKey = process.env.STOCK_API_KEY;
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=534618.BSE&outputsize=compact&apikey=${apiKey}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data)

        if (data["Time Series (Daily)"]) {
          const formattedData = Object.entries(data["Time Series (Daily)"])
            .slice(0, 100) // Get the latest 100 data points
            .map(([date, values]: [string, any]) => ({
              date,
              open: parseFloat(values["1. open"]),
              high: parseFloat(values["2. high"]),
              low: parseFloat(values["3. low"]),
              close: parseFloat(values["4. close"]),
              volume: parseInt(values["6. volume"]),
            }))
            .reverse(); // Reverse to get chronological order

          setStockData({
            symbol: data["Meta Data"]["2. Symbol"],
            lastRefreshed: data["Meta Data"]["3. Last Refreshed"],
            timeZone: data["Meta Data"]["5. Time Zone"],
            data: formattedData,
          });

          setChartData(formattedData.map(item => ({
            date: item.date,
            close: item.close,
          })));
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, []);

 

  return (
      <Card
          className="max-w-lg p-4" x-chunk="charts-01-chunk-7"
        >
          <CardHeader className="space-y-0 pb-2">
          <CardTitle className="flex items-baseline gap-1 text-2xl tabular-nums">
            WAAREE Renewables 
          </CardTitle>
          <CardDescription><span className="text-sm font-normal tracking-normal text-muted-foreground mt-2">
          ₹{stockData?.data[99]?.close.toFixed(2)  || 'Loading...'}
            </span></CardDescription>
        </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={chartConfig}
            >
              <AreaChart
                accessibilityLayer
                data={stockData?.data || []}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <XAxis 
                dataKey="date"
                tickLine={true}
                axisLine={true}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                minTickGap={30}
                />
                <YAxis 
                 hide
                 tickFormatter={(value) => `₹${value.toFixed(2)}`}
                 domain={['dataMin', 'dataMax']}
                 />
                 <defs>
                <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-stock)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-stock)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
                <Area
                  dataKey="close"
                  type="natural"
                  fill="url(#fillStock)"
                  fillOpacity={0.4}
                  stroke="var(--color-stock)"
                />
                <ChartTooltip
                  cursor={{ stroke: 'var(--color-stock)', strokeWidth: 1 }}
                  content={<ChartTooltipContent />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          {stockData?.data[0]?.close}
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
  );
};
