import {Form, Input, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {DownSquareOutlined, UpSquareOutlined} from "@ant-design/icons";
import AuthService from "../../service/AuthService";
import FetchData from "../api/Fetch.api";

const CreateTransaction = ({setOpen, setOpenInfo, product, handleTransaction}) => {
    const [size, setSize] = useState(undefined);
    const [isBuyerInfo, setIsBuyerInfo] = useState(false);
    const [count, setCount] = useState(1);
    const [name, setName] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (AuthService.isLoggedIn) {
            FetchData.authAPI.getUser().then((user) => {
                console.log(user);
                setName(user.fullname);
                setNumberPhone(user.numberPhone);
                setAddress(user.address);
            })
        }
    }, []);

    return (
        <Modal
            title={isBuyerInfo ? "Nhập thông tin cá nhân" : "Nhập thông tin sản phẩm"}
            centered
            open={true}
            onOk={() => {
                if (!isBuyerInfo) {
                    setIsBuyerInfo(true);
                } else {
                    handleTransaction({
                        isAccept: true,
                        buyerInfo: {
                            name: name,
                            numberPhone: numberPhone,
                            address: address,
                            size: size,
                            count: count,
                        }
                    })
                }
            }}
            // height="300px"
            okText="Tiếp tục"
            cancelText={isBuyerInfo ? "Quay lại" : "Hủy"}
            onCancel={() => {
                if (isBuyerInfo) {
                    setIsBuyerInfo(false);
                } else {
                    setOpen(false);
                }
            }}
            width={600}>
            <div style={{height: '200px'}}>
                {!isBuyerInfo && <div style={{marginLeft: "150px", alignItems: "center"}}>
                    <nav style={{height: '50px'}}/>
                    <div style={{display: "flex", marginBottom: "8px", alignItems: "center"}}>
                        <div style={{flex: 2, textAlign: "right", marginRight: "15px"}}>
                            Kích thước:
                        </div>
                        <div style={{flex: 6, display: "flex"}}>
                            <Select
                                defaultValue="choose"
                                style={{
                                    width: "150px",
                                }}
                                onChange={(value) => setSize(value)}
                                options={product.sizes.map(size => {
                                    return {
                                        label: size, value: size
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "8px"}}>
                        <div style={{flex: 2, textAlign: "right", marginRight: "15px"}}>
                            Số lượng:
                        </div>
                        <div style={{flex: 6, display: "flex"}}>
                            <DownSquareOutlined onClick={() => {if (count > 1) setCount(count - 1);}}/>
                            <p style={{margin: '0 5px', color: "black"}}>{`${count}`}</p>
                            <UpSquareOutlined onClick={() => {setCount(count + 1);}}/>
                        </div>
                    </div>
                    <div style={{display: "flex", marginBottom: "8px"}}>
                        <div style={{flex: 2, textAlign: "right", marginRight: "15px"}}>
                            Tổng tiền:
                        </div>
                        <div style={{flex: 6}}>
                            {(count * product.price).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                        </div>
                    </div>
                </div>}
                {isBuyerInfo && <div style={{alignItems: "center", textAlign: "center"}}>
                    <nav style={{height: "30px"}}/>
                    <Form
                        labelCol={{span: 8,}}
                        wrapperCol={{span: 12,}}>
                        <Form.Item
                            label="Họ&Tên">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ">
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại">
                            <Input
                                type="number"
                                value={numberPhone}
                                onChange={(e) => setNumberPhone(e.target.value)}
                            />
                        </Form.Item>
                    </Form>
                    <nav style={{height: "30px"}}/>
                </div>}
            </div>
        </Modal>
    )
}

export default CreateTransaction;