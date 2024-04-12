import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import message from "../../service/MessageService";
import FetchApi from "../api/Fetch.api";

const UploadCategoryForm = ({handleCategory}) => {
    const [file, setFile] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    function handleClick() {
        console.log(categoryName);
        if (categoryName === null || categoryName === "") {
            openNotification(message.contextType.fieldEmpty.name);
            return false;
        }

        if (file === null) {
            openNotification(message.contextType.fieldEmpty.file);
            return false;
        }

        let formData = new FormData();

        formData.append("categoryName", categoryName);
        formData.append("file", file);

        handleCategory(formData);
    }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 13,
            }}
            style={{
                maxWidth: 600,
                marginTop: "20px",
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="Tên hãng"
                name="categoryName"
                    placeholder="Nhập tên hãng"
                    rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input onChange={((e) => setCategoryName(e.target.value))}/>
            </Form.Item>
            <Form.Item
                label="Ảnh"
                name="file"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
            </Form.Item>
            <Form.Item style={{alignItems: "center", textAlign: "center"}}>
                <Button onClick={handleClick}>Upload</Button>
            </Form.Item>
            {contextHolder}
        </Form>
    )
}

export default UploadCategoryForm;