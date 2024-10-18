'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'


const ShadowAnalysis = () => {

const searchParams = useSearchParams()

  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")
  const propertyName = searchParams.get("propertyName")
  const screenshot = searchParams.get("screenshot")

  return (
    <div className="flex justify-center items-center min-h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <strong>Latitude:</strong> {latitude}
            </div>
            <div>
              <strong>Longitude:</strong> {longitude}
            </div>
            <div>
              <strong>Property Name:</strong> {propertyName}
            </div>
            <div>
              <strong>Screenshot:</strong> {screenshot}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ShadowAnalysis