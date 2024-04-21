import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import FetchData from "../api/Fetch.api";
import AuthService from "../../service/AuthService";
import {useLocation, useNavigate} from "react-router-dom";
import message from "../../service/MessageService";

const LoginForm = ({role}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };


    const handleLogin = async () => {
        console.log(username.length + ' ' + password.length);

        if (username.length === 0 || password.length === 0) {
            openNotification(message.contextType.fieldEmpty.usernameOrPassword);
            return;
        }

        console.log(role);

        FetchData.authAPI.login({
            username,
            password,
            role: role
        }).then((response) => {
            const res = response
            AuthService.setInfoAccount(response.data);

            if (response.status === 200) {
                console.log('LoginPage successful!');

                navigate(location.state?.from || '/');
            } else {
                console.log('LoginPage failed');
                openNotification(message.contextType.notFound.account);
            }
        })
    };

    return (
        <Form className="login-form" name="login"
              style={{margin: "40px 0"}}
              labelCol={{span: 8,}}
              wrapperCol={{span: 16,}}

              initialValues={{
                  remember: true,
              }}
              autoComplete="off"
        >
            <Form.Item label="Tài khoản" name="username">
                <Input onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Mật khẩu" name="password">
                <Input.Password onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" onClick={handleLogin} style={{margin: "20px 30px",}}>
                    Submit
                </Button>
            </Form.Item>
            {contextHolder}
        </Form>
    )
}

export default LoginForm;