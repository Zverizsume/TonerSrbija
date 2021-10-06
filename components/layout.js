import React from 'react'
import MetaTags from './metaTags'
import { Box } from '@chakra-ui/react'
import Footer from './footer'
import Navbar from './navbar'

export default function Layout ({ children, pageData }) {
    return (
        <>
            <MetaTags pageData = { pageData } />
            
            <main>
                <Navbar />
                <Box 
                    d='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    flexDir='column' 
                    minH='calc(100vh - 40px - 2.5rem)'  
                    pb='40px'
                >                  
                            {children}
                </Box>
                <Footer />
            </main>
        </>
    )
}