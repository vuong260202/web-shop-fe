import React, {useEffect, useState} from "react";
import {Button, Input, Switch, Table} from "antd";
import Header from "../../../components/header/Header";
import FetchData from "../../../components/api/Fetch.api";
import product from "../../../components/defined/Product";
import {get} from "axios";

const App = () => {
    const [data, setData] = useState([]);
    const [changeData, setChangeData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [isSave, setIsSave] = useState(true);

    const getData = (body) => {
        FetchData.productAPI.filters(body).then((res) => {
            setData(res);
            handleDisplayData(res);
            handleChangeData(res);
        })
        .catch((error) => {
            console.error("Error fetching transaction data: ", error);
        });
    }

    const handleDisplayData = (data) => {
        console.log(data);
        setDisplayData(data.products.map((product) => ({
                key: product.id,
                id: product.id,
                productName: (<a href={`http://localhost:3001/${product.id}/detail`}>{product.productName}</a>),
                price: product.price,
                category: product.category.categoryName,
                total: product.total,
                path: product.path,
                size: 32,
                updatedAt: product.updatedAt,
                update: (<a href={`http://localhost:3001/admin/update-product/${product.id}`}>edit</a>)
            })
        ));
    }

    const handleChangeData = (data) => {
        JSON.parse(data.products[0].sizes).forEach(s => console.log(s));
        setChangeData(data.products.map((product) => ({
                key: product.id,
                id: product.id,
                productName: (<Input
                    style={{width: '100px'}}
                    defaultValue={product.productName}
                    onChange={(e) => {

                    }}
                />),
                price: (<Input
                    style={{width: '100px'}}
                    defaultValue={product.price}
                    onChange={(e) => {

                    }}
                />),
                category: product.category.categoryName,
                total: (<Input
                    style={{width: '100px'}}
                    defaultValue={product.total}
                    onChange={(e) => {

                    }}
                />),
                path: product.path,
                size: (<Input
                    style={{width: '100px'}}
                    defaultValue={data.products[0].sizes}
                    onChange={(e) => {

                    }}
                />),
                updatedAt: product.updatedAt,
                update: (<a href={`http://localhost:3001/admin/update-product/${product.id}`}>edit</a>)
            })
        ))
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSearch = (searchQuery) => {
        console.log("searchQuery: ", searchQuery);
        getData({
            filters: {
                productName: searchQuery
            }
        });
    }

    const handleSwitch = () => {
        console.log(isChecked);
        setIsChecked(!isChecked);
        setIsSave(!isSave);
    }

    return (
        <div>
            <Header onSearch={handleSearch}/>
            <div>
                <div style={{display: "flex", alignItems: "center", textAlign: "center"}}>
                    <div style={{flex: 1.5, display: "flex", alignItems: "center"}}>

                        <div style={{flex: 1}}>
                            <a>Sửa: </a>
                            <Switch checked={isChecked}
                                    style={{width: "40px"}}
                                    onChange={handleSwitch}/>
                        </div>
                        <div style={{flex: 1}}>
                            {<Button style={{width: "70px"}} disabled={isSave}>Lưu</Button>}
                        </div>
                    </div>
                    <nav style={{flex: 9}}/>

                </div>
                <Table columns={product.adminProductColumns} dataSource={isChecked ? displayData : changeData}/>
            </div>
        </div>
    );
};

export default App;
