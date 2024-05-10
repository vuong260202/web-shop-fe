import {Form, Input, Modal} from "antd";
import FetchData from "../api/Fetch.api";
import React, {useEffect, useState} from "react";
import AuthService from "../../service/AuthService";


const BuyerInfo = ({setOpen, handleTransaction}) => {
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
            title="Nhập thông tin cá nhân"
            centered
            open={true}
            onOk={() => {
                handleTransaction({
                    isAccept: true,
                    buyerInfo: {
                        name: name,
                        numberPhone: numberPhone,
                        address: address,
                    }
                })
            }}
            onCancel={() => {setOpen(false)}}
            width={600}>
            <div style={{alignItems: "center", textAlign: "center"}}>
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
            </div>
        </Modal>
    )
}

export default BuyerInfo;