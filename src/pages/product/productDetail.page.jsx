import {notification} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FetchData from "../../components/api/Fetch.api";
import "../../style/ProductDetail.css"
import Detail from "../../components/product/detail/productDetail";
import ProductRate from "../../components/product/detail/productRate";
import FooterComponent from "../../components/footer/FooterComponent";
import Header from "../../components/header/Header";

const ProductDetail = ({isLoggedIn}) => {
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
        console.log(id);
        FetchData.productAPI.detail(id)
            .then((res) => {
                console.log(res);
                if (!res) {
                    navigate('/')
                    return;
                }

                setProduct(res);
            })
    }, [id]);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Header isLoggedIn={isLoggedIn}/>
            {contextHolder}
            {product && <Detail product={product}/>}
            <nav style={{height: '50px', marginLeft: '50px'}}/>
            {product &&
                <div style={{display: "flex"}}>
                    <div style={{marginRight: '40px'}}>
                        <ProductRate
                            productDetail={product}
                            onMessage={openNotification}
                        />
                    </div>
                    <div>
                        <div>
                            {product.productBrands.map(
                                productBrand => {
                                    return (
                                        <div style={{marginBottom: '20px'}}>
                                            <a href={`/${productBrand.id}/detail`}>
                                                <img
                                                    src={productBrand.path}
                                                    alt="product"
                                                    style={{width: "200px", height: "200px"}}
                                                />
                                            </a>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>}
        </div>
    )
};

export default ProductDetail;
