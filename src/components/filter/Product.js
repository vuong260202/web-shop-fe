import React from "react";
import ProductItem from "../product/ProductItem";


const Product = ({data}) => {
    return (
            <div style={{display: "flex", backgroundColor: "rgba(245, 242, 242, 0.8)", margin: '10px'}}>
                {data && (
                    <ul style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "100%",
                    }}>
                        {data.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </ul>
                )}
            </div>
    );
};
export default Product;
