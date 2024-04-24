import axios from "axios";
import AuthService from "../../../service/AuthService";
import APIService from "../../../service/APIService";

const add = async (conditions) => {
    const response = await axios.post(
        `http://localhost:3000/transaction/add-transaction`,
        conditions,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
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
    }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response))


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
        console.error("Error fetching product:", error);
    }
};

const getTransactionUser = async ({productId}) => {
    const res = await axios.get(`https://localhost:3000/transaction/${productId}/transaction-detail`, {
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        }
    }).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    console.log(res);

    return res;
}

export default {
    add,
    filters,
    remove,
    getTransactionUser,
}