import axios from "axios";
import AuthService from "../../../utils/AuthUtil";
import APIService from "../../../utils/APIUtil";
import ServerAPI from "../../../utils/serverAPI";
import CONFIG from "../../../config"

const filter = async (body) => {
    const res = await axios.post(
        CONFIG.server.url + "/category/filter",
        body,
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

const filterStatistic = async (conditions) => {
    const response = await axios.post(
        "http://localhost:3000/category/filter-statistic",
        conditions,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }
    )
        .then(response => response.data.data)
        .catch(res => APIService.handleResponse(res));

    return response;
};

export default {
    filter,
    update,
    detail,
    filterStatistic,
}