import {notification} from "antd";
import {useEffect} from "react";

const Notification = (key, massage, description) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            key,
            message: massage,
            description: description,
        });
    };

    useEffect(() => {
        openNotification()
    }, [])

    return {contextHolder};
}

export default Notification;