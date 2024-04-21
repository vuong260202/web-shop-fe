import {Button} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";

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
            <div style={{display: "flex"}}>
                <Button style={{flex: 1}} onClick={handleLogin}> Login </Button>
                <Button style={{flex: 1}} onClick={handleSignUp}> SignUp </Button>
            </div>
        </div>
    )
}

export default Auththen;