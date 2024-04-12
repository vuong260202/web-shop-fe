import {Button, Form, Input, notification, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import FetchApi from "../../api/Fetch.api";
import UploadCategoryForm from "../../form/UploadCategory.form";
import message from "../../../service/MessageService";

const Category = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const handleCategory = (formData) => {
        console.log(formData);

        FetchApi.admin.categoryAPI.upload(formData).then((response) => {
            if (response.status === 200) {
                openNotification(message.contextType.uploadSuccess)
            } else {
                openNotification(message.contextType.categoryDoesNotExist)
            }
        })
    }

    useEffect(() => {
    }, []);

    return (<div style={{textAlign: "left", marginLeft: "20px", alignItems: "center"}}>
            <UploadCategoryForm handleCategory={handleCategory}/>
        {contextHolder}
        </div>);
}

export default Category;