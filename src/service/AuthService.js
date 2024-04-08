let isLoggedIn = () => {
    return localStorage.getItem("token") && (localStorage.getItem("token") !== 'undefined');
};
let getRole = () => {
    return localStorage.getItem("role");
};

let getToken = () => {
    return localStorage.getItem("token");
};

let deleteTokenAndRole = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

let isAdmin = () => {
    return localStorage.getItem("role") === 'admin';
};
let isUser = () => {
    return localStorage.getItem("role") === 'user';
};

let setInfoAccount = (data) => {
    localStorage.setItem('role', data.role)
    localStorage.setItem('token', data.token)

    console.log("Account role: " + data.role);
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