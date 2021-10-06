import React from 'react'

import { useCartState } from '../context/cart'
import { useCartDispatch } from '../context/cart'
import { commerce } from '../lib/commerce'

import Layout from '../components/layout'
import CheckoutSteps from '../components/checkoutSteps'

import {
    Container,
    Text
} from '@chakra-ui/react'

const pageData = {
    title: 'Korpa | ',
    desc: 'Potrošačka korpa strana',
    canonical: 'https://toner-srbija.rs/cart'
}

export default function Cart () {

    const { state } = useCartState()
    const { setCart } = useCartDispatch()

    const handleQuantityChange = ( id, quantity ) => {
        commerce.cart.update( id, { quantity : quantity } ).then( ({cart}) => setCart(cart) )
    }

    const handleItemRemove = ( id ) => {
        commerce.cart.remove(id).then( ({cart}) => setCart(cart) )
    }

    const handleFinish = async ( customerData ) => {

        console.log(state)

        await commerce.checkout.generateToken( state.id , { type: 'cart' } )
            .then( async (token) => {

                console.log("Token: " + JSON.stringify(token))

                const orderData = {
                    line_items: token.live.line_items,
                    customer: {
                        firstname: customerData.name,
                        lastname: customerData.surname,
                        email: customerData.email
                    },
                    shipping: {
                        name: customerData.name + " " + customerData.surname,
                        street: customerData.address,
                        town_city: customerData.city,
                        county_state: 'RS-18',
                        postal_zip_code: customerData.postalCode,
                        country: 'RS'
                    },
                    fulfillment: {
                        shipping_method: 'ship_7RyWOwmK5nEa2V'
                    },
                    billing: {
                        name: customerData.name + " " + customerData.surname,
                        street: customerData.address,
                        town_city: customerData.city,
                        county_state: 'Serbia',
                        postal_zip_code: customerData.postalCode,
                        country: 'Serbia'
                    },
                    payment: {
                        gateway: 'test_gateway',
                            card: {
                                number: '4242 4242 4242 4242',
                                expiry_month: '12',
                                expiry_year: '21',
                                cvc: '332',
                                postal_zip_code: '36210'
                            }
                    }
                }

                await commerce.checkout.capture( token.id, orderData ).then( (response) => console.log(response) )
            })

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        customerData : customerData,
                        cartState: state
                    }
                )
            }).then( res => {
                console.log(res.data)
            })
    }

    return (
        <Layout pageData = { pageData } >
            <Container
                maxW='8xl'
            >
                { state.total_items ? <CheckoutSteps handleQuantityChange={ handleQuantityChange } handleItemRemove={ handleItemRemove } handleFinish={ handleFinish } /> : <Text>Nema prizvoda u korpi.</Text> }
            </Container>
        </Layout>
    )
}