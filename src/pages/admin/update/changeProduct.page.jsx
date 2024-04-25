import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FetchApi from "../../../components/api/Fetch.api";
import Header from "../../../components/header/Header";
import {Button, Input, notification, Rate, Select} from "antd";
import MessageService from "../../../service/MessageService";
import FooterComponent from "../../../components/footer/FooterComponent";


const ChangeProductPage = () => {
    const {productId} = useParams();
    const [categoryOptions, setCategoryOptions] = useState();
    const [product, setProduct] = useState();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [category, setCategory] = useState(null);
    const [sizes, setSizes] = useState(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [api, contextHolder] = notification.useNotification();


    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        FetchApi.productAPI.detail(productId).then((response) => {
            setProduct(response);
            setProductName(response.productName);
            setPrice(response.price);
            setSizes(response.sizes.map(String));
            setDescription(response.description);
            setCategory({
                value: response.categoryId,
                label: response.category
            });
            setTotal(response.total);
        })
        FetchApi.categoryAPI.all().then(res => {
            setCategoryOptions(res.map(category => {
                return {
                    value: category.id,
                    label: category.categoryName,
                }
            }))
        })
    }, [productId]);

    const handleClick = () => {
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("sizes", `[${sizes}]`);
        formData.append("categoryId", category.value);
        formData.append("total", total);
        formData.append("description", description);
        formData.append("file", file);

        FetchApi.admin.productAPI.update(formData).then((res) => {
            if (res?.status === 200) {
                openNotification(MessageService.contextType.success.updateProduct);
                window.location.reload();
            }
        })
    }

    return (<div>
        <Header/>
        {contextHolder}
        {product && <div style={{display: "flex", padding: "30px 30px"}}>
            <div style={{flex: 2.8, backgroundColor: "#eacbcb", width: "300px"}}>
                {file ? <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected`}
                    style={{width: "500px", height: "auto"}}
                /> : <img
                    src={"http://localhost:3001" + product.path}
                    alt={`Product ${product.id}`}
                    style={{width: "500px", height: "auto"}}
                />}
                <input type="file" style={{height: "20px"}} onChange={(event) => {
                    setFile(event.target.files[0]);
                }}/>
            </div>
            <div className={"product-info"}>
                <div style={{margin: "30px 30px", fontSize: "18px"}}>
                    <div style={{display: "flex", marginBottom: "30px"}}>
                        <div style={{flex: 2}}>
                            <div>Tên sản phẩm:</div>
                        </div>
                        <div style={{flex: 6}}>
                            <Input
                                defaultValue={productName}
                                style={{width: "300px"}}
                                onChange={(e) => setProductName(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "30px"}}>
                        <div style={{flex: 2}}>
                            Hãng:
                        </div>
                        <div style={{flex: 6}}>
                            <Select
                                defaultValue={category}
                                style={{
                                    width: "300px",
                                }}
                                onChange={(value, category) => setCategory(category)}
                                options={categoryOptions}
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "30px"}}>
                        <div style={{flex: 2}}>
                            Mô tả:
                        </div>
                        <div style={{flex: 6}}>
                            <Input.TextArea
                                defaultValue={description}
                                style={{width: "400px", height: "100px", backgroundColor: "white"}}
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "30px"}}>
                        <div style={{flex: 2}}>
                            Sizes:
                        </div>
                        <div style={{flex: 6}}>
                            <Input
                                defaultValue={sizes}
                                style={{width: "300px"}}
                                onChange={(e) => {
                                    let input = e.target.value.toString();
                                    let hasComma = false;

                                    input = input.split('').filter((char, index) => {
                                        if (char === ',' && (!hasComma || input[index - 1] !== ',')) {
                                            hasComma = true;
                                            return true;
                                        }

                                        return /[0-9\b]/.test(char);
                                    }).join('');

                                    setSizes(input);
                                }}
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "30px"}}>
                        <div style={{flex: 2}}>
                            Giá bán:
                        </div>
                        <div style={{flex: 6}}>
                            <Input
                                type="number"
                                defaultValue={price}
                                style={{width: "300px"}} onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "10px"}}>
                        <div style={{flex: 2}}>
                            Số lượng:
                        </div>
                        <div style={{flex: 6}}>
                            <Input
                                type="number"
                                defaultValue={total}
                                style={{width: "300px"}}
                                onChange={(e) => setTotal(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    <Button style={{backgroundColor: "#6d7af5"}}
                            onClick={handleClick}>Lưu</Button>
                </div>
            </div>
        </div>}

        <FooterComponent />
    </div>)
}

export default ChangeProductPage;