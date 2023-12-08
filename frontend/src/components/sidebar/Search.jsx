import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'
import { requestHandler } from "@/utils"
import { searchUser } from "@/apicalling"
import { useToast } from "@chakra-ui/react"

function Search({ setSearchedUsers }) {

    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault()
        await requestHandler(
            async () => await searchUser(e.target.value),
            setIsLoading,
            (res) => {
                const result = res.data
                setSearchedUsers(result)
            },
            (err) => {
                console.log(err)
            }
        )
        if (e.target.value === '') setSearchedUsers({})
    }

    return (
        <>
            <div className='p-1'>
                <InputGroup size="md" >
                    <InputLeftElement
                        pointerEvents="none"
                        children={<ImSearch />}
                        size="md"
                    />
                    <Input placeholder='Search' onChange={handleSearch} bg="white" />
                </InputGroup>
            </div>
        </>
    )
}

export default Search