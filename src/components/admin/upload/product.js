import {notification} from "antd";
import React, {useEffect, useState} from "react";
import FetchApi from "../../api/Fetch.api";
import UploadProduct from "../../form/UploadProduct.form";
import message from "../../../dto/message.dto";
import {useNavigate} from "react-router-dom";

const Product = () => {
    const [data, setData] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const handleProduct = (formData) => {
        console.log(formData);
        FetchApi.admin.productAPI.upload(formData).then((res) => {
            console.log(res);
            if (res.status === 400) {
                openNotification(message.contextType.doesNotExist.product);
            } else if (res.status === 200) {
                openNotification(message.contextType.success.upload);
                setTimeout(() => navigate("/") , 3000)
                console.log("upload success");
            } else {
                console.log("Server error");
            }

        });
    }

    useEffect(() => {
        // setImageUrl(undefined);
        FetchApi.categoryAPI.filter().then(res => {
            setData(res?.map(category => {
                return {
                    value: category.id,
                    label: category.categoryName,
                }
            }))
        })
    }, []);

    return (
        <div style={{textAlign: "center", alignItems: "center", marginLeft: "130px"}}>
                <UploadProduct
                    handleProduct={handleProduct}
                    data={data}
                />
                {contextHolder}
        </div>
    )
}

export default Product;