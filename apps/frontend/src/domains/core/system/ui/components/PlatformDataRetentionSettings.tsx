"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function GlobalDataRetentionSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Retention Settings</CardTitle>
        <CardDescription>
          Manage how long data is retained in your system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Data retention configuration coming soon...
        </p>
      </CardContent>
    </Card>
  )
}
