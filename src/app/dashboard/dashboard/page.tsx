"use client"

import { Title, Card, SimpleGrid } from "@mantine/core"

export default function DashboardPage() {
  return (
    <div>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
        <Card shadow="sm" padding="lg">
          Orders
        </Card>
        <Card shadow="sm" padding="lg">
          Revenue
        </Card>
        <Card shadow="sm" padding="lg">
          Customers
        </Card>
      </SimpleGrid>
    </div>
  )
}
