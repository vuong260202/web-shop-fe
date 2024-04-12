import React, {useEffect} from 'react';
import Header from "../../components/header/Header";
import {useNavigate} from "react-router-dom";
import Category from "../../components/admin/upload/category";
import Product from "../../components/admin/upload/product";
import { Tabs } from 'antd';
import AuthService from "../../service/AuthService";
import Banner from "../../components/admin/upload/banner";
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Thêm Hãng',
        children: <Category />,
    },
    {
        key: '2',
        label: 'Thêm sản phẩm',
        children: <Product />,
    },
    {
        key: '3',
        label: 'Thêm banner',
        children: <Banner />,
    },
];
const Uploaded = () => {
    const navigate = useNavigate();
    const [alignValue, setAlignValue] = React.useState('center');

    useEffect(() => {
        console.log("role user: " + AuthService.getRole());
        if (!AuthService.isAdmin()) {
            navigate('/PageNotFound');
        }
    }, []);
    return (
        <div>
            <Header/>
            <div style={{display: "flex"}}>
                <nav style={{flex: 1}}/>
                <div style={{flex: 4, backgroundColor: "#8f6f6f"}}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                        style={{textAlign: "center"}}
                        indicator={{
                            size: (origin) => origin - 20,
                            align: alignValue,
                        }}
                    />
                </div>
                <nav style={{flex: 1}}/>
            </div>
        </div>
    )
};
export default Uploaded;