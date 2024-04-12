import axios from "axios";
import AuthService from "../../../service/AuthService";
import APIService from "../../../service/APIService";

const add = async (conditions) => {
    const response = await axios.post(
        `http://localhost:3000/transaction/add-transaction`,
        conditions,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    ).then(response => response.data.data).catch(response => APIService.handleResponse(response))


    return response;
};

const filters = async (body) => {
    console.log(body);
    const res = await axios.post("http://localhost:3000/transaction/filter-transactions", body, {
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
    }).catch(response => APIService.handleResponse(response))
        .then(response => response.data.data)

    return res;
};
const remove = async (body) => {
    try {
        const res = await axios.post("http://localhost:3000/transaction/delete-transactions", body, {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }).then(res => res.data.data)
            .catch(response => APIService.handleResponse(response))

        console.log(res);
        return res;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.setItem("token", "null");
        }

        console.error("Error fetching product:", error);
    }
};

export default {
    add,
    filters,
    remove,
}