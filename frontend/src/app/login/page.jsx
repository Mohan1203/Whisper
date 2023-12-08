'use client'
import React, { useState } from 'react'
import "@/app/globals.css"
import Link from 'next/link'
import { setCookie } from 'cookies-next'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { requestHandler } from "@/utils/index"
import { loginuser } from "@/apicalling"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/slices/userSlice"

function Login() {
    const router = useRouter()

    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = { email, password }
        await requestHandler(
            async () => await loginuser(formData),
            setIsLoading,
            (res) => {
                const { data } = res;
                setCookie('token', data.token, {
                    expires: new Date(Date.now() + 43200000)
                })
                dispatch(setUser(data.user))
                localStorage.setItem("Id", data.user.id)
                localStorage.setItem("name", data.user.name)
                setTimeout(() => {
                    toast.success("Login Successfull")
                }, 1000)
                router.push('/chat')
            },
            (err) => {
                toast.error(err)
                setEmail("")
                setPassword("")
            }
        )

    }

    return (
        <div className='flex  justify-center items-center h-screen bg-gradient-to-r from-[#101010] to-[#909090]'>
            <div className='flex flex-col  text-center bg-[#909090] w-1/4 h-2/3 py-2  '>
                <h1 className='text-4xl font-serif mt-3'>Chit-Chat</h1>

                <div className='mt-16'>
                    <form onSubmit={handleSubmit} className='flex flex-col' >
                        <input type="email" placeholder='Email' className='p-2 m-5   text-lg rounded-md bg-slate-400 placeholder:text-white' onChange={(e) => setEmail(e.target.value)} value={email} />

                        <input type="password" placeholder='Password' className='p-2 m-5   text-lg rounded-md bg-slate-400 placeholder:text-white' maxLength={10} onChange={(e) => setPassword(e.target.value)} value={password} />

                        <button type='submit' className='px-10 border-10 py-2 my-2 mx-5 bg-indigo-600 rounded-sm text-black  font-bold text-lg disabled:bg-slate-600' disabled={isLoading} >LOGIN</button>
                    </form>
                    <Link href="/register">register</Link>
                </div>
            </div>
            <Toaster />
        </div>
    )
}


export default Login