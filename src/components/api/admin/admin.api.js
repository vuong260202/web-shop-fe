import axios from "axios";
import APIService from "../../../service/APIService";

const categoryAPI = {
    upload: async (formData) => {
        const res = await axios.post( "http://localhost:3000/admin/upload-category", formData,
            {headers: {
                    'Content-Type': `multipart/form-data`,
                }})
            .then((res) => res.data)
            .catch((response) => APIService.handleResponse(response))

        console.log(res);

        return res;
    },
}

const productAPI = {
    upload: async (formData) => {
    const res = await axios.post(
        "http://localhost:3000/admin/upload-product",
        formData,
        {
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        }
    ).then((res) => res.data)
        .catch((response) => APIService.handleResponse(response))

    console.log(res);

    return res;
}
}

export default {
    categoryAPI,
    productAPI,
}