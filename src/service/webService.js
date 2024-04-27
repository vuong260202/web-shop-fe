import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const getAvatar = (url) => {
    if (!url) {
        return (<Avatar icon={<UserOutlined/>}/>)
    }
    return (<Avatar src={url}/>)
}

let isLoggedIn = false;

export default {
    getAvatar,
    isLoggedIn
};