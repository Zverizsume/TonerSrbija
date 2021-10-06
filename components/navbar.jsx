import React from 'react'

import NavbarDrawerMenu from './navbarDrawerMenu'
import NavbarDrawerCart from './navbarDrawerCart'

import { 
  Icon,
  Flex, 
  Text, 
  Box, 
  Link, 
  Container, 
  useColorModeValue  
} from '@chakra-ui/react'

import { MdPhoneInTalk } from 'react-icons/md'
import { SiMailDotRu } from 'react-icons/si'

export default function Navbar () {

    return (
        <Container
          maxW='8xl'
          position='fixed'
          left= '50%'
          top= '10px'
          zIndex='10'
          transform='translate(-50%)'
        >
          <Box
            w='100%'
            position='relative'
            backdropFilter='blur(5px)'
            backgroundColor={useColorModeValue('whiteAlpha.800','rgba(26, 32, 44, .8)')}
            borderRadius='lg'
            boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
          >
            <NavbarDrawerMenu />
            <NavbarDrawerCart />
            <Flex
              h='60px'
              justify='center'
              align='center'
            >
              <Flex
                justify='center'
                align='center'
              >
                <Box
                  w='20px'
                  h='20xp'
                >
                  <Icon as={SiMailDotRu} />
                </Box>
                <Link href='mailto:info@toner-srbija.rs'><Text pl='10px'>info@toner-srbija.rs</Text></Link>
              </Flex>
              
              <Flex
                justify='center'
                align='center'
                ml='20px'
              >
                <Box
                  w='20px'
                  h='20xp'
                >
                  <Icon as={MdPhoneInTalk} />
                </Box>
                <Link href='tel:+38162304758'><Text pl='10px'>+38162304758</Text></Link>
              </Flex>
            </Flex>
          </Box>
        </Container>
    )
}