import React, { useState, useEffect } from 'react'
import Product from './product'

import { 
    Button,
    Box,
    Heading, 
    Flex, 
    Container, 
    Select, 
    Input, 
    Text, 
    Image 
} from '@chakra-ui/react'

export default function Products ( { products, categories } ) {

    const [ limit, setLimit ] = useState(10)
    const [ start, setStart ] = useState(0)

    // const createDefaultPages = ( newLimit = limit ) => {

    //     let pages = []

    //     for (let index = 0; index < Math.floor(products.length/newLimit); index++) {
    //         pages.push(<Button onClick={() => setStart(index*newLimit)} key={index} >{index+1}</Button>)
    //     }

    //     if( products.length % newLimit !== 0 ) {
    //         pages.push(<Button onClick={() => setStart((pages.length-1)*newLimit)} key={pages.length} >{pages.length + 1}</Button>)
    //     }

    //     return pages
    // }

    const [ pages, setPages ] = useState([])

    const [ prods, setProds ] = useState(products)

    // console.log(prods.length + " / " + limit + " = " + Math.floor(prods.length/limit))

    const [ modelFilter, setModelFilter ] = useState(false)
    const [ nameFilter, setNameFilter ] = useState(false)
    const [ brandFilter, setBrandFilter ] = useState(false)
    const [ typeFilter, setTypeFilter ] = useState(false)

    const createPages = ( newLimit = limit ) => {

        let pages = []

        for (let index = 0; index < Math.floor(prods.length/newLimit); index++) {
            pages.push(<Button ml='5px' onClick={() => setStart(index*newLimit)} key={index} >{index+1}</Button>)
        }

        if( prods.length % newLimit !== 0 ) {
            pages.push(<Button ml='5px' onClick={() => setStart((pages.length-1)*newLimit)} key={pages.length} >{pages.length + 1}</Button>)
        }

        return pages
    }

    useEffect(() => {
        setPages(createPages())
    }, [prods])

    const filterProducts = ( filter, filterType ) => {

        let filteredProducts = [ ...products ]

        switch( filterType ){
            case 'name' :
                if( filter === '' )
                {
                    setNameFilter(false)
                    if( brandFilter ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    setProds( filteredProducts )
                }
                else
                {
                    setNameFilter(filter)
                    if( brandFilter ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    filteredProducts = filterByName( filteredProducts, filter )
                    setProds( filteredProducts )
                }
                break
            case 'model' :
                if( filter === '' )
                {
                    setModelFilter(false)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( brandFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    setProds( filteredProducts )
                }
                else
                {
                    setModelFilter(filter)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( brandFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    filteredProducts = filterByModel( filteredProducts, filter )
                    setProds( filteredProducts )
                }
                break
            case 'brand' :
                if( filter === '' )
                {
                    setBrandFilter(false)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    setProds( filteredProducts )
                }
                else
                {
                    setBrandFilter(filter)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( typeFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, typeFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    filteredProducts = filterByCategory( filteredProducts, filter )
                    setProds( filteredProducts )
                }
                break
            case 'type' :
                if( filter === '' )
                {
                    setTypeFilter(false)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( brandFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    setProds( filteredProducts )
                }
                else
                {
                    setTypeFilter(filter)
                    if( nameFilter ) filteredProducts = filterByName( filteredProducts, nameFilter )
                    if( brandFilter && filteredProducts.length ) filteredProducts = filterByCategory( filteredProducts, brandFilter )
                    if( modelFilter && filteredProducts.length ) filteredProducts = filterByModel( filteredProducts, modelFilter )
                    filteredProducts = filterByCategory( filteredProducts, filter )
                    setProds( filteredProducts )
                }
                break
        }

    }

    const filterByName = ( data, filter ) => {
        return data.filter( prod => prod.name.toLowerCase().includes(filter.toLowerCase()) )
    }

    const filterByModel = ( data, filter ) => {
        return data.filter( prod => prod.description.toLowerCase().includes(filter.toLowerCase()) )
    }

    const filterByCategory = ( data, filter ) => {
        return data.filter( prod => prod.categories.map(prodCat => prodCat.slug === filter).includes(true) )
    }

    const handleSetLimit = ( newLimit ) => {
        setLimit(newLimit)
        setPages(createPages(newLimit))
    }

    return (
        <Box
            as='section'
            position='relative'
        >
            <Flex
                width='100%'
                position='absolute'
                zIndex='-1'
                h='100%'
                justify='center'
            >
                <Image w='1600px' src='./stain1.svg' />
            </Flex>
            <Container
                maxW='8xl'
            >
                <Heading mb='30px' as='h3'>Proizvodi</Heading>

                <Flex
                    mb='36px'
                    pl='5px'
                    direction='row'
                    flexWrap='wrap'
                >
                    <Input
                        w='200px'
                        onChange = { (e) => filterProducts(e.target.value, 'name') }
                        placeholder='Naziv tonera'
                        mr='10px'
                    />
                    <Input
                        w='200px'
                        onChange = { (e) => filterProducts(e.target.value, 'model') }
                        placeholder='Model štampača'
                        mr='10px'
                    />
                    <Select 
                        placeholder="Izaberi brend"
                        w='200px'
                        mr='10px'
                        onChange= { (e) => filterProducts(e.target.value, 'brand') }
                    >
                        {
                            categories.filter( cat => cat.description === 'product-brand' ).map( (cat, index) => {
                                return (
                                    <option key={index} value={cat.slug} >{cat.name}</option>
                                )
                            })
                        }
                    </Select>
                    <Select 
                        placeholder="Izaberi tip"
                        w='300px'
                        mr='10px'
                        onChange= { (e) => filterProducts(e.target.value, 'type') }
                    >
                        {
                            categories.filter( cat => cat.description === 'product-type' ).map( (cat, index) => {
                                return (
                                    <option key={index} value={cat.slug} >{cat.name}</option>
                                )
                            })
                        }
                    </Select>
                </Flex>

                <Flex
                    w='100%'
                    mb='36px'
                    pl='5px'
                    pr='5px'
                    justify='flex-end'
                    direction='row'
                    flexWrap='wrap'
                >
                    <Select 
                        onChange={(e) => handleSetLimit(e.target.value) } 
                        value={limit}
                        w='100px'
                        mr='10px'
                    >
                        <option defaultChecked value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </Select>
                    {
                        pages.length ? pages.map( page => {
                            return (
                                page
                            )
                        }) : ''
                    }
                </Flex>

                <Flex 
                    w='100%' 
                    justify='flex-start' 
                    align='center' 
                    wrap='wrap'
                    transition='all .3s ease-in-out'
                >
                    {
                        prods.length ? prods.slice(start, start !== 0 ? (start/limit+1) * limit : limit).map( (prod, index) => {
                            return(
                                <Product key = {index} prod = {prod} />
                            )
                        })
                        : <Text>
                            Nema proizvoda koji odgovaraju filteru
                          </Text>
                    }
                </Flex>

                <Flex
                    w='100%'
                    mt='36px'
                    pl='5px'
                    pr='5px'
                    justify='flex-end'
                    direction='row'
                    flexWrap='wrap'
                >
                    <Select 
                        onChange={(e) => handleSetLimit(e.target.value) } 
                        value={limit}
                        w='100px'
                        mr='10px'
                    >
                        <option defaultChecked value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </Select>
                    {
                        pages.length ? pages.map( page => {
                            return (
                                page
                            )
                        }) : ''
                    }
                </Flex>
            </Container>
        </Box>
    )
}