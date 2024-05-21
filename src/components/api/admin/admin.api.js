import axios from "axios";
import APIService from "../../../utils/APIUtil";
import AuthService from "../../../utils/AuthUtil";
import CONFIG from "../../../config";
import ServerAPI from "../../../utils/serverAPI";

const categoryAPI = {
    upload: async (formData) => {
        const res = await axios.post("http://localhost:3000/admin/upload-category", formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: `Bearer ${AuthService.getToken()}`
                }
            })
            .then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))

        return res;
    },
    delete: async (body) => {
        const res = await axios.post(
            CONFIG.server.url + ServerAPI.url.deleteCategory,
            body,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then(response => APIService.handleResponseSuccess(response))
            .catch(response => APIService.handleResponse(response))

        return res;
    },
    update: async (body) => {
        const res = await axios.post(
            CONFIG.server.url + ServerAPI.url.updateCategory,
            body,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then(response => APIService.handleResponseSuccess(response))
            .catch(response => APIService.handleResponse(response))

        return res;
    },
    updateStatus: async (body) => {
        const res = await axios.post(
            "http://localhost:3000/admin/update-category-status",
            body,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    }
}

const productAPI = {
    upload: async (formData) => {
        const res = await axios.post(
            "http://localhost:3000/admin/upload-product",
            formData,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: `Bearer ${AuthService.getToken()}`
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    },
    update: async (body) => {
        const res = await axios.post(
            "http://localhost:3000/admin/update-product",
            body,
            {
                headers: {
                    'Content-Type': `multipart/form-data`,
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    },
    delete: async (body) => {
        const res = await axios.post(
            "http://localhost:3000/admin/delete-product",
            body,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    },
    updateStatus: async (body) => {
        const res = await axios.post(
            "http://localhost:3000/admin/update-product-status",
            body,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
           .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    }
}

const transactionAPI = {
    update: async (data) => {
        const res = await axios.post(
            "http://localhost:3000/admin/update-transaction",
            data,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            }
        ).then((res) => APIService.handleResponseSuccess(res))
            .catch((response) => APIService.handleResponse(response))


        console.log(res);

        return res;
    }
}

export default {
    categoryAPI,
    productAPI,
    transactionAPI,
}