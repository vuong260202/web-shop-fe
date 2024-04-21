import {Button, Input, notification, Switch, Table, Upload} from "antd";
import React, {useEffect, useState} from "react";
import { UploadOutlined } from '@ant-design/icons';
import product from "../../defined/Product";
import FetchData from "../../api/Fetch.api";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";

const Product = () => {
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isSave, setIsSave] = useState(true);
    const [page, setPage] = useState(1);

    const getData = (body) => {
        FetchData.productAPI.filters(body).then((res) => {
            console.log(res.products);
            setResponseData(res);
            handleDisplayData(res);
        })
            .catch((error) => {
                console.error("Error fetching transaction data: ", error);
            });
    }

    const handleDelete = (productId) => {
        FetchData.admin.productAPI.delete({productId: productId}).then((res) => {
            console.log("Delete product success");
        })
    }

    const handleDisplayData = (data) => {
        setDisplayData(data.products.map((product, index) => ({
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
                    <a href={`http://localhost:3001/admin/${product.id}/update`}>sửa</a> | <a onClick={() => handleDelete(product.id)}>xóa</a>
                </div>)
            })
        ));
    }

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate("/PageNotFound");
        }

        getData({page: page});
    }, [page])

    return (
        <div>
            <Table columns={product.adminProductColumns}
                   dataSource={displayData}
            />
        </div>
    );
}

export default Product;