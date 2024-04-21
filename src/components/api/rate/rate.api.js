import axios from "axios";
import APIService from "../../../service/APIService";
import AuthService from "../../../service/AuthService";

const update = async (body) => {
    const res = await axios.post('http://localhost:3000/rate/update',
        body,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then((res) => APIService.handleResponseSuccess(res))
        .catch((res) => APIService.handleResponse(res))

    return res;
}

const detail = async ({productId}) => {
    const res = await axios.get(`http://localhost:3000/rate/${productId}/detail`,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then((res) => APIService.handleResponseSuccess(res))
        .catch((res) => APIService.handleResponse(res))

    return res;
}

export default {
    update,
    detail,
}