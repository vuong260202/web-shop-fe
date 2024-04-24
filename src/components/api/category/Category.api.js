import axios from "axios";
import AuthService from "../../../service/AuthService";
import APIService from "../../../service/APIService";
import ServerAPI from "../../../utils/serverAPI";
import CONFIG from "../../../config"

const all = async () => {
    const res = await axios.get(
        CONFIG.server.url + "/category/all",
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
        },
    }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response))

    return res;
}

const update = () => {

}

const detail = async ({categoryId}) => {
    const res = await axios.get(
        CONFIG.server.url + `/category/${categoryId}/detail`,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response))

    return res;
}


export default {
    all,
    update,
    detail,
}