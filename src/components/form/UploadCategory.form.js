import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import message from "../../dto/message.dto";

const UploadCategoryForm = ({handleClick, handleImage}) => {
    const [file, setFile] = useState(null);
    const [categoryName, setCategoryName] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        handleImage(e);
    }

    return (
        <div>
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
                >
                    <Input style={{
                        width: "300px",
                    }} onChange={((e) => setCategoryName(e.target.value))}/>
                </Form.Item>
                <Form.Item
                    label="Ảnh"
                    name="file"
                    style={{alignItems: "center"}}
                >
                    <input type="file" style={{height: "20px"}} onChange={handleFile}/>
                </Form.Item>
                <Form.Item style={{marginLeft: "70px"}}>
                    <Button type="primary" htmlType="submit" onClick={() => handleClick({
                        categoryName: categoryName,
                        file: file,
                    })}>Thêm</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UploadCategoryForm;