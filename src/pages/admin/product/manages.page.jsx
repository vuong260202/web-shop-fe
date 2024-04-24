import Header from "../../../components/header/Header";
import {Tabs} from "antd";
import React, {useEffect} from "react";
import dataType from "../../../utils/dataType";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";

const AdminManages = () => {
    const navigate = useNavigate();

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate('/PageNotFound');
        }
    }, [])

    return (
        <div>
            <Header/>
            <div>
                    <Tabs
                        defaultActiveKey="1"
                        items={dataType.admin.tab.manage.items}
                        onChange={onChange}
                        style={{textAlign: "center"}}
                        indicator={{
                            size: (origin) => origin - 20,
                            align: "center",
                        }}
                    />
            </div>
        </div>
    )
}

export default AdminManages;