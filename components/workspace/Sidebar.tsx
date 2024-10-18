"use client"
import React from 'react'
import { useActiveComponent } from '@/hooks/useActiveComponent'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sunset, LandPlot, Book, Settings2, Info } from 'lucide-react'
import Image from 'next/image'

export const Sidebar = () => {
    const { setActiveComponent, activeComponent } = useActiveComponent()
  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
      <div className="border-b p-2">
      <Button variant="outline" size="icon" aria-label="Home">
            <Image
              src="/logoOff.svg"
              alt="Logo"
              width={24}
              height={24}
              priority
            />

          </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {/* Shadow Analysis Button */}
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${
                activeComponent === 'ShadowAnalysis' ? 'bg-muted text-accent-foreground' : 'bg-background'
              }`}
              aria-label="Shadow Analysis"
              onClick={() => setActiveComponent('ShadowAnalysis')}
            >
              <Sunset className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Shadow Analysis
          </TooltipContent>
        </Tooltip>
        {/* Property Details Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${
                activeComponent === 'PropertyDetails' ? 'bg-muted text-accent-foreground' : 'bg-background'
              }`}
              aria-label="Property details"
              onClick={() => setActiveComponent('PropertyDetails')}
            >
              <LandPlot className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Property details
          </TooltipContent>
        </Tooltip>
        {/* Documentation Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${
                activeComponent === 'Documentation' ? 'bg-muted text-accent-foreground' : 'bg-background'
              }`}
              aria-label="Documentation"
              onClick={() => setActiveComponent('Documentation')}
            >
              <Book className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Documentation
          </TooltipContent>
        </Tooltip>
        {/* Settings Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${
                activeComponent === 'Settings' ? 'bg-muted text-accent-foreground' : 'bg-background'
              }`}
              aria-label="Settings"
              onClick={() => setActiveComponent('Settings')}
            >
              <Settings2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        {/* Help Button */}
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
              onClick={() => setActiveComponent('Help')}
            >
              <Info className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}