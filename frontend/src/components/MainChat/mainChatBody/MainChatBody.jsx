import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import { Spinner } from '@chakra-ui/react'

function MainChatBody({ isTyping }) {
    const { messages } = useSelector(state => state.messages)
    const [color, setColor] = useState('')
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'cyan', 'teal', 'lime', 'gray', 'black']
    useEffect(() => {
        setColor(colors[Math.floor(Math.random() * colors.length)])
    }, [])
    return (
        messages ?
            <>
                <div className='h-[28rem] overflow-y-scroll relative bottom-0'>
                    <ScrollableFeed>
                        {messages && messages?.map((msg, i) => {
                            return <Message key={i} message={msg} color={color} />
                        })}
                        {isTyping && <div className='text-gray-500 text-sm'>Typing...</div>}
                    </ScrollableFeed>
                </div>
            </>
            :
            <div className='flex items-center justify-center h-screen'>
                <Spinner size='xl' />
            </div>
    )
}

export default MainChatBody