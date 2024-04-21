import React from "react";
import "../../style/Login.css";
import UpdatePassword from "../../components/form/UpdatePassword.form";

const ChangePasswordPage = () => {
    return (
        <div style={{display: "flex", height: "650px"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                <h1 style={{textAlign: "center", alignItems: "center", margin: "45px 0", fontSize: "40px"}}>Đổi mật khẩu</h1>
                <UpdatePassword />
                <div style={{
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "18px",
                    marginTop: "120px",
                }}>
                    <a href={"/"}>Quay về trang chủ</a>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    )
};

export default ChangePasswordPage;
