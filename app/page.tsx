"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function Home() {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    propertyName: "",
    capacity: ""
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const queryParams = new URLSearchParams(formData).toString()
    router.push(`/workspace?${queryParams}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen"
    style={{
      backgroundImage: "url('/assets/intro.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw',
      filter: 'brightness(80%)',
    }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-90" >
      <div className="flex justify-center items-center min-h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Shadow Analysis</CardTitle>
        <CardDescription>
          Enter details of your property
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input id="latitude" placeholder="40.7128" required onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input id="longitude" placeholder="-74.0060" required onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="capacity">Panel Capacity (kW)</Label>
              <Input id="capacity" placeholder="10" required onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input
              id="propertyName"
              type="text"
              placeholder="My House"
              required
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="screenshot">Upload Screenshot</Label>
            <input id="screenshot" type="file" accept="image/*" required onChange={handleInputChange}
            className="block w-full text-sm text-gray-500
                  file:me-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  file:disabled:opacity-50 file:disabled:pointer-events-none
                  dark:text-neutral-500
                  dark:file:bg-blue-900
                  dark:hover:file:bg-blue-600
                "/>
          </div> */}
          <Button type="submit" className="w-full">
            Get Started
          </Button>
          </form>
        <div className="mt-4 text-center text-sm">
          Want to trade your carbons?{" "}
          <Link href="https://www.citizencorrects.com" className="underline text-blue-500">
            Citizen Corrects
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
    </div>
    </div>
  )
}