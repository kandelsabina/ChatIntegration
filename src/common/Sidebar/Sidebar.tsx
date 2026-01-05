"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppShell, Image, UnstyledButton, Transition, Paper, Overlay } from '@mantine/core'
import { IconlyFolder } from '@/styles/icons/folderIcon'
import { IconlyActivity } from '@/styles/icons/activityIcon'
import { IconlyPaperPlus } from '@/styles/icons/paperPlus'
import { IconlyDiscovery } from '@/styles/icons/discoveryIcon'
import { IconlyChat } from '@/styles/icons/chatIcon'
import { IconlySetting } from '@/styles/icons/settingsIcon'
import { IconlySwap } from '@/styles/icons/swapIcon'
import { IconlyLogout } from '@/styles/icons/logoutIcon'
import { IconlyCategory } from '@/styles/icons/dashboardIcon'
import { IconlyBag } from '@/styles/icons/bagIcon'
import { IconlyEdit } from '@/styles/icons/editIcon'

import './Sidebar.css'

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isMobileMenuOpen: boolean // Added prop
  setIsMobileMenuOpen: (value: boolean) => void // Added prop
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: IconlyCategory, path: '/dashboard' },
    { key: 'orders', label: 'Orders', icon: IconlyBag, path: '/orders' },
    { key: 'comments', label: 'Comments', icon: IconlyEdit, path: '/comments' },
    { key: 'fare-charges', label: 'Fare & Charges', icon: IconlySwap, path: '/fare-charges' },
    { key: 'daily-report', label: 'Daily Report', icon: IconlyActivity, path: '/daily-report' },
    { key: 'inventory', label: 'Inventory', icon: IconlyFolder, path: '/inventory' }, 
    { key: 'chat', label: 'Chat', icon: IconlyChat, path: '/chat' },
    { key: 'web-builder', label: 'Web Builder', icon: IconlyDiscovery, path: '/web-builder' },
    { key: 'settings', label: 'Settings', icon: IconlySetting, path: '/settings' },
  ]

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    if (!isClient) return
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setIsMobileMenuOpen(false)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isClient, setIsMobileMenuOpen])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  useEffect(() => setIsMobileMenuOpen(false), [pathname, setIsMobileMenuOpen])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const NavItem = ({ icon: Icon, label, path, isActive }: any) => {
    const showFull = !isCollapsed || isMobile
    return (
      <UnstyledButton
        onClick={() => handleNavigation(path)}
        className={`custom-button ${isActive ? 'active' : ''} ${!showFull ? 'collapsed' : ''}`}
      >
        <div className={`flex items-center ${showFull ? 'gap-3' : 'justify-center'}`}>
          <Icon size={showFull ? 18 : 22} />
          {showFull && <span className="text-sm">{label}</span>}
        </div>
      </UnstyledButton>
    )
  }

  if (!isClient) return null

  const activeItem = navigationItems.find(i => pathname.startsWith(i.path))?.key || 'dashboard'

  // Refactored the core content into a reusable fragment
  const sidebarInnerContent = (
    <>
      <div className="flex justify-center mb-4 cursor-pointer" onClick={() => handleNavigation('/chat')}>
        <Image
          src={!isMobile && isCollapsed ? '/collapsedLogo.png' : '/logo.png'}
          alt="Elites Logo"
          h={40}
          fit="contain"
        />
      </div>

      <div className="flex-1 px-3 space-y-1">
        {navigationItems.map(item => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={activeItem === item.key}
          />
        ))}
      </div>

     <div className="px-3 flex flex-col gap-1">
  <UnstyledButton
    onClick={() => handleNavigation('/inventory/purchaseOrders')}
    className={`custom-bottom-button create-order-btn ${!(!isCollapsed || isMobile) ? 'collapsed' : ''}`}
  >
    <div className={`flex items-center ${!isCollapsed || isMobile ? 'gap-2' : 'justify-center'}`}>
      <IconlyPaperPlus size={!isCollapsed || isMobile ? 18 : 22} />
      {(!isCollapsed || isMobile) && <span>Create Order</span>}
    </div>
  </UnstyledButton>

  <UnstyledButton
    onClick={() => router.push('/login')}
    className={`custom-bottom-button logout-btn ${!(!isCollapsed || isMobile) ? 'collapsed' : ''}`}
  >
    <div className={`flex items-center ${!isCollapsed || isMobile ? 'gap-2' : 'justify-center'}`}>
      <IconlyLogout size={!isCollapsed || isMobile ? 18 : 22} />
      {(!isCollapsed || isMobile) && <span>Logout</span>}
    </div>
  </UnstyledButton>
</div>

    </>
  )

  return (
    <>
      {/* MOBILE DRAWER VIEW */}
      <Transition mounted={isMobile && isMobileMenuOpen} transition="slide-right" duration={300}>
        {(styles) => (
          <Paper 
            style={{ ...styles, position: 'fixed', top: 0, left: 0, zIndex: 1001, height: '100vh', width: '280px' }} 
            p="md" 
            className="flex flex-col bg-white"
          >
            {sidebarInnerContent}
          </Paper>
        )}
      </Transition>

      {/* MOBILE DIMMER OVERLAY */}
      {isMobile && isMobileMenuOpen && (
        <Overlay color="#000" opacity={0.4} zIndex={1000} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* DESKTOP SIDEBAR VIEW */}
      <aside
        style={{ transition: 'width 0.3s ease' }}
        className={`${isCollapsed ? 'w-24' : 'w-72'} h-screen bg-white py-4 hidden md:flex flex-col border-r border-gray-100`}
      >
        {sidebarInnerContent}
      </aside>
    </>
  )
}