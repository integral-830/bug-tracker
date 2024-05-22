'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import Link from 'next/link';

const NavBar = () => {

    const currentPath = usePathname()
    const links = [
        {label:"Dashboard",href:"/"},
        {label:"issues",href:"/issues/list"}
    ]
  return (
    <div className='flex gap-10 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><FaBug/></Link>
        <div className='flex gap-10 font-bold' >
            {links.map(link =>
                <Link
                    key={link.href} 
                    className={classNames({
                        'text-purple-600': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors' : true
                    })}
                    href={link.href}>{link.label}
                </Link>
            )}
        </div>
    </div>
  )
}

export default NavBar