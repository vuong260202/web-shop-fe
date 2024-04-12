import {Dropdown, Space} from "antd";
import config from "../../config";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import authService from "../../service/AuthService";
import FetchData from "../api/Fetch.api";
import AuthService from "../../service/AuthService";
import {UserOutlined} from '@ant-design/icons';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.deleteTokenAndRole();
        navigate("/");
    };

    const handleUpload = () => {
        navigate("/admin/upload");
    };

    const handleTransaction = () => {
        navigate("/admin/transaction");
    };

    const handlePassword = () => {
        navigate("/auth/set-password");
    };

    const handleProduct = () => {
        navigate("/admin/products");
    };


    function handleHistory() {
        navigate("/transaction/history");
    }

    const items =
        AuthService.isAdmin()
            ? [
                {
                    label: <a onClick={handleUpload}> Thêm sản phẩm </a>,
                    key: "0",
                },
                {
                    label: <a onClick={handleProduct}> Quản lý sản phẩm </a>,
                    key: "1",
                },
                {
                    label: <a onClick={handleTransaction}> Giao dịch </a>,
                    key: "2",
                },
            ]
            : [
                {
                    label: <a onClick={handleHistory}> Lịch sử giao dịch </a>,
                    key: "0",
                },
            ];

    items.push(
        {
            label: <a onClick={handlePassword}> Đổi mật khẩu </a>,
            key: "3",
        }, {
            label: <a onClick={handleLogout}> Thoát </a>,
            key: "4",
        })



    return (
        <div style={{display:"flex"}}>
            <nav style={{flex: 3}}></nav>
            <div style={{flex: 3}}>
                <Dropdown
                    menu={{
                        items,
                    }}
                    style={{flex: 3}}
                >
                    <UserOutlined
                        onClick={(e) => e.preventDefault()}
                        style={{
                            fontSize: "35px",
                        }}
                    />
                </Dropdown>
            </div>

        </div>
    )
}

export default Profile;