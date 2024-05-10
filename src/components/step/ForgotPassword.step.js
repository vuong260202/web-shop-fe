import {Button, Input, notification, Steps} from "antd";
import {useState} from "react";
import {ReloadOutlined} from '@ant-design/icons';
import FetchApi from "../api/Fetch.api";
import MessageService from "../../dto/message.dto";
import {useNavigate} from "react-router-dom";

const ForgotPasswordStep = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(null);
    const [key, setKey] = useState(0);
    const [isEmail, setIsEmail] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [isResendOtp, setIsResendOtp] = useState(true);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const fetchSendMail = () => {
        return FetchApi.authAPI.sendRequestToMail({email}).then((res) => {
            if (res.status === 200) {
                return res;
            } else {
                openNotification(MessageService.contextType.fail.sendMail)
            }
        })
    }


    const handleEmail = async () => {
        const res = await fetchSendMail();

        console.log('enter');
        if (res?.status === 200) {
            openNotification(MessageService.contextType.success.sendMail);
            console.log(res);
            setKey(key + 1);
            setIsEmail(true);
            setIsNewPassword(false);
            setIsResendOtp(false);
        }
    }

    const handleNewPassword = () => {
        FetchApi.authAPI.resetPassword({
            resetToken: otp,
            newPassword,
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                openNotification(MessageService.contextType.success.changePassword);
                setTimeout(() => navigate("/auth/login"), 3000)
            } else {
                if (res.message === "Sorry, no account was found.") {
                    openNotification(MessageService.contextType.fail.tokenResetPassword);
                } else {
                    openNotification(MessageService.contextType.fail.changePassword)
                }
            }
        })
    }

    const handleBack = () => {
        console.log("key");
        if (key === 1) {
            setKey(key - 1);
            setOtp(null);
            setNewPassword(null);
            setIsEmail(false);
            setIsNewPassword(true);
        }
    }

    const handleNext = async () => {
        console.log("key");
        if (key === 0) {
            await handleEmail();
        } else {
            handleNewPassword();
        }
    }

    const handleReloadSendMail = async () => {
        const res = await fetchSendMail();

        if (res?.status === 200) {
            openNotification(MessageService.contextType.success.sendMail);
        }
    }

    return (
        <div>
            {contextHolder}
            <div style={{
                marginLeft: '50px',
            }}>
                <Steps
                    progressDot
                    current={key}
                    direction="vertical"
                    items={[
                        {
                            title: 'Nhập gmail xác thực',
                            description:
                                <div style={{display: "flex",
                                    marginBottom: "20px",
                                    width: '450px',
                                    textAlign: "center",
                                    alignItems: "center"}}>
                                    <div style={{flex: 4}}><Input
                                        value={email}
                                        disabled={isEmail}
                                        onChange={(event) => setEmail(event.target.value)}
                                        onPressEnter={handleEmail}/></div>
                                    <div style={{flex: 1.5}}>
                                        <Button disabled={isResendOtp} style={{width: '50px'}} onClick={handleReloadSendMail}><ReloadOutlined/></Button>
                                    </div>

                                </div>

                        },
                        {
                            title: 'Nhập Mật khẩu mới',
                            description: (
                                <div>
                                    <div style={{display: "flex", marginBottom: "20px"}}>
                                        <div style={{flex: 1}}>Mật khẩu mới:</div>
                                        <div style={{flex: 4}}>
                                            <Input.Password
                                                style={{
                                                    width: '300px',
                                                }}
                                                disabled={isNewPassword}
                                                value={newPassword}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                                onPressEnter={handleNewPassword}/></div>

                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div style={{flex: 1}}>Mã xác thực:</div>
                                        <div style={{flex: 4}}>
                                            <Input
                                                style={{
                                                    width: '300px',
                                                }}
                                                disabled={isNewPassword}
                                                value={otp}
                                                onChange={(event) => setOtp(event.target.value)}
                                                onPressEnter={handleNewPassword}/></div>
                                    </div>
                                </div>
                            )
                        },
                    ]}
                />
            </div>
            <div>
                <Button disabled={key + 1 === 1} onClick={handleBack}>Quay lại bước {Math.max(key, 1)}</Button>
                <Button onClick={handleNext}>Tiếp Tục</Button>
            </div>
        </div>
    );
}

export default ForgotPasswordStep;