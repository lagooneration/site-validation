"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HourMonth } from "./hour-month"
import  Emicalc from "@/components/ui/emicalc"


export function DataCharts() {
  return (
    <Tabs defaultValue="account" className="w-[560px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">🔆Sunlight Hours</TabsTrigger>
        <TabsTrigger value="password">⚡Energy Savings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
            {/* <HourMonth /> */}
      </TabsContent>
      <TabsContent value="password">
        <Emicalc />
      </TabsContent>
    </Tabs>
  )
}
