import React from "react";
import ForgotPasswordStep from "../../components/step/ForgotPassword.step";
import {Divider} from "antd";

const ForgotPasswordPage = () => {
    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                <h1 style={{textAlign: "center", margin: "45px 0", fontSize: "40px"}}>Quên mật khẩu</h1>
                <Divider />
                <div style={{display: "flex"}}>
                    <nav style={{flex: 1}}></nav>
                    <div style={{flex: 6}}>
                        <ForgotPasswordStep/>
                    </div>
                    <nav style={{flex: 1}}></nav>
                </div>
                <div style={{
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "18px",
                    marginTop: "70px",
                    marginBottom: "60px"
                }}>
                    <a href={"/"}>Quay về trang chủ</a>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    );
}

export default ForgotPasswordPage;