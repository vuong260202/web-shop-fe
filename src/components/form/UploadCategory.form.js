import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import message from "../../dto/message.dto";

const UploadCategoryForm = ({handleClick}) => {
    const [file, setFile] = useState(null);
    const [categoryName, setCategoryName] = useState(null);
    const [imageUrl, setImageUrl] = useState(undefined);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        handleImage(e);
    }

    const handleImage = (event) => {
        try {
            const selectedFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } catch (e) {
            setImageUrl(undefined);
        }

    };

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
                    <div style={{display: "flex"}}>
                        <input type="file" style={{height: "20px"}} onChange={handleFile}/>
                        <div style={{height: '50px'}}>
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Selected"
                                    style={{maxWidth: '50%', maxHeight: '200px'}}
                                />
                            )}
                        </div>
                    </div>

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