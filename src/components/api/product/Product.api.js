import axios from "axios";
import APIService from "../../../service/APIService";

const update = async (body) => {
    console.log('body:', body);
    try {
        const res = await axios.post("http://localhost:3000/product/update-product", body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        console.log(res);
        return res.data.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.setItem("token", "null");
        }

        console.error("Error fetching product:", error);
    }
};

const detail = async (id) => {
    console.log("id: ", id);

    const response = await axios.get(
        `http://localhost:3000/product/product-detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    )
        .then(response => response.data.data)
        .catch(res => APIService.handleResponse(res));

    return response;
};

export default {
    update,
    detail,
    filters,
}