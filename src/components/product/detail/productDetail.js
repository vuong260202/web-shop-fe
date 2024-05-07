import Header from "../../header/Header";
import {Button, Drawer, Form, Input, Modal, notification, Rate, Select} from "antd";
import {DownSquareOutlined, UpSquareOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import AuthService from "../../../service/AuthService";
import message from "../../../service/MessageService";
import FetchData from "../../api/Fetch.api";
import {useNavigate} from "react-router-dom";

const Detail = ({product}) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [address, setAddress] = useState('');
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(undefined);
    const [showForm, setShowForm] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [open, setOpen] = useState(false);

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topLeft',
        });
    };

    const handleIncNumber = () => {
        setCount(count + 1)
    }

    const handleDecNumber = () => {
        if (count > 1)
            setCount(count - 1);
    }

    const handleTransaction = ({isAccept}) => {
        if (isAccept) {
            if (name.trim() === '') {
                openNotification(message.contextType.fieldEmpty.name);
                return false;
            }

            if (numberPhone.trim() === '') {
                openNotification(message.contextType.fieldEmpty.numberPhone)
                return false;
            }

            if (address.trim() === '') {
                openNotification(message.contextType.fieldEmpty.address)
                return false;
            }
        }

        if (!size) {
            openNotification(message.contextType.fieldEmpty.size)
            return false;
        }

        if (isAccept) {
            let productId = product.id;
            let conditions = {
                productId,
                name: name.trim(),
                size,
                numberPhone: numberPhone.trim(),
                address: address.trim(),
                count,
                total: count * product.price,
            }

            FetchData.transactionAPI.add(conditions).then((res) => {
                console.log(res);
                if (res) {
                    setOpen(false)
                    openNotification(message.contextType.success.buy);
                    if (AuthService.isLoggedIn()) {
                        setTimeout(() => navigate('/transaction/history'), 3000)
                    }

                }
            });
        } else {
            // setShowForm(true);
            setOpen(true);
        }
    };

    const handleShoppingCart = (search) => {
    }

    const onClose = () => {
        setShowForm(false);
    };

    return (
        <div>
            {contextHolder}
            {product && <div style={{display: "flex", padding: "30px 30px"}}>
                <div style={{
                    flex: 3.2,
                    backgroundColor: "#eacbcb",
                    width: "300px",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{flexGrow: 3, margin: "2px"}}>
                        <img
                            src={"http://localhost:3001" + product.path}
                            alt={`Product ${product.id}`}
                            style={{width: "100%", height: "80%"}}
                        />
                    </div>
                    <div style={{flexGrow: 2, }}>
                        <div style={{margin: '5px'}}
                            onClick={() => {
                                console.log(">>>")
                            }}>
                            <img
                                src={"http://localhost:3001" + product.path}
                                alt={`Product ${product.id}`}
                                style={{height: '50px'}}
                            />
                        </div>
                    </div>
                </div>
                <div style={{flex: 4, backgroundColor: "#f1dede", display: "flex", flexDirection: "column"}}>
                    <div className={"product-information"} style={{flexGrow: 8}}>
                        <h3>{product.productName}</h3>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Đánh giá chung:
                            </div>
                            <div style={{flex: 6}}>
                                <Rate disabled defaultValue={product.productStatistic.totalRate}/>
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Hãng:
                            </div>
                            <div style={{flex: 6}}>
                                {product.category}
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Mô tả:
                            </div>
                            <div style={{flex: 6}}>
                                {product.description}
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Số lượng đã bán:
                            </div>
                            <div style={{flex: 6}}>
                                {product.productStatistic.totalCount}
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Giá bán:
                            </div>
                            <div style={{flex: 6}}>
                                {product.price}
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px", alignItems: "center"}}>
                            <div style={{flex: 2}}>
                                Kích thước:
                            </div>
                            <div style={{flex: 6, display: "flex"}}>
                                <Select
                                    defaultValue="choose"
                                    style={{
                                        width: "300px",
                                    }}
                                    onChange={(value) => setSize(value)}
                                    options={product.sizes.map(size => {
                                        return {
                                            label: size,
                                            value: size
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Số lượng:
                            </div>
                            <div style={{flex: 6}}>
                                <DownSquareOutlined onClick={handleDecNumber}/>
                                {`${count}`} <UpSquareOutlined onClick={handleIncNumber}/>
                            </div>
                        </div>
                        <div style={{display: "flex", marginBottom: "8px"}}>
                            <div style={{flex: 2}}>
                                Tổng tiền:
                            </div>
                            <div style={{flex: 6}}>
                                {count * product.price}
                            </div>
                        </div>
                    </div>
                    <div style={{flexGrow: 2, alignItems: "center", textAlign: "center"}}>
                        <Button style={{backgroundColor: "#458fc5"}} onClick={handleTransaction}>Mua</Button>
                    </div>
                </div>
            </div>}
            <>
                <Modal
                    title="Nhập thông tin cá nhân"
                    centered
                    open={open}
                    onOk={() => {
                        handleTransaction({isAccept: true})
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
            </>
        </div>
    );
}

export default Detail;