import axios from "axios";
import AuthService from "../../../service/AuthService";
import APIService from "../../../service/APIService";

const all = async () => {
    const res = await axios.get("http://localhost:3000/category/all", {
        headers: {
            Authorization: `Bearer ${AuthService.getToken()}`,
        },
    }).then(response => response.data.data)
        .catch(response => APIService.handleResponse(response))

    return res;
}

const update = () => {

}

export default {
    all,
    update,
}