import React, { useState } from 'react'
import { useRouter  } from 'next/router'
import { commerce } from '../../lib/commerce'
import Layout from '../../components/layout'
import RelatedProduct from '../../components/product'

import { useCartDispatch } from '../../context/cart'

import { 
    Box,
    Image,
    Badge,
    useToast,
    VStack, 
    HStack, 
    Alert, 
    Center, 
    Heading, 
    Text, 
    Button, 
    InputGroup, 
    Input, 
    InputLeftAddon, 
    InputRightAddon, 
    Flex, 
    Container 
} from '@chakra-ui/react'

const pageData = {
    title: 'Proizvod | ',
    desc: 'Proizvod strana',
    canonical: 'https://toner-srbija.rs/product/'
}

export default function Product ({ product }) {

    console.log(product)

    const router = useRouter()
    const toast = useToast()

    const { setCart } = useCartDispatch()

    const [ quantity, setQuantity ] = useState(1)

    const [ isAddToCartBtnLoading, setIsAddToCartBtnLoading ] = useState(false)
    const [ isChekoutBtnLoading, setIsChekoutBtnLoading ] = useState(false)

    const desc = product.description.split('</p><p>')

    const addToCart = async () => {
        setIsAddToCartBtnLoading(true)
        await commerce.cart.add(product.id, quantity).then(({cart}) => {
            setCart(cart)
            setIsAddToCartBtnLoading(false)
            toast({
                title: `Proizvod ${product.name} dodat u korpu.`,
                description: `Uspešno ste dodali ${quantity} ${product.name} u korpu.`,
                status: "success",
                duration: 9000,
                isClosable: true
            })
        })
    }

    const checkout = async () => {
        setIsChekoutBtnLoading(true)
        await commerce.cart.add(product.id, quantity).then( async ({cart}) => {
            setIsChekoutBtnLoading(false)
            setCart(cart)
        }).then( () => router.push('/cart') )
    }

    return (
        <Layout pageData = { pageData }>
            <Flex
                width='100%'
                position='absolute'
                zIndex='-2'
                h='100%'
                justify='center'
            >
                <Image w='1600px' src='../stain2.svg' />
            </Flex>
            <Container
                maxW='8xl'
                pt='100px'
            >
                <Flex
                    flexWrap='wrap'
                    justify='space-evenly'
                    align='center'
                    w='100%'
                    direction='row'
                >
                        <Center 
                            h='100%'
                        >
                            <Alert 
                                position='relative'
                                p='0'  
                                status="success" 
                                variant="subtle" 
                                borderRadius='lg' 
                                w='600px' 
                                maxW='100%'
                                boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                            >
                                <Image backdropFilter='blur(3px)' position='absolute' zIndex={-1} w='100%' h='100%' objectFit='cover' filter='opacity(70%)' src={product.media.source} />

                                <VStack spacing={6} h='100%' w='100%' justifyContent='space-between' p={6} bgColor='rgba(26, 32, 44, 0.7)' >
                                    <Heading as='h2' stroke='gray'>
                                        {product.name}
                                    </Heading>
                                    <VStack
                                        w='100%'
                                        align='flex-start'
                                    >
                                        {
                                            product.categories.map( (cat, index) => <Badge key={index} fontSize='14px' p='5px' borderRadius='md' colorScheme='teal' fontWeight='semibold' >{cat.name}</Badge>)
                                        }
                                    </VStack>
                                    <Text w='100%' textAlign='left' fontWeight='bold' fontSize='30px'>
                                        {product.price.formatted_with_code}
                                    </Text>
                                    <InputGroup>
                                        <InputLeftAddon overflow='hidden' children={<Button colorScheme='teal' borderRadius={0} disabled={ quantity === 1 } onClick={ () => setQuantity( q => q - 1 )} >-</Button>} p={0} />
                                        <Input maxW='14' textAlign='center' p={2} type='number' value={quantity} onChange={ (e) => setQuantity(parseInt(e.target.value) < 1 || e.target.value === '' ? 1 : parseInt(e.target.value)) } />
                                        <InputRightAddon overflow='hidden' children={<Button colorScheme='teal' borderRadius={0} onClick={ () => setQuantity( q => q + 1 )} >+</Button>} p={0} />
                                    </InputGroup>
                                    <HStack
                                        justify='space-between'
                                        w='100%'
                                    >
                                        <Button
                                            onClick={addToCart}
                                            colorScheme='teal'
                                            isLoading={isAddToCartBtnLoading}
                                            variant='outline'
                                        >
                                            Dodaj u korpu
                                        </Button>
                                        <Button
                                            onClick={checkout}
                                            colorScheme='teal'
                                            isLoading={isChekoutBtnLoading}
                                            variant='outline'
                                        >
                                            Kupi odmah
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Alert>
                        </Center>

                        <Center
                            maxW='450px'
                        >
                            <VStack spacing={3}>
                                <Alert 
                                    d='flex' 
                                    flexDir='column' 
                                    alignItems='flex-start' 
                                    status="success" 
                                    variant="left-accent" 
                                    bgColor='rgba(0,128,128,.4)'
                                    backdropFilter='blur(5px)'
                                    borderEndRadius={5} 
                                    w='auto'
                                    boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                                >
                                    <Text mb={2} fontSize={20} fontWeight='bold'>
                                        {desc[0].substr(3).toString()}
                                    </Text>
                                    <Text fontWeight='medium'>
                                        {desc[1]}
                                    </Text>
                                </Alert>
                                <Alert 
                                    d='flex' 
                                    flexDir='column' 
                                    alignItems='flex-start' 
                                    status="success" 
                                    bgColor='rgba(0,128,128,.4)'
                                    backdropFilter='blur(5px)'
                                    variant="left-accent" 
                                    borderEndRadius={5} 
                                    boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                                >
                                    <Text mb={2} fontSize={20} fontWeight='bold'>
                                        {desc[2]}
                                    </Text>
                                    <Text fontWeight='medium'>
                                        {desc[3]}
                                    </Text>
                                </Alert>
                                <Alert 
                                    d='flex' 
                                    flexDir='column' 
                                    alignItems='flex-start' 
                                    status="success"
                                    bgColor='rgba(0,128,128,.4)'
                                    backdropFilter='blur(5px)'
                                    variant="left-accent" 
                                    borderEndRadius={5}
                                    boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
                                >
                                    <Text mb={2} fontSize={20} fontWeight='bold'>
                                        {desc[4]}
                                    </Text>
                                    <Text fontWeight='medium'>
                                        {desc[5].slice(0,-4)}
                                    </Text>
                                </Alert>
                            </VStack>
                        </Center>

                </Flex>
                <Box
                    pt='40px'
                >
                    <Heading as='h5'>
                        Slični prozvodi
                    </Heading>
                    <Flex
                        pt='40px'
                    >
                        { product.related_products.length ? product.related_products.map( (prod, index) => {
                            return (
                                <RelatedProduct key={index} prod={prod} />
                            )
                        }): ''}
                    </Flex>
                </Box>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {

    const permalink = ctx.params.id

    const product = await commerce.products.retrieve( permalink, {
        type : 'permalink'
    })
  
    return {
      props: {
        product
      }
    }
  }