import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
    Text,
    Stack,
} from '@chakra-ui/react'
import { AiFillEye } from "react-icons/ai"

function ProfileModel({ isOpen, onOpen, onClose, user }) {

    return (
        user ?
            <>
                < Modal isOpen={isOpen} onClose={onClose} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Profile</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody alignItems='center' display='flex' flexDirection='column'>
                            <Avatar name={user.userName} size='2xl' src={`http://localhost:3333/${user.profilepic}`} />
                            <Text fontSize='3xl' fontWeight='bold'>{user.userName}</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='outline' colorScheme='red' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal >
            </>
            :
            ""
    )
}

export default ProfileModel