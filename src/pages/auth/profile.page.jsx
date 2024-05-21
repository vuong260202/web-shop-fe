import React, {useEffect, useRef, useState} from "react";
import Header from "../../components/header/Header";
import AuthService from "../../utils/AuthUtil";
import {useNavigate} from "react-router-dom";
import {Avatar, Button, Form, Input, Layout, notification, Upload} from "antd";
import Sider from "antd/es/layout/Sider";
import FetchApi from "../../components/api/Fetch.api";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import MessageService from "../../dto/message.dto";
import FooterComponent from "../../components/footer/FooterComponent";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);
    const [address, setAddress] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [email, setEmail] = useState(null)
    const [numberPhone, setNumberPhone] = useState(null)
    const [api, contextHolder] = notification.useNotification();
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [renderFile, setRenderFile] = useState(null);
    const [isSaveAvatar, setIsSaveAvatar] = useState(false);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setRenderFile(URL.createObjectURL(event.target.files[0]));
        setIsSaveAvatar(true);
    };

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            navigate('/PageNotFound');
        }

        FetchApi.authAPI.getUser().then(res => {
            console.log(res);
            setUser(res);
            setAddress(res.address);
            setRenderFile(res.avatar);
            setFullname(res.fullname);
            setEmail(res.email);
            setNumberPhone(res.numberPhone);
        })
    }, []);

    function handleSubmit() {
        if (isSaveAvatar) {
            let form = new FormData();
            form.append('file', file);

            FetchApi.authAPI.updateAvatar(form).then(res => {
                console.log(res);
                setIsSaveAvatar(false);
                openNotification(MessageService.contextType.success.updateProfile);
            })
        } else {
            console.log(address)
            FetchApi.authAPI.updateProfile({
                fullname, numberPhone, address, email
            }).then(res => {
                console.log(res);
                setEditing(false);
                openNotification(MessageService.contextType.success.updateProfile);
                setTimeout(() => {window.location.reload();}, 1000);
            })
        }
    }

    return (
        <div>
            {contextHolder}
            <Header/>
            <div>
                {user && <Layout>
                    <Sider style={{backgroundColor: "#7aa5a9", height: '500px'}}>
                        <div style={{
                            display: "flex",
                            marginTop: "40%",
                            alignItems: "center",
                            flexDirection: "column",
                            height: '100%'
                        }}>
                            <div style={{position: "relative"}}>
                                <Avatar src={renderFile} style={{width: '100px', height: '100px'}}/>
                                <div style={{position: "absolute", bottom: '-10px', right: 0}}>
                                    <input
                                        type="file"
                                        style={{display: "none"}}
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                    <Button icon={<UploadOutlined/>} style={{opacity: 0.7}} onClick={handleClick}/>
                                </div>
                            </div>
                        </div>
                    </Sider>
                    <Layout.Content>
                        <Form style={{marginTop: "50px"}}
                              labelCol={{span: 4,}}
                              wrapperCol={{span: 16,}}

                              initialValues={{
                                  remember: true,
                              }}
                              autoComplete="off">
                        <Form.Item label="Tài khoản">
                                <Input placeholder={user.username} disabled={true} />
                            </Form.Item>
                            <Form.Item label="Tên">
                                <Input placeholder={user.fullname} value={fullname} disabled={!editing}  onChange={(value) => setFullname(value.target.value)} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input placeholder={user.email} value={email} disabled={!editing} onChange={(value) => setEmail(value.target.value)} />
                            </Form.Item>
                            <Form.Item label="Số điện thoại">
                                <Input placeholder={user.numberPhone} value={numberPhone} disabled={!editing}  onChange={(value) => setNumberPhone(value.target.value)} />
                            </Form.Item>

                            <Form.Item label="Địa chỉ">
                                <Input placeholder={user.address} value={address} disabled={!editing} onChange={(value) => setAddress(value.target.value)}/>
                            </Form.Item>

                            <Form.Item style={{alignItems: "center", marginLeft: '370px'}}>
                                {editing || isSaveAvatar ? (
                                    <Button onClick={handleSubmit}>
                                        Lưu
                                    </Button>
                                ) : (
                                    <Button onClick={() => setEditing(true)}>
                                        Chỉnh sửa
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </Layout.Content>
                </Layout>}
            </div>
        </div>
    );
}

export default ProfilePage;