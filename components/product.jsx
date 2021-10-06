import React, { useState } from 'react'
import Link from 'next/link'
import { commerce } from '../lib/commerce'
import { useCartDispatch } from '../context/cart'

import { 
    useToast, 
    Box, 
    IconButton, 
    Image, 
    Badge, 
    AspectRatio, 
    Flex, 
    Icon,
    useColorModeValue  
} from '@chakra-ui/react'

import { IoBagAddSharp } from 'react-icons/io5'

export default function Product ( { prod } ) {

    const toast = useToast()

    const { setCart } = useCartDispatch()
    const [ addToCartButtonIsLoading, setAddToCartButtonIsLoading ] = useState(false)

    const addProductToCart = async () => {

        setAddToCartButtonIsLoading(true)
        await commerce.cart.add(prod.id, 1).then(({cart}) => {
            setAddToCartButtonIsLoading(false)
            setCart(cart)
            toast({
                title: "Proizvod dodat u korpu.",
                description: "Uspešno ste dodali proizvod u korpu.",
                status: "success",
                duration: 9000,
                isClosable: true
            })
        })
    }

    return (

        <>
            <Box 
                w={['calc(50% - 10px)', 'calc(33% - 10px)', 'calc(20% - 10px)']} 
                m='5px' 
                 
                borderRadius="lg" 
                overflow="hidden"
                boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
            >
                <Link href={`product/${prod.permalink}`}>
                    <a>
                        <AspectRatio
                            overflow='hidden'
                            role="group" 
                            ratio={1 / 1}
                            w='100%'
                        >
                            <Image 
                                src={prod.media.source} 
                                alt={prod.name} 
                                objectFit="cover" 
                                w='100%'
                                _groupHover={{ transform: 'scale(1.2)' }} 
                                transition= ' .2s ease-in-out '
                            />
                        </AspectRatio>
                    </a>
                </Link>
                        <Box 
                            p={4}
                            bgColor={useColorModeValue( 'whiteAlpha.900', 'whiteAlpha.200' )}
                            backdropFilter='blur(6px)'
                        >
                            <Box d="flex" flexWrap='wrap' alignItems="baseline" mb='3'>
                                {
                                    prod.categories ? prod.categories.map( (cat, index) => <Badge key={index} mr='2px' mt='2px' borderRadius="full" px="2" colorScheme="teal">{cat.name.toLowerCase()}</Badge> ) : ''
                                }
                            </Box>
                            <Flex
                                justify='space-between'
                                align='center'
                            >
                                <Box>
                                    <Box
                                        mt="1"
                                        fontWeight="semibold"
                                        as="h4"
                                        lineHeight="tight"
                                        isTruncated
                                    >
                                        {prod.name}
                                    </Box>

                                    <Box>
                                        {prod.price.formatted_with_code}
                                    </Box>
                                </Box>

                                <IconButton
                                    borderRadius='full'
                                    colorScheme="teal"
                                    variant='solid'
                                    aria-label="Add product to cart"
                                    size="sm"
                                    icon={<Icon w={5} h={5} as={IoBagAddSharp}/>}
                                    onClick={addProductToCart}
                                    isLoading={addToCartButtonIsLoading}
                                />

                            </Flex>

                        </Box>
            </Box>

        </>
    )
}