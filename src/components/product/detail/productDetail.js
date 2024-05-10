import {Button, Image, notification, Rate, Select} from "antd";
import {DownSquareOutlined, UpSquareOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import AuthService from "../../../service/AuthService";
import message from "../../../dto/message.dto";
import FetchData from "../../api/Fetch.api";
import {useNavigate} from "react-router-dom";
import ProductCompare from "../../modal/productCompare.productDetail";
import BuyerInfo from "../../modal/buyerInfo.productDetail";

const Detail = ({product}) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(undefined);
    const [api, contextHolder] = notification.useNotification();
    const [openModalBuyerInfo, setOpenModalBuyerInfo] = useState(false);
    const [openModalCompare, setOpenModalCompare] = useState(false);

    const openNotification = (type) => {
        api.info({
            message: "Message", description: type, placement: 'topLeft',
        });
    };

    const handleIncNumber = () => {
        setCount(count + 1)
    }

    const handleDecNumber = () => {
        if (count > 1) setCount(count - 1);
    }

    const handleTransaction = ({isAccept, buyerInfo}) => {

        if (!size) {
            openNotification(message.contextType.fieldEmpty.size)
            return false;
        }

        if (!isAccept) {
            setOpenModalBuyerInfo(true);
            return;
        }

        if (!buyerInfo || buyerInfo.name === undefined || buyerInfo.name.trim() === '') {
            openNotification(message.contextType.fieldEmpty.name);
            return false;
        }

        if (buyerInfo.numberPhone === undefined || buyerInfo.numberPhone.trim() === '') {
            openNotification(message.contextType.fieldEmpty.numberPhone)
            return false;
        }

        if (buyerInfo.address === undefined || buyerInfo.address.trim() === '') {
            openNotification(message.contextType.fieldEmpty.address)
            return false;
        }

        let conditions = {
            productId: product.id,
            name: buyerInfo.name.trim(),
            size,
            numberPhone: buyerInfo.numberPhone.trim(),
            address: buyerInfo.address.trim(),
            count,
            total: count * product.price,
        }

        FetchData.transactionAPI.add(conditions).then((res) => {
            console.log(res);
            if (res) {
                setOpenModalBuyerInfo(false)
                openNotification(message.contextType.success.buy);
                if (AuthService.isLoggedIn()) {
                    setTimeout(() => navigate('/transaction/history'), 3000)
                }
            }
        });
    };

    return (<div>
        {contextHolder}
        {product && <div style={{display: "flex", padding: "30px 30px"}}>
            <div style={{
                flex: 3.2, backgroundColor: "#eacbcb", width: "300px", display: "flex", flexDirection: "column"
            }}>
                <div style={{flexGrow: 3, margin: "2px", display: "flex", flexDirection: "column"}}>
                    <div style={{flexGrow: 7, height: "90%"}}>
                        <Image
                            width={'100%'}
                            height={'100%'}
                            src={`http://localhost:3001` + product.path}
                        />
                    </div>
                    {/*<div style={{flexGrow: 1}}/>*/}
                    {/*<div style={{flexGrow: 3, height: "100%"}}>*/}
                    {/*    <Image*/}
                    {/*        height={'80px'}*/}
                    {/*        src={`http://localhost:3001` + product.path}*/}
                    {/*    />*/}
                    {/*</div>*/}
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
                            <Rate allowHalf disabled defaultValue={product.productStatistic.totalRate}/>
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
                                        label: size, value: size
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
            {openModalBuyerInfo && <BuyerInfo setOpen={setOpenModalBuyerInfo} handleTransaction={handleTransaction}/>}
            {openModalCompare && <ProductCompare setOpen={setOpenModalCompare}/>}
        </>
    </div>);
}

export default Detail;