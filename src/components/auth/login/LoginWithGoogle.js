import React, {useEffect, useState} from 'react';
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {gapi} from "gapi-script";
import FetchApi from "../../api/Fetch.api";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";
import CONFIG from "../../../config";

const LoginWithGoogle = ({role}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [isClick, setIsClick] = useState(false);

    const handleLoginSuccess = (response) => {

        setUser({
            googleId: response.profileObj.googleId,
            email: response.profileObj.email,
            name: response.profileObj.name,
            role: role
        })

        console.log(response);
        // Xử lý response thành công ở đây
        let accountInfo = {
            googleId: response.profileObj.googleId,
            email: response.profileObj.email,
            name: response.profileObj.name,
            role: role
        };

        console.log(accountInfo);
        if (accountInfo.googleId !== undefined && accountInfo.email !== undefined && accountInfo.name !== undefined) {
            FetchApi.authAPI.loginWithGoogle(accountInfo).then(res => {
                console.log(res);
                if (res && res.status === undefined) {
                    AuthService.setInfoAccount(res);
                    navigate('/');
                }

            })
        }
    };

    const handleLoginFailure = (response) => {
        // Xử lý lỗi ở đây
        console.log('Login error:', response);
        // alert('Login Failed:', error);
    };

    return (
        <div style={{alignItems: "center", textAlign: "center"}}>
            <React.StrictMode>
                <GoogleLogin
                    clientId={CONFIG.app.login.clientId}
                    buttonText="Đăng nhập bằng Google"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    onClick={() => setIsClick(true)}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={isClick}
                    prompt="select_account"
                />
            </React.StrictMode>
        </div>

    );
};

export default LoginWithGoogle;
