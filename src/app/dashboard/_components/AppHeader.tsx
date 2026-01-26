import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { Sidebar } from 'lucide-react'
import React from 'react'

export const AppHeader = () => {
  return (
    <div className='flex justify-between items-center w-full p-4 shadow-md bg-sidebar '>
        <SidebarTrigger>
            <Sidebar className='cursor-pointer'/>
        </SidebarTrigger>
        <UserButton />
    </div>
  )
}
