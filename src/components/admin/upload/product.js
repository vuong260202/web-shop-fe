import {Button, Checkbox, Form, Input, notification, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import FetchApi from "../../api/Fetch.api";
import UploadProduct from "../../form/UploadProduct.form";
import message from "../../../service/MessageService";

const Product = () => {
    const [data, setData] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };
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
            if (res.status === 200) {
                openNotification(message.contextType.uploadSuccess);
            }
            console.log("upload success");
        });
    }

    useEffect(() => {
        FetchApi.categoryAPI.all().then(res => {
            setData(res.categories.map(category => {
                return {
                    value: category.id,
                    label: category.categoryName,
                }
            }))
        })
    }, []);

    return (
            <div style={{textAlign: "center", alignItems: "center", marginLeft: "20px", display: "flex", flex: 4}}>
                <div style={{flex: 3}}>
                    <UploadProduct
                        handleProduct={handleProduct}
                        handleFileChange={handleFileChange}
                        data={data}
                    />
                </div>
                <div style={{flex: 3, textAlign: "left"}}>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Selected"
                            style={{maxWidth: '100%', maxHeight: '250px'}}
                        />
                    )}
                </div>
                {contextHolder}
            </div>
    )
}

export default Product;