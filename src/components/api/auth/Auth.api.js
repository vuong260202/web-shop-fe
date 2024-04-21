import axios from "axios";
import AuthService from "../../../service/AuthService";
import CONFIG from "../../../config"
import serverAPI from "../../../utils/serverAPI";
import APIService from "../../../service/APIService";

const getRole = async () => {
    try {
        const res = await axios.get("http://localhost:3000/auth/get-role", {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};

const login = async (conditions) => {
    try {
        console.log(conditions);
        const response = await axios.post(
            "http://localhost:3000/auth/login",
            conditions
        );

        return response.data;
    } catch (error) {
        return error.response;
        console.error("Error fetching product:", error);
    }
};

const signup = async (attributes) => {
    try {
        const res = await axios.post("http://localhost:3000/auth/signup", attributes);

        return res;
    } catch (error) {
        return error.response;
    }
};

const logout = async () => {
    try {
        const res = await axios.get("http://localhost:3000/auth/logout", {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

const resetPassword = async (body) => {
    const response = await axios.put(
        CONFIG.server.url + serverAPI.url.resetPassword,
        body
    ).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return response;
};

const sendRequestToMail = async (body) => {
    const response = await axios.post(
        CONFIG.server.url + serverAPI.url.sendRequestToMail,
        body
    ).then(response => APIService.handleResponseSuccess(response))
        .catch(response => APIService.handleResponse(response));

    return response;
};

const updatePassword = async (body) => {
    const response = await axios.put(
        CONFIG.server.url + serverAPI.url.changePassword,
        body,
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            },
        }
    ).then(res => APIService.handleResponseSuccess(res))
        .catch(res => APIService.handleResponse(res));

    return response;
};

export default {
    getRole,
    login,
    logout,
    signup,
    resetPassword,
    updatePassword,
    sendRequestToMail,
}