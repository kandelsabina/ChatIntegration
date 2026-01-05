"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, Text, UnstyledButton, Box } from "@mantine/core";
import { IconlyNotification } from "@/styles/icons/notificationIcon";
import { IconDots, IconMenu2 } from "@tabler/icons-react";

interface NavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export function Navbar({ 
  isCollapsed, 
  setIsCollapsed, 
  setIsMobileMenuOpen 
}: NavbarProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [userData, setUserData] = useState<{ username?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user_data");
      if (stored) {
        setUserData(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse user_data:", err);
    }
  }, []);

  const initial =
    userData?.username?.split(" ")[0]?.charAt(0).toUpperCase() || "U";

  return (
    <Box className="h-14 px-2 bg-white flex items-center justify-between sticky top-0 z-[100] border-b border-gray-100">
      <Box className="flex ml-2 md:ml-0 gap-4 items-center">
       
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileMenuOpen(true);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
            
          className="flex p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <IconMenu2 size={20} color="black" />
        </button>
        
        <Text fw={500} fz="lg" className="truncate">
         Chat Platform 
        </Text>
      </Box>

      <Box className="flex justify-center items-center gap-4">
        {/* Desktop City Button */}
        <Box className="hidden md:flex gap-3">
          <Button color="#FEEAAE" style={{ color: "black", fontWeight: "400" }}>
            KTM City
          </Button>
        </Box>

        {/* Notification */}
        <IconlyNotification />

        {/* Desktop Profile */}
        <Box className="hidden md:flex gap-3 items-center">
          <Box
            className="flex justify-center items-center w-8 h-8 font-semibold text-white text-sm"
            style={{ backgroundColor: "#21749e", borderRadius: "50%" }}
          >
            {initial}
          </Box>
        </Box>

        {/* Mobile Dropdown Toggle */}
        <Box
          onClick={() => setIsDropDownOpen((prev) => !prev)}
          className="flex md:hidden justify-center items-center w-6 h-6 transform -rotate-90 cursor-pointer"
        >
          <IconDots color="#21749e" size={20} />
        </Box>
      </Box>

      {/* Mobile Dropdown Menu */}
      {isDropDownOpen && (
        <Box
          className="w-40 md:hidden flex absolute right-5 top-12 z-50 shadow-md border border-gray-100 rounded-md"
          style={{ backgroundColor: "white" }}
        >
          <Box className="flex flex-col gap-2 p-3">
            <UnstyledButton className="text-sm py-1">KTM City</UnstyledButton>
            <UnstyledButton className="text-sm py-1 border-t border-gray-50 pt-2">Profile</UnstyledButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}