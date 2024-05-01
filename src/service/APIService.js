const handleResponse = (response) => {
    // console.log(response)
    const data = response.response;
    console.log(data);
    switch (data?.status) {
        case 400:
            console.log("status 400")
            return data?.data;
        case 401:
            console.log("status 401")
            return data?.data;
        default:
            return null;
    }
}

const handleResponseSuccess = (response) => {
    console.log(response);
    return response.data.data ?? response.data;
}

export default {
    handleResponse,
    handleResponseSuccess,
}