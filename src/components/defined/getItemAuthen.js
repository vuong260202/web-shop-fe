import getItem from "./getItem";

const checkLogin = (isLogin) => {
    return isLogin ? [
        getItem('Thông tin tài khoản', '3'),
        getItem('Đổi mật khẩu', '4'),
        getItem('Đăng xuất', '5'),
    ] : [
        getItem('Đăng nhập', '3'),
        getItem('Đăng ký', '4'),
    ]
}

export default checkLogin;