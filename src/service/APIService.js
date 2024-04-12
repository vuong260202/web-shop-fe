

const handleResponse = (response) => {
    const data = response.response;

    switch (data.status) {
        case 400:
            console.log("status 400")
            return data.data;
        case 401:
            console.log("status 401")
            return data.data;
        default:
            return null;
    }
}

export default {
    handleResponse,
}