import React from "react";
import LoginForm from "../../form/Login.form";
import {useNavigate} from "react-router-dom";
import AuthService from "../../../service/AuthService";

const AdminLogin = () => {
    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                <h1 style={{textAlign: "center", margin: "45px 0", fontSize: "40px"}}>Đăng nhập</h1>
                <LoginForm role={"admin"}/>
                <div style={{alignItems: "center", textAlign: "center", fontSize: "18px", marginTop: "70px", marginBottom: "60px"}}>
                    <a style={{color: "#0d6efd"}} href={"/auth/forgot-password"}>Quên mật khẩu?</a>
                    <p style={{color: "black"}}>
                        Chưa có tài khoản?  <a style={{color: "#0d6efd"}} href={"/auth/sign-up"}>Đăng ký</a>
                    </p>
                    <a href={"/"}>Quay về trang chủ</a>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    );
}

export default AdminLogin;