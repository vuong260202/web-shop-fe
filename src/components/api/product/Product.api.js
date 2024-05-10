import axios from "axios";
import APIService from "../../../service/APIService";
import AuthService from "../../../service/AuthService";
import CONFIG from "../../../config";
import serverAPI from "../../../utils/serverAPI";

const update = async (body) => {
    console.log('body:', body);
    try {
        const res = await axios.post("http://localhost:3000/product/update-product", body, {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        });

        console.log(res);
        return res.data.data;
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};

const detail = async (id) => {
    console.log("id: ", id);

    const response = await axios.get(
        `http://localhost:3000/product/product-detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }
    ).then(response => response.data.data)
        .catch(response => APIService.handleResponse(response));
    console.log("response: ", response);
    return response;
};

const filters = async (conditions) => {
    const response = await axios.post(
        "http://localhost:3000/product/filter-product",
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

const filterStatistic = async (conditions) => {
    const response = await axios.post(
        "http://localhost:3000/product/filter-statistic",
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

const getProductNames = async (body) => {
    const response = await axios.get(CONFIG.server.url + serverAPI.url.product.getAllProductNames + `/${body.query}`)
        .then(res => APIService.handleResponseSuccess(res))
        .catch(res => APIService.handleResponse(res));

    return response;
}

export default {
    update,
    detail,
    filters,
    filterStatistic,
    getProductNames
}