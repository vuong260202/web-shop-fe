import axios from "axios";

const getRole = async () => {
    try {
        const res = await axios.get("http://localhost:3000/auth/get-role", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

const forgotPassword = async (attributes) => {
    try {
        const res = await axios.post("http://localhost:3000/auth/signup", attributes);

        return res;
    } catch (error) {
        return error.response;
    }
};

const updatePassword = async (attributes) => {
    try {
        const res = await axios.post("http://localhost:3000/auth/signup", attributes);

        return res;
    } catch (error) {
        return error.response;
    }
};

export default {
    getRole,
    login,
    signup,
    forgotPassword,
    updatePassword,
}