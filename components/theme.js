import { extendTheme } from "@chakra-ui/react"
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
  components : {
    Steps,
  },
  fonts: {
    heading: "Raleway",
    body: "Raleway",
  },
})

export default theme