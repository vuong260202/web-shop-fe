import {Button, Form, Input, Select} from "antd";
import React, {useState} from "react";

const UploadProduct = ({handleProduct, handleFileChange, data}) => {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState(null);
    const [category, setCategory] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [price, setPrice] = useState(null);
    const [total, setTotal] = useState(null);

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
            <input type="file" style={{height: "20px"}} onChange={(event) => {
                setFile(event.target.files[0]);
                handleFileChange(event);
            }}/>
        </Form.Item>

        <Form.Item style={{marginLeft: "70px"}}>
            <Button type="primary" htmlType="submit" onClick={handleClick}>Thêm</Button>
        </Form.Item>
    </Form>);
}

export default UploadProduct;