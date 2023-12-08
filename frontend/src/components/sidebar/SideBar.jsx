import React, { useState, useEffect } from 'react'
import SideBarHeader from './SideBarHeader'
import Search from "./Search"
import ChatsItem from './ChatsItem'
import { requestHandler } from "@/utils"
import { fetchchats } from "@/apicalling"
import { useToast } from "@chakra-ui/react"
import { Skeleton, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '@/redux/slices/chatSlice'

function SideBar() {
    const dispatch = useDispatch()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [searchedUsers, setSearchedUsers] = useState([])

    const chats = useSelector(state => state.chats)

    useEffect(() => {
        const fetchChats = async () => {
            await requestHandler(
                async () => await fetchchats(),
                setIsLoading,
                (res) => {
                    const result = res.data;
                    dispatch(setChats(result))
                },
                (err) => {
                    console.log(err)
                }
            )
        }
        fetchChats()
    }, [dispatch, chats])
    return (
        <>
            <div className='w-80 bg-cyan-600 fixed h-screen'>
                <SideBarHeader />
                <Search setSearchedUsers={setSearchedUsers} />
                {
                    chats ?
                        searchedUsers.user ? searchedUsers.user.map((user) => {
                            return <ChatsItem user={user} key={user._id} setSearchedUsers={setSearchedUsers} />
                        }) : chats.chats.fullChats?.map((chat) => {
                            return <ChatsItem chat={chat} key={chat._id} />
                        })
                        :
                        <Stack className=' mx-1'>
                            <Skeleton height="60px" />
                            <Skeleton height="60px" />
                            <Skeleton height="60px" />
                            <Skeleton height="60px" />
                        </Stack>
                }

            </div>
        </>
    )
}

export default SideBar


