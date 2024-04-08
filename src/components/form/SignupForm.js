import {Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import FetchData from "../api/FetchData";
import message from "../../service/Message";

const SignUpForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const handleSignup = async () => {

        switch ("") {
            case "username":
                openNotification(message.contextType.empty);
                return;
            case "password":
                openNotification(message.contextType.empty);
                return;
            case "email":
                openNotification(message.contextType.empty);
                return;
            case "phone":
                openNotification(message.contextType.empty);
                return;
        }

        try {
            FetchData.signup({
                username,
                password,
                email,
                phone,
            }).then((res) => {
                if (res.status === 200) {
                    console.log('Signup successful');
                    navigate('/auth/login')
                } else {
                    console.log('Signup failed');
                }
            })
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div style={{
            textAlign: "center",
        }}>
            <div
                style={{
                    alignItems: "center",
                    textAlign: "center",
                    paddingLeft: "40px"
                }}>
                <Form labelCol={{
                    span: 4,
                }}
                      wrapperCol={{
                          span: 14,
                      }}
                      layout="horizontal"
                >
                    <Form.Item label="Tài khoản">
                        <Input
                            type="text"
                            placeholder="Tài khoản"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Mật khẩu">
                        <Input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="gmail">
                        <Input
                            type="text"
                            placeholder="gmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="số điện thoại">
                        <Input
                            type="number"
                            placeholder="số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </div>
            <button onClick={handleSignup} style={{textAlign: "center"}}>Signup</button>
            {contextHolder}
        </div>
    )
}

export default SignUpForm;