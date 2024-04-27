import React, {useState} from "react";
import LoginWithGoogle from "../../components/auth/login/LoginWithGoogle";
import LoginForm from "../../components/form/Login.form";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div style={{display: "flex", height: "600px"}}>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
            <div style={{flex: 3, display: "flex", flexDirection: "column"}}>
                <h1 style={{textAlign: "center", margin: "45px 0", fontSize: "40px", flexGrow: 1}}>Đăng nhập</h1>
                {isLogin === false
                    ?   <div style={{flexGrow: 3}}>
                            <LoginWithGoogle role={'user'}/>
                            <div style={{textAlign: "center"}}>
                                <button onClick={() => {setIsLogin(true)}}>Đăng nhập</button>
                            </div>
                        </div>
                    : <LoginForm role={'user'}/>
                }
            <div style={{
                alignItems: "center",
                textAlign: "center",
                fontSize: "18px",
                marginTop: "70px",
                marginBottom: "60px",
                flexGrow: 1
            }}>
                    <a style={{color: "#0d6efd"}} href={"/auth/forgot-password"}>Quên mật khẩu?</a>
                    <p style={{color: "black"}}>
                        Chưa có tài khoản? <a style={{color: "#0d6efd"}} href={"/auth/sign-up"}>Đăng ký</a>
                    </p>
                    <a href={"/"}>Quay về trang chủ</a>
                </div>
            </div>
            <nav style={{flex: 1, backgroundColor: "blueviolet"}}></nav>
        </div>
    );
}

export default LoginPage;