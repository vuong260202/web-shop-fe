import React from "react";


const ProductMapper = {
    ProductListToProductManager: ({products, deleteClickEvent}) => {
        return products.map((product, index) => ({
                key: index + 1,
                id: product.id,
                productName: (<a href={`http://localhost:3001/${product.id}/detail`}>{product.productName}</a>),
                price: product.price,
                category: product.category.categoryName,
                total: product.total,
                path: product.path,
                size: 32,
                updatedAt: product.updatedAt,
                image: (
                    <div>
                        <img
                            src={'http://localhost:3001' + product.path}
                            style={{width: '100px', height: "auto"}}
                        />
                    </div>),
                update: (<div>
                    <a href={`http://localhost:3001/admin/${product.id}/update`}>sửa</a> |
                    <a onClick={() => deleteClickEvent({productId: product.id,})}>xóa</a>
                </div>)
            })
        )
    },
    ProductListToDataExport: (products) => {
        return products.map((product, index) => {
            product.index = index + 1;
            product.totalRate = product.totalRate ?? 0;

            return product;
        })
    },
    ProductListToProductStatistic: (products) => {
        return products.map((product, index) => {
            product.index = index + 1;
            product.totalRate = product.totalRate ?? 0;
            product.productName = <a href={`/${product.id}/detail`}>{product.productName}</a>;

            return product;
        })
    }
}

export default ProductMapper;