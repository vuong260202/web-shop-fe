import {Button, Dropdown, Space} from "antd";
import config from "../../config";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import authService from "../../service/AuthService";
import FetchData from "../api/FetchData";
import AuthService from "../../service/AuthService";
import {UserOutlined} from '@ant-design/icons';

const Auththen = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/auth/login");
    };

    const handleSignUp = () => {
        navigate("/auth/sign-up");
    };

    return (
        <div>
            <div style={{display:"flex"}}>
                <Button style={{flex: 1}} onClick={handleLogin}> Login </Button>
                <Button style={{flex: 1}} onClick={handleSignUp}> SignUp </Button>
            </div>
        </div>
    )
}

export default Auththen;