import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import FetchData from "../../api/FetchData";
import {Button, Form, Input} from "antd";

const AdminLogin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        FetchData.login({
            username,
            password,
            role: 'admin'
        }).then((response)=>{
            const res = response
            console.log(res)
            if (res.status === 200) {
                setErrorMessage('')

                localStorage.setItem("token", res.data.token);
                console.log('Login successful:');
                navigate('/admin/products')
            } else {
                console.log('Login failed');
                setErrorMessage(res.data.message);
            }
        })
    };

    return (
        <Form className="login-form" name="login"
              labelCol={{ span: 8, }}
              wrapperCol={{ span: 16, }}

              initialValues={{
                  remember: true,
              }}
              autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>

            {errorMessage && (
                <div style={{ color: 'red', marginLeft: '30%' }}>{errorMessage}</div>
            )}

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" onClick={handleLogin}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AdminLogin;