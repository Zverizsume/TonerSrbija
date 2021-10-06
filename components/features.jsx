import React from 'react'

import { 
    Box, 
    Grid, 
    GridItem, 
    Text, 
    VStack, 
    Image, 
    Container, 
    Flex,
    useColorModeValue
} from '@chakra-ui/react'

export default function Features () {
    return (
        <Box
            as='section'
            w='100%'
            minH='600px'
        >
            <Flex
                width='100%'
                position='absolute'
                zIndex='-1'
                h='100%'
                justify='center'
            >
                <Image w='1200px' src='./stain.svg' />
            </Flex>
            <Container
                maxW='8xl'
            >
                <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={8}
                >
                    <GridItem
                        p={6}
                        boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                        borderRadius='lg'
                        bgColor={useColorModeValue('whiteAlpha.900' , 'whiteAlpha.300' )}
                        backdropFilter='blur(6px)'
                    >
                        <VStack
                            flexDir='column'
                            spacing={5}
                        >
                            <Box
                                bgColor='rgba(0,0,0,.4)'
                                p='30px'
                                borderRadius='full'
                            >
                                <Image
                                    src='./features/quality.svg' 
                                    boxSize='100px'
                                    fill='red'
                                />
                            </Box>
                            <Text
                                align='center'
                                fontSize='20px'
                                fontWeight='700'
                            >
                                - Vrhunski kvalitet -
                            </Text>
                            <Text
                                align='center'
                                fontSize='15px'
                                maxW='250px'
                                fontWeight='500'
                                color='whiteAlpha.700'
                            >
                                Svi proizvodi su novi, ne korisceni, sa garancijom.
                            </Text>
                        </VStack>
                    </GridItem>
                    <GridItem
                        p={6}
                        boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                        borderRadius='lg'
                        bgColor={useColorModeValue('whiteAlpha.900' , 'whiteAlpha.300' )}
                        backdropFilter='blur(6px)'
                    >
                    <VStack
                            flexDir='column'
                            spacing={5}
                        >
                            <Box
                                bgColor='rgba(0,0,0,.4)'
                                p='30px'
                                borderRadius='full'
                            >
                                <Image
                                    src='./features/products.svg'
                                    boxSize='100px'
                                />
                            </Box>
                            <Text
                                align='center'
                                fontSize='20px'
                                fontWeight='700'
                            >
                                - Širok asortiman -
                            </Text>
                            <Text
                                align='center'
                                fontSize='15px'
                                maxW='250px'
                                fontWeight='500'
                                color='whiteAlpha.700'
                            >
                                Bla
                            </Text>
                        </VStack>
                    </GridItem>
                    <GridItem
                        p={6}
                        boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                        borderRadius='lg'
                        bgColor={useColorModeValue('whiteAlpha.900' , 'whiteAlpha.300' )}
                        backdropFilter='blur(6px)'                    
                    >
                    <VStack
                            flexDir='column'
                            spacing={5}
                        >
                            <Box
                                bgColor='rgba(0,0,0,.4)'
                                p='30px'
                                borderRadius='full'
                            >
                                <Image
                                    src='./features/competition.svg'
                                    boxSize='100px'
                                />
                            </Box>
                            <Text
                                align='center'
                                fontSize='20px'
                                fontWeight='700'
                            >
                                - Konkurentne cene -
                            </Text>
                            <Text
                                align='center'
                                fontSize='15px'
                                maxW='250px'
                                fontWeight='500'
                                color='whiteAlpha.700'
                            >
                                Bla
                            </Text>
                        </VStack>
                    </GridItem>
                    <GridItem
                        p={6}
                        boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                        borderRadius='lg'
                        bgColor={useColorModeValue('whiteAlpha.900' , 'whiteAlpha.300' )}
                        backdropFilter='blur(6px)'                    
                    >
                    <VStack
                            flexDir='column'
                            spacing={5}
                        >
                            <Box
                                bgColor='rgba(0,0,0,.4)'
                                p='30px'
                                borderRadius='full'
                            >
                                <Image
                                    src='./features/fast-delivery.svg'
                                    boxSize='100px'
                                />
                            </Box>
                            <Text
                                align='center'
                                fontSize='20px'
                                fontWeight='700'
                            >
                                - Brza dostava -
                            </Text>
                            <Text
                                align='center'
                                fontSize='15px'
                                maxW='250px'
                                fontWeight='500'
                                color='whiteAlpha.700'
                            >
                                Sve vaše narudžbine će biti dostavljene na željenu adresu u najkraćem mogućem roku. Najkasnije u roku od 48h
                            </Text>
                        </VStack>
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    )
}