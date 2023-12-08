import axios from "axios";
import { getCookie } from "cookies-next";

const apiClient = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    withCredentials: true,
    timeout: 12000
})

apiClient.interceptors.request.use(
    function (config) {
        const token = getCookie('token');
        config.headers.Authorization = token;
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
)



const register = (data) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    return apiClient.post('/registeruser', data, headers)
}

const loginuser = (formData) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    return apiClient.post('/loginuser', formData, headers)
}

const getUserProfile = (id) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.get(`/getuserprofile/${id}`, headers)
}

const searchUser = (search) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.get(`/searchuser?search=${search}`, headers)
}

const fetchchats = () => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.get(`/fetchChats`, headers)
}

const fetchMessages = (chatId) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.get(`/fetchmessages/${chatId}`, headers)
}

const sendMessage = (data, chatId) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.post(`/sendmessage`, data, headers)
}

const createGroup = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.post(`/creategroup`, data, headers)
}

const removeUserFromGroup = (data) => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.put(`/removememberfromgroup`, data, headers)
}

const logout = () => {
    const headers = {
        "Content-Type": "application/json"
    }
    return apiClient.get(`/logout`, headers)
}



export {
    register,
    loginuser,
    getUserProfile,
    searchUser,
    fetchchats,
    fetchMessages,
    sendMessage,
    createGroup,
    removeUserFromGroup,
    logout
}