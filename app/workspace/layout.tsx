import React from 'react'
import { Sidebar } from '@/components/workspace/Sidebar'
import Header from '@/components/workspace/Header'
import { Dashboard } from '@/components/workspace/Dashboard'


export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* <main className="flex-1 overflow-auto p-6">{children}</main> */}
        <Dashboard />

      </div>
    </div>
  )
}