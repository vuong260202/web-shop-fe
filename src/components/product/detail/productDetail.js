import {Button, Image, notification, Rate} from "antd";
import React, {useState} from "react";
import AuthService from "../../../service/AuthService";
import message from "../../../dto/message.dto";
import FetchData from "../../api/Fetch.api";
import {useNavigate} from "react-router-dom";
import ProductCompare from "../../modal/productCompare.productDetail";
import CreateTransaction from "../../modal/createTransaction.productDetail";

const Detail = ({product}) => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [openModalCompare, setOpenModalCompare] = useState(false);
    const [openModalCreateTransaction, setOpenModalCreateTransaction] = useState(false);
    const [pathImage, setPathImage] = useState(product.path);

    const openNotification = (type) => {
        api.info({
            message: "Message", description: type, placement: 'topLeft',
        });
    };

    const handleTransaction = ({isAccept, buyerInfo}) => {
        if (!isAccept) {
            setOpenModalCreateTransaction(true);
            return;
        }

        if (!buyerInfo || !buyerInfo.size) {
            openNotification(message.contextType.fieldEmpty.size)
            return false;
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
            size: buyerInfo.size,
            numberPhone: buyerInfo.numberPhone.trim(),
            address: buyerInfo.address.trim(),
            count: buyerInfo.count,
            total: buyerInfo.count * product.price,
        }

        FetchData.transactionAPI.add(conditions).then((res) => {
            console.log(res);
            if (res) {
                setOpenModalCreateTransaction(false)
                openNotification(message.contextType.success.buy);
                if (AuthService.isLoggedIn()) {
                    setTimeout(() => navigate('/transaction/history'), 3000)
                }
            }
        });
    };

    return (<div>
        {contextHolder}
        {product &&
        <div style={{display: "flex", padding: "30px 30px"}}>
            <div style={{
                flex: 3.2, backgroundColor: "#eacbcb", width: "300px", display: "flex", flexDirection: "column"
            }}>
                    <div style={{flex: 5, height: "100%", textAlign: "right"}}>
                        <Image
                            width={'100%'}
                            height={'400px'}
                            src={`http://localhost:3001` + pathImage}
                        />
                    </div>
            </div>
            <div style={{flex: 4, backgroundColor: "#f1dede", display: "flex", flexDirection: "column"}}>
                <div className={"product-information"} style={{flexGrow: 8}}>
                    <div style={{marginTop: '0px', marginBottom: '-50px', textAlign: "right"}}>
                        <Button
                            onClick={() => setOpenModalCompare(true)}
                            style={{width: "100px"}}
                        > So sánh </Button>
                    </div>
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
                            Giá bán:
                        </div>
                        <div style={{flex: 6}}>
                            {product.price}
                        </div>
                    </div>
                </div>
                <div style={{flexGrow: 2, alignItems: "center", textAlign: "center", marginBottom: "-50px"}}>
                    <Button style={{backgroundColor: "#458fc5"}} onClick={handleTransaction}>Mua</Button>
                </div>
            </div>
        </div>}
        <>
            {openModalCreateTransaction
                && <CreateTransaction
                    setOpen={setOpenModalCreateTransaction}
                    handleTransaction={handleTransaction}
                    product={product} />}
            {openModalCompare
                && <ProductCompare
                    setOpen={setOpenModalCompare}
                    productId={product.id}/>}
        </>
    </div>);
}

export default Detail;