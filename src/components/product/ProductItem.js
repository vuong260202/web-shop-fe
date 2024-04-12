import React from "react";
import {Rate} from "antd";

const ProductItem = ({ product }) => {
    const [rate, setRate] = React.useState(0);

    return (
        <div style={{width: '200px', height: '330px', marginBottom: "25px", marginLeft: '15px' , backgroundColor: 'rgba(255,255,255,0.8)'}}>
            <a href={`/${product.id}/detail`}>
                <div>
                    <a>
                        <img
                            src={product.path}
                            alt="product"
                            style={{width: "200px", height: "200px"}}
                        />
                    </a>
                </div>
                <div>
                </div>
                <div style={{height: '150px'}}>
                    {console.log(product)}
                    <div style={{height: '40px'}}>
                        <a>{product.productName}</a>
                    </div>
                    <div style={{height: '50px', textAlign: "center", alignItems: "center"}}>
                        {product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                    </div>
                    <div style={{display: "flex", height: "40px"}}>
                        <div style={{flex: 1}}>
                            <Rate allowHalf defaultValue={product.productRate?.totalRate ?? 5} disabled
                                  style={{fontSize: "10px"}}/>
                        </div>
                        <div style={{flex: 1.3}}>
                            đã bán: {product.productCount ? product.productCount.totalCount : 0}
                        </div>
                    </div>
                </div>
            </a>
        </div>
        // <li className="product-item" key={product.id}>
        //     <a href={`/${product.id}/detail`}>
        //         <img
        //             src={product.path}
        //             alt="product"
        //             style={{ width: "200px", height: "auto" }}
        //         />
        //     </a>
        //     <a href={`/${product.id}/detail`}>{product.productName}</a>
        // </li>
    );
};

export default ProductItem;