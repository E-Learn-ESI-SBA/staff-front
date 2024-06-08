import React, {SVGAttributes} from 'react'
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

 const GalleryHorizontalEndIcon : React.FC<SVGAttributes<{}>> =  (props)  => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 7v10" />
            <path d="M6 5v14" />
            <rect width="12" height="18" x="10" y="3" rx="2" />
        </svg>
    )
}