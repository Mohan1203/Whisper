import React, { useState } from 'react'
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from "@chakra-ui/react"
import ProfileModel from '../MainChat/ProfileModel'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { requestHandler } from '@/utils'
import { logout } from '@/apicalling'
import { deleteCookie } from 'cookies-next'
import { useToast } from "@chakra-ui/react"
import { clerarMessage } from "@/redux/slices/messagesSlice"
import { clearChat } from "@/redux/slices/selectedchat"
import { clearUser } from "@/redux/slices/userSlice"
import CreateGroupModal from "@/components/MainChat/CreateGroupModal"

function SideBarHeader() {
    const router = useRouter()
    const toast = useToast()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const { onOpen, onClose, isOpen } = useDisclosure()
    const user = useSelector(state => state.user)

    const handleLogout = async () => {

        await requestHandler(
            async () => logout(),
            setIsLoading,
            (res) => {
                dispatch(clerarMessage())
                dispatch(clearChat())
                dispatch(clearUser())
                localStorage.clear()
                router.push('/login')
                deleteCookie('token')
                toast({
                    title: res.data.message,
                    position: 'top-left',
                    colorScheme: 'green'
                })
            },
            (err) => {
                toast({
                    title: err,
                    position: 'top-left',
                    colorScheme: 'red'
                })
            }
        )



    }

    return (
        <>
            <div className='flex  justify-between p-1 items-center'>
                <div>
                    <Text fontSize="2xl" as="b" >Chit-Chat</Text>
                </div>
                <div className='flex items-center'>
                    <CreateGroupModal />

                    <Menu placement='bottom-end'>
                        <MenuButton>
                            <Avatar name={user.userName} size="md" src={`http://localhost:3333/${user.profilepic}`} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={(e) => { onOpen() }}>
                                My Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Log Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
            <ProfileModel onOpen={onOpen} onClose={onClose} isOpen={isOpen} user={user} />
        </>
    )
}


export default SideBarHeader