import {Button, Input, notification, Switch, Table, Upload} from "antd";
import React, {useEffect, useState} from "react";
import product from "../../defined/Product";
import FetchData from "../../api/Fetch.api";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    const getData = () => {
        FetchData.categoryAPI.all().then((res) => {
            console.log(res);
            setResponseData(res);
            handleDisplayData(res);
        })
            .catch((error) => {
                console.error("Error fetching transaction data: ", error);
            });
    }

    const handleDelete = (categoryId) => {
        FetchData.admin.categoryAPI.delete({categoryId: categoryId}).then((res) => {
            console.log("Delete product success");
        })
    }

    const handleDisplayData = (data) => {
        setDisplayData(data.map((category, index) => ({
                key: index + 1,
                id: category.id,
                categoryName: category.categoryName,
                productCount: category.productCount,
                path: category.path,
                updatedAt: category.updatedAt,
                image: (
                    <div>
                        <img
                            src={'http://localhost:3001' + category.path}
                            style={{width: '100px', height: "auto"}}
                        />
                    </div>),
                update: (<div>
                    <a href={`http://localhost:3001/admin/${category.id}/update`}>sửa</a> | <a onClick={() => handleDelete(category.id)}>xóa</a>
                </div>)
            })
        ));
    }

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate("/PageNotFound");
        }

        getData();
    }, [])

    return (
        <div>
            <Table columns={product.adminCategoryColumns} dataSource={displayData}/>
        </div>
    );
}

export default Category;