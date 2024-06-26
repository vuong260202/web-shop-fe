import React, {useEffect} from 'react';
import Header from "../../../components/header/Header";
import {useNavigate} from "react-router-dom";
import {Tabs} from 'antd';
import AuthService from "../../../utils/AuthUtil";
import DataType from "../../../utils/dataType";
import FooterComponent from "../../../components/footer/FooterComponent";

const Uploaded = () => {
    const navigate = useNavigate();

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate('/PageNotFound');
        }
    }, []);

    return (
        <div>
            <Header/>
            <div style={{display: "flex"}}>
                <nav style={{flex: 1}}/>
                <div style={{flex: 4, backgroundColor: "#7f8d91"}}>
                    <Tabs
                        defaultActiveKey="1"
                        items={DataType.admin.tab.upload.items}
                        onChange={onChange}
                        style={{textAlign: "center"}}
                        indicator={{
                            size: (origin) => origin - 20,
                            align: "center",
                        }}
                    />
                </div>
                <nav style={{flex: 1}}/>
            </div>
        </div>
    )
};
export default Uploaded;