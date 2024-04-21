import {Button, Drawer, Form, Input, notification, Rate} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FetchData from "../../components/api/Fetch.api";
import AuthService from "../../service/AuthService";
import "../../style/ProductDetail.css"
import message from "../../service/MessageService";
import Detail from "../../components/product/detail/productDetail";
import ProductRate from "../../components/product/detail/productRate";

const ProductDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topLeft',
        });
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
                // setUserRate(res)
            })
    }, [id]);

    return (
        <div>
            {contextHolder}
            {product && <Detail
                product={product}/>}
            <div style={{height: '50px', marginLeft: '50px'}}>
                Hãng
            </div>
            {product && <ProductRate
                productDetail={product}
                onMessage={openNotification}
                />}
        </div>
    )
};

export default ProductDetail;
