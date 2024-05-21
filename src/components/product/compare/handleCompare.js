import {Image, Rate} from "antd";
import React, {useEffect, useState} from "react";
import FetchData from "../../api/Fetch.api";
import ProductDto from "../../../dto/product.dto";
import ProductMapper from "../../../mapper/product.mapper";

const HandleCompare = ({productId, compareProductId}) => {
    const [product, setProduct] = useState(null);
    const [compareProduct, setCompareProduct] = useState(null);

    useEffect(() => {
        FetchData.productAPI.detail(productId).then(res => {
            setProduct(ProductMapper.ProductToProductCompare(res));
        })

        FetchData.productAPI.detail(compareProductId).then(res => {
            setCompareProduct(ProductMapper.ProductToProductCompare(res));
        })
    }, [compareProductId])

    return (
        product && compareProduct && <div style={{
            display: "flex",
            flexDirection: 'column',
            overflowY: "scroll",
            height: "350px",
            margin: "5px 0px"
        }}>
            {ProductDto.titleCompare.map((title, index) => {
                const [key, value] = Object.entries(title)[0];
                return (
                    <div style={{margin: "0px 10px"}}>
                        <div key={index} style={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexWrap: "wrap",
                        }}>
                            <div style={{
                                flex: 1.5,
                                height: '100%',
                                alignItems: "center",
                            }}>
                                {value}
                            </div>
                            <div style={{
                                flex: 4.5,
                                height: '100%',
                                border: "1px solid #ccc"
                            }}>
                                {product[key]}
                            </div>
                            <div style={{
                                flex: 4.5,
                                height: '100%',
                                border: "1px solid #ccc",
                                marginRight: "5px"
                            }}>
                                {compareProduct[key]}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HandleCompare;