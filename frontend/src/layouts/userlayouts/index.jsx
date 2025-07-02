import Navbar from '@/components/navbar'
import React from 'react'

export default function Userlayout({children}) {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}
