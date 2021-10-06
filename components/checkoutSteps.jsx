import React, { useState } from 'react'

import { useCartState } from '../context/cart'

import { Step, Steps, useSteps } from 'chakra-ui-steps'

import {
    FormErrorMessage,
    RadioGroup,
    Stack,
    Radio,
    InputLeftAddon,
    InputGroup,
    FormControl,
    FormLabel,
    Input,
    Box,
    Flex,
    Image,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Center,
    Text,
    Button,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function CheckoutSteps ({ handleQuantityChange, handleItemRemove, handleFinish }) {

    const { state } = useCartState()

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    const [ customerData, setCustomerData ] = useState({
        invoiceType: 1,
        name: '',
        surname: '',
        email: '',
        phone: '',
        city: '',
        postalCode: '',
        address: '',
        apartment: '',
        companyName: '',
        companyPib: '',
        companyNumber: ''
    })

    const [ cutomerDataValid, setCustomerDataValid ] = useState({
        name: { value: true, message: 'Polje ne sme biti prazno'},
        surname: { value: true, message: 'Polje ne sme biti prazno'},
        email: { value: true, message: 'Email neispravan'},
        phone: { value: true, message: 'Polje ne sme biti prazno'},
        city: { value: true, message: 'Polje ne sme biti prazno'},
        postalCode: { value: true, message: 'Polje ne sme biti prazno'},
        address: { value: true, message: 'Polje ne sme biti prazno'},
        apartment: { value: true, message: 'Polje ne sme biti prazno'},
        companyName: { value: true, message: 'Polje ne sme biti prazno'},
        companyPib: { value: true, message: 'Polje ne sme biti prazno'},
        companyNumber: { value: true, message: 'Polje ne sme biti prazno'}
    })

    const handleCustomerDataValidation = () => {

        let valid = true
        let validationData = { ...cutomerDataValid }

        for (const field in customerData) {

            switch(field) {
                case 'name' :
                    if( customerData.name !== '' ) 
                    {
                        validationData.name.value = true
                    } 
                    else 
                    {
                        valid = false 
                        validationData.name.value = false
                    }
                    break
                case 'surname' :
                    if( customerData.surname !== '' )
                    {
                        validationData.surname.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.surname.value = false
                    }
                    break
                case 'email' :
                    if( new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(customerData.email) )
                    {
                        validationData.email.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.email.value = false
                    }
                    break
                case 'phone' :
                    if( customerData.phone !== '' )
                    {
                        validationData.phone.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.phone.value = false
                    }
                    break
                case 'city' :
                    if( customerData.city !== '' )
                    {
                        validationData.city.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.city.value = false
                    }
                    break
                case 'postalCode' :
                    if( customerData.postalCode !== '' )
                    {
                        validationData.postalCode.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.postalCode.value = false
                    } 
                    break
                case 'address' :
                    if( customerData.address !== '' )
                    {
                        validationData.address.value = true
                    }
                    else
                    {
                        valid = false
                        validationData.address.value = false
                    } 
                    break
            }

            if( customerData.invoiceType === 2 )
            {
                switch (field) {
                    case 'companyName' :
                        if( customerData.companyName !== '' )
                        {
                            validationData.companyName.value = true
                        }
                        else
                        {
                            valid = false
                            validationData.companyName.value = false
                        }
                        break
                    case 'companyPib' :
                        if( customerData.companyPib !== '' )
                        {
                            validationData.companyPib.value = true
                        }
                        else
                        {
                            valid = false
                            validationData.companyPib.value = false
                        }
                        break
                    case 'companyNumber' :
                        if( customerData.companyNumber !== '' )
                        {
                            validationData.companyNumber.value = true
                        }
                        else
                        {
                            valid = false
                            validationData.companyNumber.value = false
                        }
                        break
                }
            }
        }

        setCustomerDataValid(validationData)
        console.log(valid)
        if(valid) nextStep()
    }

    return (
    <>
        <Steps pt={20} activeStep={activeStep} >
            <Step label='Narudžbenica'>
                <Center>
                    <Table variant="simple" mt={20} mb={20}>
                        <TableCaption>Narudžbenica</TableCaption>
                        <Thead>
                            <Tr>
                            <Th>Proizvod</Th>
                            <Th>Komada</Th>
                            <Th isNumeric>Cena</Th>
                            <Th isNumeric>Ukupno</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                    {
                        state.line_items.map( (item, index) => {
                            return (
                                <>                                 
                                    <Tr key={index}>
                                        <Td><Box display='flex' alignItems='center' ><Image src={item.media.source} boxSize='70px' /><Text pl={2}>{item.name}</Text></Box></Td>
                                        <Td>
                                            <Button
                                                disabled={item.quantity === 1}
                                                mr={1}
                                                onClick={ () => handleQuantityChange( item.id, parseInt(item.quantity) - 1 )}
                                            >-</Button>
                                            {item.quantity}
                                            <Button
                                                ml={1}
                                                onClick={ () => handleQuantityChange( item.id, parseInt(item.quantity) + 1 )}
                                            >+</Button>
                                            <Button ml={2} onClick={ () => handleItemRemove( item.id ) } >
                                                <Box
                                                    w='10px'
                                                    h='10px'
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Box>
                                            </Button>
                                        </Td>
                                        <Td isNumeric>{item.price.formatted_with_code}</Td>
                                        <Td isNumeric>{item.line_total.formatted_with_code}</Td>
                                    </Tr>

                                </>
                            )
                        })
                    }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th isNumeric colSpan={3}>
                                Total
                            </Th>
                            <Td isNumeric>
                                { state.subtotal.formatted_with_code }
                            </Td>
                        </Tr>
                    </Tfoot>
                    </Table>
                </Center>
            </Step>
            <Step label='Kupac'>
                <Center>
                    <Box
                        mt={20}
                        mb={20}
                        w='auto'
                    >
                        <Box as='form'>

                            <RadioGroup pb={5} onChange={ (e) => setCustomerData({ ...customerData, invoiceType: parseInt(e) }) } value={customerData.invoiceType}>
                                <Stack direction="row">
                                    <Radio name='invoiceType' value={1} >FIZIČKO LICE</Radio>
                                    <Radio name='invoiceType' value={2} >FIRMA</Radio>
                                </Stack>
                            </RadioGroup>
                            <Box borderWidth={1} borderRadius={5} p={8} mb={5}>
                                <Flex
                                    pb={5}
                                >
                                    <FormControl
                                        isInvalid={!cutomerDataValid.name.value} 
                                        isRequired
                                    >
                                        <FormLabel>Ime</FormLabel>
                                        <Input value={customerData.name} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  name: e.target.value })} type='text' placeholder='Ime'/>
                                        <FormErrorMessage>{cutomerDataValid.name.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl 
                                        pl={5} 
                                        isInvalid={!cutomerDataValid.surname.value}
                                        isRequired
                                    >
                                        <FormLabel>Prezime</FormLabel>
                                        <Input value={customerData.surname} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  surname: e.target.value })} type='text' placeholder='Prezime'/>
                                        <FormErrorMessage>{cutomerDataValid.surname.message}</FormErrorMessage>
                                    </FormControl> 
                                </Flex>
                                <Flex
                                    pb={5}
                                >                       
                                    <FormControl
                                        isInvalid={!cutomerDataValid.email.value} 
                                        isRequired
                                    >
                                        <FormLabel>Email</FormLabel>
                                        <Input value={customerData.email} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  email: e.target.value })} type='email' placeholder='Email'/>
                                        <FormErrorMessage>{cutomerDataValid.email.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl 
                                        pl={5} 
                                        isInvalid={!cutomerDataValid.phone.value}
                                        isRequired
                                    >
                                        <FormLabel>Telefon</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children="+381" />
                                            <Input value={customerData.phone} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  phone: e.target.value })} type='tel' placeholder='Telefon'/>
                                        </InputGroup>     
                                        <FormErrorMessage>{cutomerDataValid.phone.message}</FormErrorMessage>
                                    </FormControl>
                                </Flex> 
                            </Box>
                            <Box borderWidth={1} borderRadius={8} p={10}>
                                <Flex
                                    pb={5}
                                >
                                    <FormControl 
                                        isInvalid={!cutomerDataValid.postalCode.value}
                                        isRequired
                                    >
                                        <FormLabel>Poštanski broj</FormLabel>
                                        <Input value={customerData.postalCode} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  postalCode: e.target.value })} type='number' placeholder='Poštanski broj'/>
                                        <FormErrorMessage>{cutomerDataValid.postalCode.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl 
                                        pl={5} 
                                        isInvalid={!cutomerDataValid.city.value}
                                        isRequired
                                    >
                                        <FormLabel>Grad</FormLabel>
                                        <Input value={customerData.city} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  city: e.target.value })} type='text' placeholder='Grad'/>
                                        <FormErrorMessage>{cutomerDataValid.city.message}</FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex>
                                    <FormControl 
                                        isInvalid={!cutomerDataValid.address.value}
                                        isRequired
                                    >
                                        <FormLabel>Adresa</FormLabel>
                                        <Input value={customerData.address} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  address: e.target.value })} type='text' placeholder='Adresa'/> 
                                        <FormErrorMessage>{cutomerDataValid.address.message}</FormErrorMessage>  
                                    </FormControl>
                                    <FormControl pl={5}>
                                        <FormLabel>Broj stana (opciono)</FormLabel>
                                        <Input value={customerData.apartment} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  apartment: e.target.value })} type='text' placeholder='Broj stana'/>   
                                    </FormControl>
                                </Flex>
                            </Box>
                            {
                                customerData.invoiceType === 2 ? <Box borderWidth={1} borderRadius={5} p={8} mt={5}>
                                    <Flex
                                        pt={5}
                                        pb={5}
                                        alignItems='flex-end'
                                    >
                                        <FormControl 
                                            isInvalid={!cutomerDataValid.companyName.value}
                                            isRequired
                                        >
                                            <FormLabel>Naziv firme</FormLabel>
                                            <Input value={customerData.companyName} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  companyName: e.target.value })} type='text' placeholder='Naziv firme'/>
                                            <FormErrorMessage>{cutomerDataValid.companyName.message}</FormErrorMessage>     
                                        </FormControl>
                                        <FormControl 
                                            pl={5} 
                                            isInvalid={!cutomerDataValid.companyPib.value}
                                            isRequired
                                        >
                                            <FormLabel>Poreski identifikacioni broj (PIB)</FormLabel>
                                            <Input value={customerData.companyPib} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  companyPib: e.target.value })} type='text' placeholder='PIB'/>
                                            <FormErrorMessage>{cutomerDataValid.companyPib.message}</FormErrorMessage>     
                                        </FormControl>
                                    </Flex>
                                    <Flex>
                                        <FormControl 
                                            isInvalid={!cutomerDataValid.companyNumber.value}
                                            isRequired
                                        >
                                            <FormLabel>Matični broj firme</FormLabel>
                                            <Input value={customerData.companyNumber} maxW='300px' onChange={ (e) => setCustomerData({ ...customerData,  companyPib: e.target.value })} type='text' placeholder='Matični broj'/>
                                            <FormErrorMessage>{cutomerDataValid.companyNumber.message}</FormErrorMessage>     
                                        </FormControl>
                                    </Flex>
                                </Box> : ''
                            }
                        </Box>                 
                    </Box>
                </Center>
            </Step>
            <Step label='Pregled'>
                <Center
                    mt={20}
                    mb={20}
                >
                    <Box>
                        <Box>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Proizvod</Th>
                                        <Th isNumeric>Komada</Th>
                                        <Th isNumeric>Cena</Th>
                                        <Th isNumeric>Ukupno</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {
                                    state.line_items.map( (item, index) => {
                                        return (                        
                                            <Tr key={index}>
                                                <Td>
                                                    <Box display='flex' alignItems='center' >
                                                        <Text pl={2}>{item.name}</Text>
                                                    </Box>
                                                </Td>
                                                <Td isNumeric>
                                                    <Text>{item.quantity}</Text>
                                                </Td>
                                                <Td isNumeric>
                                                    {item.price.formatted_with_code}
                                                </Td>
                                                <Td isNumeric>
                                                    {item.line_total.formatted_with_code}
                                                </Td>
                                            </Tr>
                                        )
                                    })
                                }
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th isNumeric colSpan={3}>
                                            Total
                                        </Th>
                                        <Td isNumeric>
                                            { state.subtotal.formatted_with_code }
                                        </Td>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </Box>

                        <Box>
                            <Flex>
                                <Text>Ime i prezime</Text>
                                <Text>{customerData.name + ' ' + customerData.surname}</Text>
                            </Flex>
                            <Flex>
                                <Text>Email</Text>
                                <Text>{customerData.email}</Text>
                            </Flex>
                            <Flex>
                                <Text>Telefon</Text>
                                <Text>{customerData.phone}</Text>
                            </Flex>
                            <Flex>
                                <Text>Poštanski broj</Text>
                                <Text>{customerData.postalCode}</Text>
                            </Flex>
                            <Flex>
                                <Text>Grad</Text>
                                <Text>{customerData.city}</Text>
                            </Flex>
                            <Flex>
                                <Text>Adresa</Text>
                                <Text>{customerData.address + ' ' + customerData.apartment}</Text>
                            </Flex>
                            {
                                customerData.invoiceType === 2 ? <><Flex>
                                    <Text>Naziv firme</Text>
                                    <Text>{customerData.companyName}</Text>
                                </Flex>
                                <Flex>
                                    <Text>Poreski identifikacioni broj (PIB)</Text>
                                    <Text>{customerData.companyPib}</Text>
                                </Flex>
                                <Flex>
                                    <Text>Matični broj firme</Text>
                                    <Text>{customerData.companyNumber}</Text>
                                </Flex></> : ''
                            }
                        </Box>

                    </Box>
                </Center>
            </Step>
        </Steps>
        <Flex
            w='100%'
            justify='flex-end'
            pb={20}
        >
            {
                activeStep > 0 ? <Button onClick={prevStep}>Predhodni korak</Button> : ''
            }
            {
                activeStep === 2 ? <Button ml={5} onClick={ () => handleFinish( customerData ) }>Naruči</Button> : activeStep === 1 ? <Button ml={5} onClick={handleCustomerDataValidation}>Sledeći korak</Button> : <Button ml={5} onClick={nextStep}>Sledeći korak</Button>
            }
            
        </Flex>
    </>
    )
}