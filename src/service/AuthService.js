import dataType from "../utils/dataType";
import FetchApi from "../components/api/Fetch.api";
import webService from "./webService";

let isLoggedIn = () => {
    return localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
};

let getRole = () => {
    return localStorage.getItem('role') ?? 'user';
};

let getToken = () => {
    return localStorage.getItem("token");
};

let deleteTokenAndRole = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('googleId');
};

let isAdmin = () => {
    return isLoggedIn() && localStorage.getItem('role') === 'admin';
};
let isUser = () => {
    return isLoggedIn() && localStorage.getItem('token') !== 'admin';
};

let setInfoAccount = (data) => {
    localStorage.setItem('token', data.token);
    if (data.role === 'admin') {
        localStorage.setItem('role', 'admin');
    }

    if (data.googleId) {
        localStorage.setItem('googleId', data.googleId);
    }
};

export default {
    isLoggedIn,
    isAdmin,
    isUser,
    getToken,
    getRole,
    deleteTokenAndRole,
    setInfoAccount,
}