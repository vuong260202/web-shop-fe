import {notification} from "antd";
import React, {useEffect, useState} from "react";
import FetchApi from "../../api/Fetch.api";
import UploadCategoryForm from "../../form/UploadCategory.form";
import message from "../../../dto/message.dto";
import UploadProduct from "../../form/UploadProduct.form";

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
            console.log(response);
            if (response?.status === 200) {
                openNotification(message.contextType.success.upload)
            } else {
                openNotification(message.contextType.doesNotExist.category)
            }
        })
    }

    function handleClick(form) {
        console.log(form.categoryName);
        if (form.categoryName === null || form.categoryName === "") {
            openNotification(message.contextType.fieldEmpty.name);
            return false;
        }

        if (form.file === null) {
            openNotification(message.contextType.fieldEmpty.file);
            return false;
        }

        let formData = new FormData();

        formData.append("categoryName", form.categoryName);
        formData.append("file", form.file);

        handleCategory(formData);
    }

    return (<div style={{textAlign: "center", alignItems: "center", marginLeft: "20px", height: "380px", display: "flex"}}>
        <div style={{marginTop: "0px", marginLeft: "130px"}}>
            <UploadCategoryForm
                handleClick={handleClick}
            />
        </div>
        {contextHolder}
    </div>);
}

export default Category;