import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
const { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, Stack, TagCloseButton, TagLabel, Tag, HStack, Flex, Box, Avatar, Text, useToast, FormControl, FormLabel } = require("@chakra-ui/react")
import { searchUser } from '@/apicalling'
import { requestHandler } from "@/utils"
import { createGroup } from '@/apicalling'
import { useDispatch } from 'react-redux'
import { updateChats } from '@/redux/slices/chatSlice'

function SizeExample() {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState('')
    const [groupName, setGroupName] = useState('')
    const [result, setResult] = useState([])
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [userError, setUserError] = useState('')
    const [groupNameError, setGroupNameError] = useState('')

    const handleSizeClick = () => {
        onOpen()
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        await requestHandler(
            async () => await searchUser(e.target.value),
            setIsLoading,
            (res) => {
                setResult(res.data)
            },
            (err) => {
                console.log(err)
            }
        )
        if (e.target.value === '') setResult({})
    }

    const addUser = (user) => {
        if (users.some((u) => u._id === user._id)) {
            alert("User already added")
            setUsers([...users])
            setSearch("")
        } else {
            setUsers([...users, user])
        }
        setSearch("")
        setResult([])
    }



    const removeUser = (user) => {
        setUsers(users.filter((u) => u._id !== user._id))
    }

    const addGroup = async (e) => {
        e.preventDefault();
        if (groupName.length < 3) {
            setGroupNameError("Group name must above 3 chatacter")
        }
        if (users.length < 2) {
            setUserError("Atleast two users are required to create a group")
        }
        const data = {
            chatName: groupName,
            users
        };
        await requestHandler(
            async () => await createGroup(data),
            setIsLoading,
            (res) => {
                dispatch(updateChats(res.data))
                closeModal()
            },
            (err) => {
                console.log(err)
            }
        )

    }

    const closeModal = () => {
        setGroupName('')
        setUsers([])
        setResult([])
        onClose()
        setGroupNameError('')
        setUserError('')
    }


    return (
        <>
            <button className='mx-2'><AiOutlinePlus size={30} onClick={handleSizeClick} /></button>

            <Modal onClose={closeModal} size='xl' isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl className="" >
                            <div className="m-2">
                                <FormLabel>Group Name</FormLabel>
                                <Input type="text" placeholder="Group Name" onChange={(e) => setGroupName(e.target.value)} value={groupName} />
                                <span className="font-bold text-xs text-red-500">{groupNameError ? groupNameError : "  "}</span>
                            </div>
                            <div className="m-2">
                                <FormLabel>Search User</FormLabel>
                                <Input type="text" placeholder="Search User" onChange={handleSearch} value={search} />
                                <span className="font-bold text-xs text-red-500">{userError ? userError : "  "}</span>
                            </div>
                            <div className={result.user ? "m-2 overflow-y-scroll h-20" : "m-2 overflow-y-scroll"} >
                                {
                                    result.user && result.user.map((user) => {
                                        return (
                                            <Flex borderRadius='2xl' padding='1' margin='1' backgroundColor='lightgray' onClick={() => addUser(user)}>
                                                <Avatar src={`http://localhost:3333/${user.profilepic}`} />
                                                <Box ml='3'>
                                                    <Text fontWeight='bold'>
                                                        {user.userName}
                                                    </Text>
                                                </Box>
                                            </Flex>)
                                    })
                                }
                            </div>
                            <div className="flex flex-row items-center flex-wrap m-2">
                                {users && users.map((user) => {
                                    return (<Tag
                                        size='lg'
                                        borderRadius='full'
                                        variant='solid'
                                        colorScheme='green'
                                        margin='1'
                                    >
                                        <TagLabel>{user.userName}</TagLabel>
                                        <TagCloseButton onClick={() => removeUser(user)} />
                                    </Tag>)
                                })}
                            </div>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' variant='outline' margin='2' type="submit" onClick={addGroup}>Save</Button>
                        <Button onClick={closeModal} colorScheme='red' variant='outline'>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default SizeExample;