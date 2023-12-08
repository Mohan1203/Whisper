import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io"
import { GrAttachment } from "react-icons/gr"
import { useToast } from '@chakra-ui/react'

function MessageTextBox({ handleSubmit, message, handleTyping }) {

    return (
        <>
            <form className='flex items-center  sticky bottom-0' onSubmit={handleSubmit}>
                <InputGroup size="lg" bg="white">
                    <Input placeholder='Message' size="2xl" pr="4.5rem" value={message} onChange={handleTyping} />
                    <InputLeftElement >
                        <Button type='submit' >
                            <GrAttachment size={30} />
                        </Button>
                    </InputLeftElement>
                    <InputRightElement width="4.5rem" >
                        <Button h="2rem" size="md" variant="ghost" type='submit'>
                            <IoMdSend size={30} />
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </form>
        </>
    )
}

export default MessageTextBox