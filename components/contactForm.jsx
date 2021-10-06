import React from 'react'
import GoogleMapReact from 'google-map-react'
import GMap from './gMap'

import {
    Box, 
    Flex, 
    Image,
    Container,
    Input,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react'

export default function contactForm () {

    const defaultCenter = {
        lat: 59.95,
        lng: 30.33
    }
    const defaultZoom = 11

    return (
        <Box
            as='section'
        >
            <Flex
                width='100%'
                position='absolute'
                zIndex='-1'
                h='100%'
                justify='center'
            >
                <Image w='1600px' src='./stain2.svg' />
            </Flex>
            <Container
                maxW='8xl'
            >
                <Box>
                    <Flex
                        justify='space-around'
                        align='center'
                        flexWrap='wrap'
                    >
                        <Box
                            p='30px'
                            w='100%'
                            maxW='460px'
                            boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                            borderRadius='md'
                            backdropFilter='blur(6px)'
                            bgColor='whiteAlpha.200'
                        >
                            <FormControl
                                pb='20px'
                                maxW='400px'
                            >
                                <FormLabel>Ime i prezime</FormLabel>
                                <Input type='text' placeholder='Ime i prezime' />
                            </FormControl>
                            <FormControl
                                pb='20px'
                                maxW='400px'
                            >
                                <FormLabel>Email</FormLabel>
                                <Input type='email' placeholder='Email' />
                            </FormControl>
                            <FormControl
                                pb='20px'
                                maxW='400px'
                            >
                                <FormLabel>Tema</FormLabel>
                                <Input type='text' placeholder='Tema poruke' />
                            </FormControl>
                            <FormControl
                                maxW='400px'
                            >
                                <FormLabel>Poruka</FormLabel>
                                <Textarea minH='200px' placeholder='Vaša poruka' />
                            </FormControl>
                        </Box>
                        <GMap />
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}