import { Avatar, AvatarGroup, Box, Card, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { setChat } from '@/redux/slices/selectedchat'
import { requestHandler } from "@/utils"
import { fetchMessages } from "@/apicalling"
import { useDispatch } from 'react-redux'

function ChatsItem({ user, chat, setSearchedUsers }) {

    const dispatch = useDispatch()
    const individualChat = chat?.users.length <= 2 ? chat.users.find((user) => user._id !== localStorage.getItem("Id")) : null

    const handleSearchUsers = e => {
        e.preventDefault();
        setSearchedUsers({})

    }

    return (
        user ?
            <>
                <div className='my-2 cursor-pointer' onClick={handleSearchUsers} >
                    <Card direction={{ base: 'row' }} p="2">
                        <Avatar name={user.userName} src={`http://localhost:3333/${user.profilepic}`} />
                        <Box>
                            <Text ml="3" fontSize="lg" fontWeight='bold'>{user.userName}</Text>
                        </Box>
                    </Card>
                </div>
            </>

            :
            <>
                <div className='my-2 cursor-pointer' onClick={(e) => {
                    dispatch(setChat(chat))
                }} >
                    <Card direction={{ base: 'row' }} p="2" className='flex items-center'>
                        {
                            chat.isGroupChat ?
                                <AvatarGroup max={2}>
                                    {chat.users.map((user) => {
                                        return <Avatar name={user.userName} src={`http://localhost:3333/${user.profilecic}`} key={user._id} />
                                    })}
                                </AvatarGroup> : <Avatar name={individualChat.userName} src={`http://localhost:3333/${individualChat.profilepic}`} />

                        }
                        <Box>
                            <Text ml="3" fontSize="lg" fontWeight='bold'>{chat.isGroupChat ? chat.chatName : individualChat.userName}</Text>
                            {/* <Text ml="3" fontSize="xs">Hello</Text> */}
                        </Box>
                    </Card>
                </div>
            </>





    )
}

export default ChatsItem