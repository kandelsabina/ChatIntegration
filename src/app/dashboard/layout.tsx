"use client"

import { useState } from "react"
import { AppShell } from "@mantine/core"
import { Sidebar } from "@/common/Sidebar/Sidebar"
import { Navbar } from "@/common/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  // 1. Create the state for the mobile drawer
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <AppShell
      padding={0}
      styles={{
        main: {
          height: "100vh",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex h-screen w-full">
        {/* 2. Pass mobile props to Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          
          {/* 3. Pass setIsMobileMenuOpen to Navbar */}
          <Navbar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />

          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {children}
          </main>
          
        </div>
      </div>
    </AppShell>
  )
}