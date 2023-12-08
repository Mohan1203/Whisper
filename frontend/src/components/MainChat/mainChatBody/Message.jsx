import { Card, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

function Message({ message, color }) {
    const sender = message.sender._id === localStorage.getItem("Id")
    const { selectedChat } = useSelector(state => state.selectedChat)


    return (
        <>
            <div className='m-1'>
                <Card maxW="xs" minW='32' width="fit-content" className='flex p-1 ' marginLeft={sender ? 'auto' : ''}
                    backgroundColor={sender ? 'green.200' : 'white'} >
                    {selectedChat.isGroupChat && !sender ? <Text fontSize="xs" maxW="fit-content" fontWeight='bold' color={color}>{message.sender.userName}</Text> : <></>}
                    <Text fontSize="md" maxW="fit-content" >
                        {message.content}
                    </Text>
                </Card>
            </div>
        </>
    )
}

export default Message