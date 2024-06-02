"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'



const Sidebar = () => {
    
    const path = usePathname();
    
    const navLinks = [
        {
            id: 1, 
            name: "Gallery", 
            link: "/dashboard"
        },
        {
            id: 2, 
            name: "Appraise", 
            link: "/dashboard/appraise"
        }
    ]

    console.log(path)
    
    
    return (
        <div className='fixed z-10 w-full bottom-0 lg:relative lg:w-[350px] lg:h-full lg:min-h-screen lg:border-r border-black/40 dark:border-white/40 flex items-center px-5'> 
            <h2 className='max-lg:hidden lg:absolute left-5 top-14 text-4xl font-semibold'>
                Dashboard
            </h2>

            <ul className='max-lg:flex-center-between max-lg:text-center py-4 border-t-4 md:py-8 md:border-t-8 lg:border-t-0  *:md:text-2xl *:font-semibold lg:flex lg:flex-col lg:gap-8 w-full'>
                {navLinks.map((link) => (
                    <Link href={link.link} key={link.id} className={`group w-full max-lg:pb-3 ${path === link.link ? 'max-lg:border-b-2 lg:border-r-4 border-white' : ''}`}>
                        <div className='inline'>
                            {link.name}
                        </div>
                        <div className='max-lg:hidden w-0 mt-3 group-hover:w-1/2 h-1 bg-black dark:bg-white duration-300 ease-in-out'></div>
                    </Link>
                ))}
            </ul>

            <div className='flex-center-between w-3/4 max-lg:hidden lg:absolute left-5 bottom-14 text-lg font-semibold text-gray-300'>
                <Link href="/">Home</Link>
                <Link href="/explore">Explore</Link>
            </div>
        </div>
    )
}

export default Sidebar
