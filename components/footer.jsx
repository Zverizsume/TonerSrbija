import React from 'react'

import { Box, Text } from '@chakra-ui/react'

export default function Footer () {
    return (
        <Box
            pb={10}
            pt={10}
            bgColor='rgb(55, 60, 70)'
            d='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            as='footer'
            h='40px'
        >
            <Text
                color='whiteAlpha.700'
            >
                © { new Date().getFullYear() } Toner Srbija
            </Text>
        </Box>
    )
}