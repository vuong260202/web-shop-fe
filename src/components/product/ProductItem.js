import React from "react";

const ProductItem = ({ product }) => {
    return (
        <li className="product-item" key={product.id}>
            <a href={`/${product.id}/detail`}>
                <img
                    src={product.path}
                    alt="product"
                    style={{ width: "200px", height: "auto" }}
                />
            </a>
            <a href={`/${product.id}/detail`}>{product.productName}</a>
        </li>
    );
};

export default ProductItem;