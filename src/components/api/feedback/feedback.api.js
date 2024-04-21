import axios from "axios";
import AuthService from "../../../service/AuthService";
import APIService from "../../../service/APIService";

const addFeedback = async (body) => {
    const res = await axios.post('http://localhost:3000/feedback/create', body, {
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
    }).then(response => APIService.handleResponseSuccess(response))
    .catch(response => APIService.handleResponse(response))

    return res;
}

export default {
    addFeedback,
};