import {Button, Form, Input, Select} from "antd";
import React, {useState} from "react";

const UploadProduct = ({handleProduct, data}) => {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState(null);
    const [category, setCategory] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [price, setPrice] = useState(null);
    const [total, setTotal] = useState(null);
    const [imageUrl, setImageUrl] = useState(undefined);

    const handleClick = () => {
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("sizes", sizes);
        formData.append("categoryId", category.value);
        formData.append("total", total);
        formData.append("file", file);

        handleProduct(formData)
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        try {
            const selectedFile = event.target.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } catch (e) {
            setImageUrl(undefined);
            // console.log(e);
        }
    };

    return (<Form
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
            label="Tên sản phẩm"
            name="productName"
        >
            <Input style={{
                width: "300px",
            }} onChange={(e) => setProductName(e.target.value)}/>
        </Form.Item>

        <Form.Item
            label="Hãng"
            name="categoryName"
        >
            <Select
                defaultValue="Choose"
                style={{
                    width: "300px",
                }}
                onChange={(value, category) => setCategory(category)}
                options={data}
            />
        </Form.Item>
        <Form.Item
            label="Kích thước"
            name="sizes"
        >
            <Input style={{
                width: "300px",
            }} onChange={(e) => setSizes(e.target.value)}/>
        </Form.Item>
        <Form.Item
            label="Giá"
            name="price"
        >
            <Input style={{
                width: "300px",
            }} onChange={(e) => setPrice(e.target.value)}/>
        </Form.Item>
        <Form.Item
            label="Số lượng"
            name="total"
        >
            <Input style={{
                width: "300px",
            }} onChange={(e) => setTotal(e.target.value)} type={"number"}/>
        </Form.Item>
        <Form.Item
            label="Ảnh"
            name="file"
            style={{alignItems: "center"}}
        >
            <div style={{display: "flex"}}>
                <input type="file" style={{height: "20px"}} onChange={(event) => handleFileChange(event)}/>

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

        <Form.Item style={{marginLeft: "140px"}}>
            <Button type="primary" htmlType="submit" onClick={handleClick}>Thêm</Button>
        </Form.Item>
    </Form>);
}

export default UploadProduct;