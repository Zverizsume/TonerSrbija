import React, { useState } from 'react'
import Link from 'next/link'
import { useDisclosure } from '@chakra-ui/hooks'
import { useCartState } from '../context/cart'
import { useCartDispatch } from '../context/cart'
import { commerce } from '../lib/commerce'

import {
    Icon,
    Flex,
    useToast,
    Text,
    Box,
    IconButton,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack
} from "@chakra-ui/react"

import { RiShoppingCartFill } from 'react-icons/ri'
import { IoTrashBin } from 'react-icons/io5'

export default function NavbarDrawerCart () {

    const toast = useToast()

    const { state } = useCartState()
    const { setCart } = useCartDispatch()

    const [ removeButtonIsLoading, setRemoveButtonIsLoading ] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    const handleRemoveItemFromCart = async ( itemId ) => {
        setRemoveButtonIsLoading(true)
        await commerce.cart.remove(itemId).then(({cart}) => {
            setRemoveButtonIsLoading(false)
            setCart(cart)
            toast({
                title: "Proizvod uklonjen iz korpe.",
                description: "Uspešno ste uklonili proizvod iz korpe.",
                status: "success",
                duration: 9000,
                isClosable: true
            })
        })
    }

    return (
      <>
        <Button zIndex='11' m='10px' right='0' pos='absolute' ref={btnRef} colorScheme="teal" variant='ghost' onClick={onOpen}>
            <Icon w='6' h='6' as={RiShoppingCartFill} />
            <Text
                as="sup"
                color='red'
                ml='2px'
                bgColor='white'
                p='5px'
                borderRadius='full'
            >
                {state.total_items ? state.total_items : ''}
            </Text>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Korpa</DrawerHeader>
  
            <DrawerBody>
                {
                    state.line_items.length ? state.line_items.map( (item, index) => {
                        return (
                            <Box 
                                key={index} 
                                borderWidth='1px'
                                borderRadius='5px'
                                p='10px'
                                mb='10px'
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                >
                                    <VStack>
                                        <Text w='100%'>{ item.name }</Text>
                                        <Text w='100%'>{ item.quantity } kom</Text>
                                        <Text w='100%'>{ item.line_total.formatted_with_code }</Text>
                                    </VStack>
                                    <IconButton
                                        isLoading = { removeButtonIsLoading }
                                        onClick = { () => handleRemoveItemFromCart(item.id) }
                                        size='sm'
                                        icon={<Icon w='6' h='6' as={IoTrashBin} color='red.400' />}
                                    />
                                </Flex>
                            </Box>
                        )
                    }) : <Text>Nemate proizvode u korpi</Text>
                }
                {
                    state.line_items.length ?   <Link href='/cart'>
                                                    <a>
                                                        <Button w='100%'> Završi kupovinu </Button>
                                                    </a>
                                                </Link> : ''
                }
                
            </DrawerBody>
  
            <DrawerFooter>
                
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}