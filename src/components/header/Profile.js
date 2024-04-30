import {Avatar, Dropdown} from "antd";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import authService from "../../service/AuthService";
import AuthService from "../../service/AuthService";
import {UserOutlined} from '@ant-design/icons';
import FetchApi from "../api/Fetch.api";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        authService.deleteTokenAndRole();
        FetchApi.authAPI.logout();
        navigate("/");

    };

    const handleUpload = () => {
        navigate("/admin/upload");
    };

    const handleTransaction = () => {
        navigate("/admin/transaction");
    };

    const handlePassword = () => {
        navigate("/change-password");
    };

    const handleProduct = () => {
        navigate("/admin/manage");
    };


    function handleHistory() {
        navigate("/transaction/history");
    }

    function handleProfile() {
        navigate("/auth/profile");
    }

    const items =
        AuthService.isAdmin()
            ? [
                {
                    label: <a onClick={handleProfile}> Thông tin cá nhân </a>,
                    key: "0",
                },
                {
                    label: <a onClick={handleUpload}> Thêm sản phẩm </a>,
                    key: "1",
                },
                {
                    label: <a onClick={handleProduct}> Quản lý sản phẩm </a>,
                    key: "2",
                },
                {
                    label: <a onClick={handleTransaction}> Giao dịch </a>,
                    key: "3",
                },
                {
                    label: <a onClick={() => {
                        navigate("/admin/statistic")
                    }}> Thống kê </a>,
                    key: "4",
                }
            ]
            : [
                {

                    label: <a onClick={handleProfile}> Thông tin cá nhân </a>,
                    key: "0",
                },
                {
                    label: <a onClick={handleHistory}> Lịch sử giao dịch </a>,
                    key: "1",
                },
            ];

    items.push(
        {
            label: <a onClick={handlePassword}> Đổi mật khẩu </a>,
            key: "8",
        }, {
            label: <a onClick={handleLogout}> Thoát </a>,
            key: "9",
        })

    useEffect(() => {
        FetchApi.authAPI.getUser().then(res => {

            if (res?.status === 401) {
                AuthService.deleteTokenAndRole();
                return;
            }
            setUser(res);
        })
    }, []);


    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1}}></nav>
            <div style={{flex: 3, display: "flex"}}>
                <nav style={{flex: 0.3}}/>
                <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                    <div style={{flex: 3, textAlign: "right"}}>
                        {user?.fullname}
                    </div>
                    <div style={{flex: 1, textAlign: "left", marginLeft: "5px"}}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            style={{flex: 3}}
                        >
                            {AuthService.isLoggedIn && user?.avatar ? <Avatar src={user.avatar} style={{
                                fontSize: "35px"
                            }}/> : <UserOutlined
                                onClick={(e) => e.preventDefault()}
                                style={{
                                    fontSize: "35px",
                                }}
                            />}
                        </Dropdown>
                    </div>
                    <nav style={{flex: 2}}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;