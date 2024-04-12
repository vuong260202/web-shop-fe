import {Button, Drawer, Form, Input, notification, Rate, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FetchData from "../../components/api/Fetch.api";
import Header from "../../components/header/Header";
import AuthService from "../../service/AuthService";
import "../../style/ProductDetail.css"
import message from "../../service/MessageService";
import {DownSquareOutlined, UpSquareOutlined} from '@ant-design/icons';

const ProductDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [rate, setRate] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [size, setSize] = useState(0);
    const [numberPhone, setNumberPhone] = useState('');
    const [address, setAddress] = useState('');
    const [count, setCount] = useState(1);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topLeft',
        });
    };

    const handleTransaction = ({isAccept}) => {
        if (!AuthService.isLoggedIn() && isAccept) {
            if (name === '') {
                openNotification(message.contextType.fieldEmpty.name);
                return false;
            }

            if (numberPhone === '') {
                openNotification(message.contextType.fieldEmpty.numberPhone)
                return false;
            }

            if (address === '') {
                openNotification(message.contextType.fieldEmpty.address)
                return false;
            }
        }

        if (AuthService.isLoggedIn() || isAccept) {

            let productId = product.id;
            let conditions = {
                productId,
                name,
                size,
                numberPhone,
                address,
                count,
                total: count * product.price,
            }

            FetchData.transactionAPI.add(conditions).then((res) => {
                console.log(res);
                if (res) {
                    openNotification(message.contextType.success.buy);
                    navigate('/transaction/history');
                }
            });
        } else {
            setShowForm(true);
        }
    };

    const handleShoppingCart = (search) => {
    }

    const handleIncNumber = () => {
        setCount(count + 1);
    }

    const handleDecNumber = () => {
        if (count > 1)
            setCount(count -1);
    }

    const onClose = () => {
        setShowForm(false);
    };

    useEffect(() => {
        FetchData.productAPI.detail(id)
            .then((res) => {
                console.log(res);
                if (!res) {
                    navigate('/')
                    return;
                }

                console.log(">>>" + res);
                setProduct(res);
            })
    }, [id]);

    return (
        <div>
            <Header/>
            {product && <div style={{display: "flex", padding: "30px 30px"}}>
                <div style={{flex: 2.8, backgroundColor: "#eacbcb", width: "300px"}}>
                    <img
                        src={"http://localhost:3001" + product.path}
                        alt={`Product ${product.id}`}
                        style={{width: "500px", height: "auto"}}
                    />
                </div>
                <div className={"product-info"}>
                    <div className={"product-information"}>
                        <h3>{product.productName}</h3>
                        <div>
                            <a>Mô tả: </a>
                        </div>
                        <div>
                            <a>Số lượng đã bán: </a>
                        </div>
                        <div>
                            Đánh giá: <Rate defaultValue={rate} onChange={(value) => setRate(value)}/>
                        </div>
                        <div>
                            <a>Giá bán: {product.price}</a>
                        </div>
                        <div>
                            <a>Số lượng: </a>
                            <DownSquareOutlined onClick={handleDecNumber}/>
                            {` ${count}`} <UpSquareOutlined onClick={handleIncNumber}/>
                        </div>
                        <a>Tổng tiền: {count * product.price} </a>
                    </div>
                    <div className={"product-button-detail"}>
                        <Button style={{backgroundColor: "#458fc5"}} onClick={handleTransaction}>Mua</Button>
                        <Button style={{backgroundColor: "#458fc5"}} onClick={handleShoppingCart}>Thêm vào giỏ hàng</Button>
                    </div>
                </div>
            </div>}
            <>
                <Drawer title={"Thông tin cá nhân"} onClose={onClose} open={showForm}>
                    <Form>
                        <Form.Item label="Họ&Tên">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value.trim())}
                            />
                        </Form.Item>
                        <Form.Item label="Địa chỉ">
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value.trim())}
                            />
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            <Input
                                type="number"
                                value={numberPhone}
                                onChange={(e) => setNumberPhone(e.target.value.trim())}
                            />
                        </Form.Item>
                    </Form>
                    <Button style={{backgroundColor: "#458fc5"}} onClick={() => {handleTransaction({isAccept: true})}}>Xác nhận</Button>
                </Drawer>
            </>)

            {contextHolder}
        </div>
    )
};

export default ProductDetail;
