"use client"

import { Sidebar } from '@/common/Sidebar/Sidebar'
import { Flex, Box } from '@mantine/core'
import { useState } from 'react'
import { Navbar } from '@/common/navbar'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    
    <Box h="100vh" w="100vw" style={{ overflow: 'hidden' }}>
      
      <Flex h="100vh" w="100%">
      
        <Sidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        {/* Right Side: Column Flex for Navbar (Top) and Content (Bottom) */}
        <Box 
          style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh',
            overflow: 'hidden' 
          }}
        >
          {/* Navbar sits inside the right-hand column */}
          <Navbar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
          />
          
          {/* Scrollable Main Content Area */}
          <Box 
            component="main" 
            style={{ 
              flex: 1, 
              backgroundColor: '#f8f9fa', 
              overflowY: 'auto',
              padding: '1rem' 
            }}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}