"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Sun, Moon, Download, Upload } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useActiveComponent } from "@/hooks/useActiveComponent"
import { Day } from "../ui/day"
import Image from 'next/image'
import { useSearchParams } from 'next/dist/client/components/navigation'


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


export default function Header() {
  const { setTheme } = useTheme()
  const { activeComponent } = useActiveComponent()


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


  const handleSaveScreenshot = () => {
      // Call the exposed screenshot function
      if ((window as any).takeScreenshot) {
          (window as any).takeScreenshot();
      }
  };

  const handleScreenshotData = (dataUrl: string) => {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `shadow-analysis-${new Date().toISOString()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };



  return (
    <div className="flex flex-col absolute top-0 left-[56px] right-0">
     <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">{activeComponent}</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
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
                        {/* <Day />      */}
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
              </form>
            </DrawerContent>
          </Drawer>
          <div className="ml-auto w-full flex justify-end">
          <div className="flex flex-row gap-4">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              id="fileInput"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <Upload className="size-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                System
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <Button
              variant="outline"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
              onClick={handleSaveScreenshot}
          >
              <Download className="size-3.5" />
              Save
          </Button>
    </header>
    </div>
  )
}

