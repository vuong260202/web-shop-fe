import config from '../../config'
import ProductItem from "../product/ProductItem";
import React from "react";

const SellingProducts = ({data}) => {


    return (
        <div>
            <div style={{display: "flex"}}>
                {data && (
                    <ul style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        flexWrap: "wrap",
                        width: "100%",
                    }}>
                        {data.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

export default SellingProducts;