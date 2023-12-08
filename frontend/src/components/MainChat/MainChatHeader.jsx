import { Avatar, AvatarGroup, Box, Button, ButtonGroup, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillEye } from "react-icons/ai"
import ProfileModel from './ProfileModel'
import { useDisclosure } from "@chakra-ui/react"
import { useSelector } from 'react-redux'
import SizeExample from './groupChatdrawer'

function MainChatHeader() {
    const { selectedChat } = useSelector(state => state.selectedChat)

    const individualChat = selectedChat && selectedChat?.users.length <= 2 ? selectedChat.users.find((user) => user._id !== localStorage.getItem("Id")) : null
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        selectedChat && selectedChat.isGroupChat ?
            <>
                <div className=' flex m-1 bg-white p-1 justify-between sticky top-0 '>
                    <div className='flex items-center'>
                        <AvatarGroup size="md" max={2}>
                            {selectedChat?.users.map((user) => {
                                return <Avatar name={user.userName} src={`http://localhost:3333/${user.profilepic}`} />
                            })}
                        </AvatarGroup >
                        <Text fontSize="lg" fontWeight='bold' className='p-1'>{selectedChat?.chatName}</Text>
                    </div>
                    <div>
                        <SizeExample group={selectedChat} />
                    </div>
                </div>
            </>
            :
            <>
                <div className=' flex m-1 bg-white p-1 justify-between sticky top-0'>
                    <div className='flex items-center'>
                        <Avatar name={individualChat?.userName} src={`http://localhost:3333/${individualChat?.profilepic}`} />
                        <Text fontSize="lg" fontWeight='bold' className='p-1'>{individualChat?.userName}</Text>
                    </div>
                    <div>
                        <Button leftIcon={<AiFillEye />} variant="outline" colorScheme="red" className='m-1' onClick={onOpen}>Profile</Button>
                    </div>
                    <ProfileModel onOpen={onOpen} onClose={onClose} isOpen={isOpen} user={individualChat} />
                </div>
            </>
    )
}

export default MainChatHeader