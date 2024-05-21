import {Image, Rate} from "antd";
import React, {useEffect, useState} from "react";
import FetchData from "../../api/Fetch.api";
import ProductDto from "../../../dto/product.dto";

const HandleCompare = ({productId, compareProductId}) => {
    const [product, setProduct] = useState(null);
    const [compareProduct, setCompareProduct] = useState(null);

    useEffect(() => {
        FetchData.productAPI.detail(productId).then(res => {
            setProduct(res);
        })

        FetchData.productAPI.detail(compareProductId).then(res => {
            setCompareProduct(res);
        })
    }, [compareProductId])

    return (
        product && compareProduct && <div style={{
            display: "flex",
            flexDirection: 'column',
            overflowY: "scroll",
            height: "350px"
        }}>
            {ProductDto.titleCompare.map((title, index) => {
                const [key, value] = Object.entries(title)[0];

                return (
                    <div>
                        <div>
                            <div key={index} style={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                flexWrap: "wrap",
                                width: "100%",
                                height: '100%',
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

                                    {key === 'path' && <Image
                                        width={'200px'}
                                        height={'200px'}
                                        src={`http://localhost:3001` + product.path}/>}
                                    {key === 'productName' && <h3 style={{textAlign: "center"}}>
                                        {product?.productName}
                                    </h3>}
                                    {key === 'price' && product.price}
                                    {key === 'size' && product.sizes.toString()}
                                    {key === 'transactionCount' && (product.transactionCount ?? 0)}
                                    {key === 'rating' && <Rate allowHalf defaultValue={product.productStatistic.totalRate} disabled/>}
                                </div>
                                <div style={{
                                    flex: 4.5,
                                    height: '100%',
                                    border: "1px solid #ccc",
                                    marginRight: "5px"
                                }}>
                                    {key === 'path' && <Image
                                        width={'200px'}
                                        height={'200px'}
                                        src={`http://localhost:3001` + product.path}/>}
                                    {key === 'productName' && <h3 style={{textAlign: "center"}}>
                                        {compareProduct?.productName}
                                    </h3>}
                                    {key === 'price' && compareProduct?.price}
                                    {key === 'size' && compareProduct.sizes.toString()}
                                    {key === 'transactionCount' && (compareProduct.transactionCount ?? 0)}
                                    {key === 'rating' && <Rate allowHalf defaultValue={compareProduct.productStatistic.totalRate} disabled/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HandleCompare;