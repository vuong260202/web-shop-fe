import React, {useState} from "react";
import LoginForm from "../form/LoginForm";

const Login = () => {
    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                    <h1 style={{textAlign: "center", margin: "45px 0", fontSize: "40px"}}>Đăng nhập</h1>
                    <LoginForm />
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

export default Login;