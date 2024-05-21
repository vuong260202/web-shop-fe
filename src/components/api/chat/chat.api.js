import axios from "axios";
import AuthService from "../../../utils/AuthUtil";
import CONFIG from "../../../config"
import serverAPI from "../../../utils/serverAPI";
import APIService from "../../../utils/APIUtil";

const allUsers = async () => {
    const res = await axios.get(CONFIG.server.url + serverAPI.url.allUsers,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
           .catch(response => APIService.handleResponse(response));

    return res;
}

const getUser = async () => {
    const res = await axios.get(CONFIG.server.url + serverAPI.url.getChatUser,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return res;
}

const getChatWithReceiver = async (receiverId) => {
    const res = await axios.get(CONFIG.server.url + `/chat/${receiverId}`,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return res;
}

const addContent = async (body) => {
    const res = await axios.post(CONFIG.server.url + `/chat/add-newContent`,
        body,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return res;
}

export default {
    allUsers,
    getUser,
    getChatWithReceiver,
    addContent,
}