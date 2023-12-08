'use client'
import '@/app/globals.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar/SideBar'
import MainChat from '@/components/MainChat/MainChat'
import { requestHandler } from '@/utils'
import { getUserProfile } from '@/apicalling'
import { setUser } from '@/redux/slices/userSlice'
import toast, { Toaster } from 'react-hot-toast'

function Chat() {

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()



    const getUser = async () => {
        const id = localStorage.getItem("Id")
        await requestHandler(
            async () => await getUserProfile(id),
            setIsLoading,
            (res) => {
                dispatch(setUser(res.data.user))
            },
            (err) => {
                toast.error(err)
            }
        )
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <main className='flex justify-between'>
                <Sidebar />
                <MainChat />
            </main>
            <Toaster />
        </>
    )
}

export default Chat