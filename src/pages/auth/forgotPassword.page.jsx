import React from "react";
import LoginForm from "../../components/form/Login.form";
import ForgotPasswordForm from "../../components/form/ForgotPassword.form";

const ForgotPasswordPage = () => {
    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                <h1 style={{textAlign: "center", margin: "45px 0", fontSize: "40px"}}>Đổi mật khẩu</h1>
                <ForgotPasswordForm />
                <div style={{alignItems: "center", textAlign: "center", fontSize: "18px", marginTop: "70px", marginBottom: "60px"}}>
                    <a href={"/"}>Quay về trang chủ</a>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    );
}

export default ForgotPasswordPage;