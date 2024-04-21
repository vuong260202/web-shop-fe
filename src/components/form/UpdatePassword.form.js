import {Button, Form, Input, notification} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchApi from "../api/Fetch.api";
import MessageService from "../../service/MessageService";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const handleSetPassword = () => {
        if (currentPassword === '' || newPassword === '') {
            return;
        }

        fetchApi.authAPI.updatePassword({
            currentPassword, newPassword
        }).then((response) => {
            console.log(response);
            if (response?.status === 200) {
                openNotification(MessageService.contextType.success.updatePassword)
                setTimeout(() => navigate("/"), 3000)
            } else {
                if (response.message === 'Password must be in 8-16 characters, including at least 1 uppercase, 1 lowercase, 1 special character, 1 number') {
                    openNotification(MessageService.contextType.fail.changePassword)
                } else if (response.message === "Current password is incorrect") {
                    openNotification(MessageService.contextType.fail.passwordFailure)
                }
            }
        })
    }

    return (
        <Form
            className="login-form"
            name="login"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="Mật khẩu hiện tại"
                name="current password"
                rules={[
                    {
                        required: true,
                        message: "Please input your current password!",
                    },
                ]}
            >
                <Input.Password
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password onChange={(e) => setNewPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSetPassword}
                >
                    Đổi mật khẩu
                </Button>
            </Form.Item>
            {contextHolder}
        </Form>
    )
}

export default UpdatePassword;