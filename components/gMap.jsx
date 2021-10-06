import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import GMapStyle from "./gMapStyle.json"

import {
    Box,
    Text,
    Flex
} from '@chakra-ui/react'

const TSGMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
  
    defaultZoom={16}
    defaultCenter={{ lat: 43.620535, lng: 20.890470 }}
    defaultOptions={{ styles: GMapStyle }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 43.620535, lng: 20.890470 }} />}
  </GoogleMap>
))

export default function GMap () {

    return (
        <Box
            h='max-content'
            w='auto'
            boxShadow='0 0 1px rgb(40 51 65 / 10%), 0 1px 2px rgb(40 51 65 / 10%), 0 1px 3px rgb(40 51 65 / 10%)'
            borderRadius='md'
            backdropFilter='blur(6px)'
            bgColor='whiteAlpha.200'
            p='30px'
            justifySelf='flex-start'
        >
            <TSGMap 
                isMarkerShown 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                loadingElement={<Box h='400px' />}
                containerElement={<Box h='400px' />}
                mapElement={<Box h='100%' w='600px' borderRadius='md' overflow='hidden' />} 
            />

            <Flex
                pt='30px'
                justify='space-around'
            >
                <Text>
                    Email: info@toner-srbija.rs
                </Text>
                <Text>
                    Telefon: +38162304758
                </Text>
            </Flex>

        </Box>
    )
}
