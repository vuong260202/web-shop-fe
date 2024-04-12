import {Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import FetchData from "../api/Fetch.api";
import message from "../../service/MessageService";

const SignupForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
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
            case username:
                openNotification(message.contextType.fieldEmpty.username);
                return;
            case password:
                openNotification(message.contextType.fieldEmpty.password);
                return;
            case email:
                openNotification(message.contextType.fieldEmpty.email);
                return;
            case numberPhone:
                openNotification(message.contextType.fieldEmpty.numberPhone);
                return;
            case address:
                openNotification(message.contextType.fieldEmpty.address);
                return;
            case fullname:
                openNotification(message.contextType.fieldEmpty.name);
                return;
        }

        try {
            FetchData.authAPI.signup({
                username,
                password,
                email,
                numberPhone,
                address,
                fullname,
            }).then((res) => {
                if (res.status === 200) {
                    console.log('SignupPage successful');
                    navigate('/auth/login')
                } else {
                    console.log('SignupPage failed');
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
                    <Form.Item label="Tên đầy đủ">
                        <Input
                            type="text"
                            placeholder="Tên"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Địa chỉ">
                        <Input
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                            value={numberPhone}
                            onChange={(e) => setNumberPhone(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </div>
            <button onClick={handleSignup} style={{textAlign: "center"}}>Signup</button>
            {contextHolder}
        </div>
    )
}

export default SignupForm;