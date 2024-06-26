import {Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import FetchData from "../api/Fetch.api";
import message from "../../dto/message.dto";
import MessageService from "../../dto/message.dto";

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
                    navigate('/auth/login')
                } else {
                    console.log(res.data);
                    if (!res) {
                        console.log("error internal server");
                    }

                    if (res?.data.message === "Cannot create account") {
                        openNotification(MessageService.contextType.valid.email);
                    }

                    if (res?.data.message === "Account already exists") {
                        openNotification(MessageService.contextType.doesNotExist.account);
                    }
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
                    <Form.Item
                        label="Tài khoản"
                        required={true}
                    >
                        <Input
                            type="text"
                            placeholder="Tài khoản"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        required={true}>
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
                    <Form.Item
                        label="gmail"
                    >
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