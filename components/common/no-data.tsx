import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'


export default function NoData() {
  return (
    <div className="flex items-center justify-center">
    <Card className="w-[420px]">
      <CardHeader className="text-center">
        <CardTitle className="lg:text-7xl text-4xl">OPS</CardTitle>
        <CardDescription>
          No data to show
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
  )
}
