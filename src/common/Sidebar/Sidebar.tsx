"use client"
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Image, UnstyledButton, Transition, Paper, Overlay, Collapse } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react' // Import for the arrow

// Icon Imports
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
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (value: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // State to manage the Chat submenu toggle
  const [chatOpened, setChatOpened] = useState(false)

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: IconlyCategory, path: '/dashboard' },
    { key: 'orders', label: 'Orders', icon: IconlyBag, path: '/orders' },
    { key: 'comments', label: 'Comments', icon: IconlyEdit, path: '/comments' },
    { key: 'fare-charges', label: 'Fare & Charges', icon: IconlySwap, path: '/fare-charges' },
    { key: 'daily-report', label: 'Daily Report', icon: IconlyActivity, path: '/daily-report' },
    { key: 'inventory', label: 'Inventory', icon: IconlyFolder, path: '/inventory' },
    {
      key: 'chat',
      label: 'Chat',
      icon: IconlyChat,
      path: '/chat',
      // Submenu data
      children: [
        { label: 'Chat Dashboard', path: '/chat' },
        { label: 'Inbox', path: '/chat/inbox' },
      ]
    },
    { key: 'web-builder', label: 'Web Builder', icon: IconlyDiscovery, path: '/web-builder' },
    { key: 'settings', label: 'Settings', icon: IconlySetting, path: '/settings' },
  ]

  useEffect(() => setIsClient(true), [])

  // Auto-open submenu if current path is a chat sub-route
  useEffect(() => {
    if (pathname.startsWith('/chat')) {
      setChatOpened(true)
    }
  }, [pathname])

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

  const NavItem = ({ item }: { item: any }) => {
    const { icon: Icon, label, path, children } = item
    const showFull = !isCollapsed || isMobile
    const isActive = pathname.startsWith(path)
    const hasChildren = !!children

    return (
      <div className="flex flex-col">
        <UnstyledButton
          onClick={() => {
            if (hasChildren && showFull) {
              setChatOpened(!chatOpened)
            } else {
              handleNavigation(path)
            }
          }}
          className={`custom-button ${isActive ? 'active' : ''} ${!showFull ? 'collapsed' : ''}`}
        >
          <div className={`flex items-center w-full ${showFull ? 'gap-3' : 'justify-center'}`}>
            <Icon size={showFull ? 18 : 22} />
            {showFull && (
              <div className="flex justify-between items-center flex-1">
                <span className="text-sm">{label}</span>
                {hasChildren && (
                  <IconChevronDown
                    size={14}
                    style={{
                      transform: chatOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease'
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </UnstyledButton>

        {/* Submenu Logic */}
        {hasChildren && showFull && (
          <Collapse in={chatOpened}>
            <div className="flex flex-col ml-9 mt-1 space-y-1 border-l border-gray-100">
              {children.map((child: any) => (
                <UnstyledButton
                  key={child.path}
                  onClick={() => handleNavigation(child.path)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '13px',
                    borderRadius: '6px',
                    backgroundColor: pathname === child.path ? '#E6F1F0' : 'transparent',
                    color: pathname === child.path ? '#007AFF' : '#666666',
                    fontWeight: pathname === child.path ? 600 : 400,
                  }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {child.label}
                </UnstyledButton>
              ))}
            </div>
          </Collapse>
        )}
      </div>
    )
  }

  if (!isClient) return null

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
          <NavItem key={item.key} item={item} />
        ))}
      </div>

      <div className="px-3 flex flex-col gap-1 mt-auto pb-4">
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

      {isMobile && isMobileMenuOpen && (
        <Overlay color="#000" opacity={0.4} zIndex={1000} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside
        style={{ transition: 'width 0.3s ease' }}
        className={`${isCollapsed ? 'w-24' : 'w-72'} h-screen bg-white py-4 hidden md:flex flex-col border-r border-gray-100 sticky top-0`}
      >
        {sidebarInnerContent}
      </aside>
    </>
  )
}