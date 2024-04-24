import dataType from "../utils/dataType";

let isLoggedIn = () => {
    return localStorage.getItem("token") && localStorage.getItem("token") !== 'undefined';
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
    delete dataType.isOnline[`${localStorage.getItem('username')}`];
};

let isAdmin = () => {
    return isLoggedIn() && localStorage.getItem('role') === 'admin';
};
let isUser = () => {
    return isLoggedIn() && localStorage.getItem('token') !== 'admin';
};

let setInfoAccount = (data) => {
    localStorage.setItem('token', data.token);
    dataType.isOnline[`${data.username}`] = true;
    localStorage.setItem('username', data.username);
    if (data.role === 'admin') {
        localStorage.setItem('role', 'admin');
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