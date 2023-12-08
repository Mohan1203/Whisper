import React, { useEffect, useState } from 'react'
import MainChatHeader from './MainChatHeader'
import MainChatBody from './mainChatBody/MainChatBody'
import MessageTextBox from "./MessageTextBox"
import { useSelector, useDispatch } from "react-redux"
import { fetchMessages, sendMessage } from "@/apicalling"
import { requestHandler } from "@/utils"
import { setMessages, updateMessages } from "@/redux/slices/messagesSlice"
import { useToast } from '@chakra-ui/react'
import { io } from 'socket.io-client'

function MainChat() {

    const socket = io('http://localhost:3333')

    const toast = useToast()
    const dispatch = useDispatch()
    const { selectedChat } = useSelector(state => state.selectedChat)
    const [message, setMessage] = useState('')
    const [loading, setIsLoading] = useState(false)
    const [connectionSetup, setConnectionSetup] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)


    useEffect(() => {
        const getAllMessage = async () => {
            await requestHandler(
                async () => await fetchMessages(selectedChat._id),
                setIsLoading,
                (res) => {
                    dispatch(setMessages(res.data))
                },
                (err) => {
                    console.log(err)
                }
            )
            socket.emit('join room', selectedChat._id)
        }
        if (selectedChat._id !== undefined) {
            getAllMessage()
        }
    }, [selectedChat])

    useEffect(() => {
        const id = localStorage.getItem('Id')
        socket.emit('setup', id)
        socket.on('connected', () => {
            setConnectionSetup(true)
        })
        socket.on('typing', () => {
            setIsTyping(true)
        })
        socket.on('stop typing', () => {
            setIsTyping(false)
        })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message) return;
        const data = {
            content: message,
            chatId: selectedChat._id
        }
        await requestHandler(
            async () => sendMessage(data),
            setIsLoading,
            (res) => {
                const lastSendedMessage = res.data
                socket.emit('send message', lastSendedMessage)
                dispatch(updateMessages(lastSendedMessage))
                setMessage('')
            },
            (err) => {
                console.log(err)
                toast({
                    title: "Error",
                    description: err,
                    status: "error",
                    duration: 5000,
                })
            }

        )
    }

    useEffect(() => {
        socket.on('new message', (message) => {
            dispatch(updateMessages(message))
        })
    })

    const handleTyping = (e) => {
        setMessage(e.target.value)
        if (!connectionSetup) {
            return
        }
        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
        return () => clearTimeout(lastTyped)
    }

    return (
        selectedChat ?
            <>
                <div className='w-[70rem] bg-cyan-100  ml-[320px] overflow-x-hidden'>
                    <div className="mx-2">
                        <MainChatHeader />
                        <MainChatBody isTyping={isTyping} />

                        <MessageTextBox selectedChat={selectedChat} message={message} setMessage={setMessage} handleSubmit={handleSubmit} handleTyping={handleTyping} />
                    </div>
                </div>
            </>
            :
            <div className='w-[70rem] bg-cyan-100  ml-[320px] h-screen justify-center flex items-center text-2xl font-bold'>No Chat selected</div>
    )
}

export default MainChat