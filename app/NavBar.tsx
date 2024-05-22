'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {

    const currentPath = usePathname()
    const { status, data: session } = useSession();
    const links = [
        {label:"Dashboard",href:"/"},
        {label:"issues",href:"/issues/list"}
    ]
  return (
    <div className='border-b mb-5 px-5 py-3 '>
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href="/"><FaBug/></Link>
                    <ul className='flex gap-10 font-bold' >
                        {links.map(link =>
                            <li key={link.href} >
                                <Link
                                    className={classNames({
                                        'text-purple-600': link.href === currentPath,
                                        'text-zinc-500': link.href !== currentPath,
                                        'hover:text-zinc-800 transition-colors' : true
                                    })}
                                    href={link.href}>{link.label}
                                </Link>
                            </li>
                        )}
                    </ul>
                </Flex>
                <Box>
                    { status === "authenticated" && <Link href="/api/auth/signout" className=' font-bold hover:text-purple-800 transition-colors '>Log Out</Link> }
                    { status === "unauthenticated" && <Link href="/api/auth/signin">Log In</Link> }
                </Box>
            </Flex>
        </Container>
    </div>
  )
}

export default NavBar