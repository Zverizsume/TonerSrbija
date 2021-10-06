import React from 'react'

import { AspectRatio, Box, Container, Heading, Flex } from "@chakra-ui/react"

export default function Videos () {
    return (
        <Box 
            as='section'
        >
            <Container maxW='8xl'>
                <Heading
                    as='h3'
                    mb='30px'
                >
                    Korisni video saveti
                </Heading>
                <Flex
                    w='100%'
                    h='100%'
                    align='center'
                >
                    <Flex
                        borderRadius='md'
                        overflow='hidden'
                        width='fit-content'
                        m='5px'
                    >
                        <AspectRatio w='500px' maxW="560px" ratio={16 / 9}>
                            <iframe
                                title="naruto"
                                src="https://www.youtube.com/embed/Sm35_yCU4ks"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </Flex>
                    <Flex
                        borderRadius='md'
                        overflow='hidden'
                        width='fit-content'
                        m='5px'
                    >
                        <AspectRatio w='500px' maxW="560px" ratio={16 / 9}>
                            <iframe
                                title="naruto"
                                src="https://www.youtube.com/embed/F9MITHGpjns"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </Flex>
                    <Flex
                        borderRadius='md'
                        overflow='hidden'
                        width='fit-content'
                        m='5px'
                    >
                        <AspectRatio w='500px' maxW="560px" ratio={16 / 9}>
                            <iframe
                                title="naruto"
                                src="https://www.youtube.com/embed/dv5VCWFPsP4"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}