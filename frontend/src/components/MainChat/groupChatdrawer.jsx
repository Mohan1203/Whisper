import React, { useState } from 'react';
import { Avatar, AvatarGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'
import { MdGroups } from "react-icons/md"
import { requestHandler } from "@/utils"
import { removeUserFromGroup } from '@/apicalling'
import { useDispatch } from "react-redux"
import { setChat } from '@/redux/slices/selectedchat'

function SizeExample({ group }) {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const id = localStorage.getItem('Id')
    const handleClick = () => {
        onOpen()
    }

    const removeUser = async (userId) => {
        const data = {
            chatId: group._id,
            userId: userId
        }
        await requestHandler(
            async () => removeUserFromGroup(data),
            setIsLoading,
            (res) => {
                console.log(res.data)
                dispatch(setChat(res.data))
            },
            (err) => {
                console.log(err)
            }
        )
    }

    return (
        <>
            <Button
                onClick={() => handleClick()}
                m={1}
                colorScheme="teal"
                variant="outline"
                leftIcon={<MdGroups size={20} />}
            >  Group Info</Button>


            <Drawer onClose={onClose} isOpen={isOpen} size="xs">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader> {group?.chatName}</DrawerHeader>
                    <DrawerBody display='flex' flexDirection='column'>
                        <div>
                            <AvatarGroup size="md" max={2}>
                                {group?.users.map((user) => {
                                    return <Avatar name={user.userName} src={`http://localhost:3333/${user.profilepic}`} />
                                })}
                            </AvatarGroup >
                        </div>
                        <div>
                            <Stack overflowY='scroll' marginTop='16' maxHeight='72'>
                                <Text>Group Participates</Text>
                                {group?.users.map((user) => {
                                    return (
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center'>
                                                <Avatar name={user.userName} src={`http://localhost:3333/${user.profilepic}`} />
                                                <Text className='mx-2'>{user.userName}</Text>
                                            </div>
                                            <div>
                                                {
                                                    group.groupAdmin === id && user._id !== id ? <Button variant='outline' colorScheme='red' size='xs' onClick={() => removeUser(user._id)}>Remove</Button> : user._id === group.groupAdmin ? <Text color='teal' fontSize='xs' border='1px' padding='3px' borderRadius='5px'>Admin</Text> : ''
                                                }
                                            </div>
                                        </div>
                                    )
                                })}



                            </Stack>
                        </div>
                        {
                            id === group.groupAdmin ? <div className='fixed bottom-2 w-full flex justify-center '><Button width='52' variant='outline' colorScheme='blue'>Add User</Button></div> : ""
                        }


                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SizeExample;