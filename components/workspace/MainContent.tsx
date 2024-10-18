"use client"
import React from 'react'
import { useActiveComponent } from '@/hooks/useActiveComponent'
import ShadowAnalysis from '@/components/pages/ShadowAnalysis'
import PropertyDetails from '@/components/pages/PropertyDetails'
import Documentation from '@/components/pages/Documentation'
import Settings from '@/components/pages/Settings'
import Help from '@/components/pages/Help'
// import Account from '@/components/pages/Account'
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { useSearchParams } from "next/navigation"

const componentMap = {
  ShadowAnalysis,
  PropertyDetails,
  Documentation,
  Settings,
  Help,
}

export const MainContent = () => {
  const { activeComponent } = useActiveComponent()
  const ActiveComponent = componentMap[activeComponent as keyof typeof componentMap]

  // const searchParams = useSearchParams()

  // const latitude = searchParams.get("latitude")
  // const longitude = searchParams.get("longitude")
  // const propertyName = searchParams.get("propertyName")
  // const screenshot = searchParams.get("screenshot")


  return (
    <main className="flex-1 overflow-auto p-6">
      {ActiveComponent ? <ActiveComponent /> : <div>Select a component from the sidebar</div>}

      
    </main>
  )
}