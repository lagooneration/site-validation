"use client"
import React from 'react'
import { useActiveComponent } from '@/hooks/useActiveComponent'
import ShadowAnalysis from '@/components/pages/ShadowAnalysis'
import PropertyDetails from '@/components/pages/PropertyDetails'
import { Documentation } from '@/components/pages/Documentation'
import Settings from '@/components/pages/Settings'
import Help from '@/components/pages/Help'
import { Dashboard } from './Dashboard'


const componentMap = {
  ShadowAnalysis,
  PropertyDetails,
  Documentation,
  Dashboard,
  Settings,
  Help,
}
  






  export const Home = () => {
  
  const { activeComponent } = useActiveComponent()
  const ActiveComponent = componentMap[activeComponent as keyof typeof componentMap]
 

  return (
    <main className="flex-1 overflow-auto p-6 mt-12 ml-14">
    <div>
      {ActiveComponent ? <ActiveComponent /> : <Dashboard />}
    </div>
    </main>
  );
};

// export default Home;
