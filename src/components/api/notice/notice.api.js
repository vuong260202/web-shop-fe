import CONFIG from "../../../config";
import axios from "axios";
import AuthService from "../../../utils/AuthUtil";
import APIService from "../../../utils/APIUtil";


const getAll = async () => {
    const res = await axios.get(CONFIG.server.url + `/notice/all`,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
           .catch(response => APIService.handleResponse(response));

    return res;
}

const update = async (body) => {
    const res = await axios.post(CONFIG.server.url + `/notice/update`, body,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return res;
}

const create = async (body) => {
    const res = await axios.post(CONFIG.server.url + `/notice/create`, body,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return res;
}

export default {
    getAll,
    update,
    create
}