"use client"
import React from 'react'
import { Button, Title, Text, Stack, Group, Center, Box } from '@mantine/core'
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react'

export default function ChatPage() {
  return (
    <Box h="100%" w="100%" px="md">
      <Center h="100%">
        <Stack align="center" gap="xs" style={{ textAlign: 'center' }}>
          
          <Title 
            order={1} 
            fw={700} 
            style={{ 
              fontSize: 'clamp(24px, 5vw, 32px)',
              lineHeight: 1.2 
            }}
          >
            Connect Your Social Media
          </Title>
          
          <Text 
            c="dimmed" 
            mb="lg" 
            size="sm"
            style={{ maxWidth: '400px' }}
          >
            Integrate your social media accounts to streamline your marketing efforts
          </Text>
     
          <Group 
            gap="md" 
            justify="center"
            className="chat-button-container"
          >
            <Button 
              variant="outline" 
              leftSection={<IconBrandFacebook size={18} color="#1877F2" />}
              radius="md"
              color="gray"
              className="responsive-btn"
            >
              Connect Facebook Page
            </Button>
            
            <Button 
              variant="outline" 
              leftSection={<IconBrandInstagram size={18} color="#E4405F" />}
              radius="md"
              color="gray"
              className="responsive-btn"
            >
              Connect Instagram Account
            </Button>
          </Group>
        </Stack>
      </Center>

      <style jsx global>{`
        /* Desktop: buttons sit side by side */
        .chat-button-container {
          display: flex;
          flex-direction: row;
        }

        /* Mobile: buttons stack and take full width */
        @media (max-width: 48em) {
          .chat-button-container {
            flex-direction: column !important;
            width: 100%;
          }
          .responsive-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </Box>
  )
}