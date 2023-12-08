"use client"
import store from "./store/index"
import { Provider } from "react-redux"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </Provider>
    )
}