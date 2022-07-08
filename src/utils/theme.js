import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const fonts = {
    heading: 'Poppins, Inter, sans-serif',
    body: 'Poppins, Inter, sans-serif',
}

const styles = {
    global: (props) => ({
        body: {
            bg: mode('#eeefe9', 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(17,21,28,1) 100%)')(props),
        }
    })
}

const components = {
    Button: {
        baseStyle: (props) => ({
            fontWeight: 'normal',
        }),
        variants: {
            primary: (props) => ({
                bg: 'rgb(245, 78, 0)',
                _hover: {
                    bg: 'rgb(242, 102, 36)',
                    _disabled: {
                        bg: 'rgb(242, 102, 36)',
                    }
                },
                color: 'white',
            }),
            danger: (props) => ({
                bg: 'red.500',
                _hover: {
                    bg: 'red.400',
                    _disabled: {
                        bg: 'red.400',
                    }
                },
                color: 'white',
            }),
            transparent: (props) => ({
                bg: 'transparent',
                _hover: {
                    bg: 'transparent',
                    _disabled: {
                        bg: 'transparent',
                    },
                    opacity: 0.8
                }
            })
        }
    },
    Tag: {
        baseStyle: (props) => ({
            borderColor: mode('gray.200', 'black')(props),
        })
    },
}

const theme = extendTheme({ 
    config,
    fonts,  
    styles,
    components
})

export default theme