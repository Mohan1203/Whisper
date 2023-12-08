'use client'
import React, { useState } from 'react'
import "@/app/globals.css"
import { register } from "../../apicalling"
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { requestHandler } from "@/utils"


function Register() {
    const router = useRouter()


    const [userName, setuserName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const [profilepic, setProfilePic] = useState([])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("email", email)
        formData.append('password', password)
        formData.append('userName', userName)
        formData.append('profilepic', profilepic)
        await requestHandler(
            async () => await register(formData),
            setLoading,
            (res) => {
                const { data } = res;
                toast.success(data.message)
                router.push('/login')
            },
            (err) => {
                toast.error(err)
            }
        )
    }

    const handleFile = (e) => {
        setProfilePic(e.target.files[0])
        // console.log(e.target.files)
    }


    return (
        <div className='flex  justify-center items-center h-screen bg-gradient-to-r from-[#101010] to-[#909090]'>
            <div className='flex flex-col   bg-[#909090] w-1/4  py-5  '>
                <h1 className='text-5xl font-serif mt-3 text-center'>Chit-Chat</h1>

                <div className=''>
                    <form onSubmit={handleSubmit} className='flex flex-col' >

                        <input type="text" placeholder='Username' className='p-2 mx-5 my-3 bg-slate-400 text-lg rounded-md placeholder:text-white' onChange={(e) => setuserName(e.target.value)} value={userName} />

                        <input type="email" placeholder='Email' className='p-2 mx-5 my-3  placeholder:text-white bg-slate-400 text-lg rounded-md' onChange={(e) => setEmail(e.target.value)} value={email} />

                        <input type="password" placeholder='Password' className='p-2 mx-5 my-3 placeholder:text-white bg-slate-400 text-lg rounded-md' onChange={(e) => setPassword(e.target.value)} value={password} />

                        <input type="file" className='p-2 mx-5 my-3 placeholder:text-white bg-slate-400 text-lg rounded-md' onChange={handleFile} />





                        <button type='submit' className='px-10 border-10 py-2 my-2 mx-5 bg-indigo-600 rounded-sm text-white  font-bold text-lg'>Register</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    )
}


export default Register