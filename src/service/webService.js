import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const getAvatar = (url) => {
    if (!url) {
        return (<Avatar icon={<UserOutlined/>}/>)
    }
    return (<Avatar src={url}/>)
}

const maskNotice = {
    'TRANSACTION': {
        title: 'giao dịch',
        name: 'transactionId'
    },
    'PRODUCT': {
        title: 'sản phẩm',
        name: 'productId'
    },
    'VOUCHER': {
        title: 'mã giảm giá',
        name: 'voucherId'
    }
}

export default {
    getAvatar,
    maskNotice
};