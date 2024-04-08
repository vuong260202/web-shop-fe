import React from 'react';
import '../../style/Login.css';
import '../../style/Signup.css';
import SignupForm from "../form/SignupForm";

const Signup = () => {
    return (
        <div style={{display: "flex"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3}}>
                <h1 style={{textAlign: "center", margin: "70px 0", fontSize: "40px"}}>Đăng ký tài khoản</h1>
                <SignupForm/>
                <div style={{
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "18px",
                    marginTop: "70px",
                    marginBottom: "60px"
                }}>
                    <p style={{color: "black"}}>
                        Đã có tài khoản? <a style={{color: "#0d6efd"}} href={"/auth/login"}>Đăng nhập</a>
                    </p>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    );
};

export default Signup;