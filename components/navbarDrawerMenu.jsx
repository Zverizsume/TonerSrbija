import React from 'react'

import Link from 'next/link'

import { useDisclosure } from '@chakra-ui/hooks'

import {
    Icon,
    Box,
    VStack,
    useColorMode,
    Switch,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from "@chakra-ui/react"

import { CgMenuLeft } from 'react-icons/cg'
import { AiFillHome } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function NavbarDrawerMenu () {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
      <>
        <Button zIndex='11' m='10px' pos='absolute' ref={btnRef} colorScheme="teal" variant='ghost' onClick={onOpen}>
          <Icon w={6} h={6} as={CgMenuLeft} />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>TONER SRBIJA</DrawerHeader>
  
            <DrawerBody
              className='menuWrapper'
            >
              <VStack
                w='100%'
                alignItems='flex-start'
              >
                <Link href='/'>
                  <a>
                      <Button
                          colorScheme="teal"
                          variant="outline"
                          leftIcon={<Icon w='5' h='5' as={AiFillHome} />}
                      >
                          Početna
                      </Button>
                  </a>
                </Link>
                <Link href='/cart'>
                  <a>
                      <Button
                          colorScheme="teal"
                          variant="outline"
                          leftIcon={<Icon w='5' h='5' as={RiShoppingCartFill} />}
                      >
                          Korpa
                      </Button>
                  </a>
                </Link>
                <Link href='/contact'>
                  <a>
                      <Button
                          colorScheme="teal"
                          variant='outline'
                          leftIcon={<Icon w='5' h='5' as={IoMdChatboxes} />}
                      >
                          Kontakt
                      </Button>
                  </a>
                </Link>
              </VStack>
            </DrawerBody>
  
            <DrawerFooter
              justifyContent='flex-start'
              alignItems='center'
            >
              <Icon w='7' h='7' as={ colorMode === 'dark' ? FiMoon : FiSun } />
              <Switch ml='10px' onChange={toggleColorMode}/>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}