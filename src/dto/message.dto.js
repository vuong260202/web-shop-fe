import React from "react";

const Context = React.createContext({
    // Empty field
    empty: 'Tài khoản hoặc mật khẩu không được để trống',
    addressEmpty: 'Địa chỉ không được để trống',
    nameEmpty: 'Tên không được để trống',
    usernameEmpty: 'Tên không được để trống',
    passwordEmpty: 'Tên không được để trống',
    numberPhoneEmpty: 'Số điện thoại không được để trống',
    fileEmpty: 'Chưa có ảnh',
    sizeEmpty: 'Vui lòng chọn kích thước',
    emailEmpty: 'email không được để trống',

    accountNotFound: 'Tài khoản hoặc mật khẩu không đúng',
    buySuccess: 'Đặt hàng thành công',
    uploadSuccess: 'Upload thành công',
    categoryDoesNotExist: "Hãng đã tồn tại",
    productDoesNotExist: "Sản phẩm đã tồn tại",
    notDeleteTransaction: "Chỉ có thể hủy đơn hàng có trạng thái là PENDING",
    deleteTransactionSuccess: "Xóa đơn hàng thành công",
    updateTransactionSuccess: "Cập nhật trạng thái đơn hàng thành công",
    changePasswordSuccess: "Đổi mật khẩu thành công",
    passwordFailure: "Mật khẩu không chính xác",
    changePasswordFailure: "Mật khẩu phải có độ dài từ 8 đến 16 ký tự, bao gồm ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, 1 ký tự đặc biệt và 1 số.",
    ratingSuccess: "Đánh giá thành công",
    sendMailSuccess: "Hệ thống đã gửi mã otp tới gmail",
    sendMailFailure: "Gmail không đúng hoặc không có tài khoản nào dùng gmail này",
    tokenResetPasswordFailure: "Token này đã hết hạn",
    updateProductSuccess: "Cập nhật sản phẩm thành công",
    updateProfileSuccess: "Cập nhật thông tin người dùng thành công",
    deleteSuccess: "Xóa sản phẩm thành công",

    emailValid: "Email không tồn tại",

    accountAlreadyExist: "Tài khoản đã tồn tại"

});


const contextType = {
    fieldEmpty: {
        usernameOrPassword: <Context.Consumer>{({empty}) => `${empty}!`}</Context.Consumer>,
        name: <Context.Consumer>{({nameEmpty}) => `${nameEmpty}!`}</Context.Consumer>,
        username: <Context.Consumer>{({usernameEmpty}) => `${usernameEmpty}!`}</Context.Consumer>,
        password: <Context.Consumer>{({passwordEmpty}) => `${passwordEmpty}!`}</Context.Consumer>,
        numberPhone: <Context.Consumer>{({numberPhoneEmpty}) => `${numberPhoneEmpty}!`}</Context.Consumer>,
        address: <Context.Consumer>{({addressEmpty}) => `${addressEmpty}!`}</Context.Consumer>,
        file: <Context.Consumer>{({fileEmpty}) => `${fileEmpty}!`}</Context.Consumer>,
        size: <Context.Consumer>{({sizeEmpty}) => `${sizeEmpty}!`}</Context.Consumer>,
        email: <Context.Consumer>{({emailEmpty}) => `${emailEmpty}!`}</Context.Consumer>
    },

    valid: {
        email: <Context.Consumer>{({emailValid}) => `${emailValid}!`}</Context.Consumer>
    },

    notFound: {
        account: <Context.Consumer>{({accountNotFound}) => `${accountNotFound}!`}</Context.Consumer>,
    },

    doesNotExist: {
        category: <Context.Consumer>{({categoryDoesNotExist}) => `${categoryDoesNotExist}!`}</Context.Consumer>,
        product: <Context.Consumer>{({productDoesNotExist}) => `${productDoesNotExist}!`}</Context.Consumer>,
        account: <Context.Consumer>{({accountAlreadyExist}) => `${accountAlreadyExist}!`}</Context.Consumer>
    },

    success: {
        buy: <Context.Consumer>{({buySuccess}) => `${buySuccess}!`}</Context.Consumer>,
        upload: <Context.Consumer>{({uploadSuccess}) => `${uploadSuccess}!`}</Context.Consumer>,
        deleteTransaction:
            <Context.Consumer>{({deleteTransactionSuccess}) => `${deleteTransactionSuccess}!`}</Context.Consumer>,
        updateTransaction:
            <Context.Consumer>{({updateTransactionSuccess}) => `${updateTransactionSuccess}!`}</Context.Consumer>,
        rating:
            <Context.Consumer>{({ratingSuccess}) => `${ratingSuccess}!`}</Context.Consumer>,
        changePassword:
            <Context.Consumer>{({changePasswordSuccess}) => `${changePasswordSuccess}!`}</Context.Consumer>,
        sendMail:
            <Context.Consumer>{({sendMailSuccess}) => `${sendMailSuccess}!`}</Context.Consumer>,
        updateProduct:
            <Context.Consumer>{({updateProductSuccess}) => `${updateProductSuccess}!`}</Context.Consumer>,
        updateProfile:
            <Context.Consumer>{({updateProfileSuccess}) => `${updateProfileSuccess}!`}</Context.Consumer>,
        delete:
            <Context.Consumer>{({deleteSuccess}) => `${deleteSuccess}!`}</Context.Consumer>,
    },

    fail: {
        changePassword: <Context.Consumer>{({changePasswordFailure}) => `${changePasswordFailure}!`}</Context.Consumer>,
        passwordFailure: <Context.Consumer>{({passwordFailure}) => `${passwordFailure}!`}</Context.Consumer>,
        sendMail: <Context.Consumer>{({sendMailFailure}) => `${sendMailFailure}!`}</Context.Consumer>,
        tokenResetPassword: <Context.Consumer>{({tokenResetPasswordFailure}) => `${tokenResetPasswordFailure}!`}</Context.Consumer>,
    },

    notDelete: {
        transaction: <Context.Consumer>{({notDeleteTransaction}) => `${notDeleteTransaction}!`}</Context.Consumer>,
    },
}

export default {
    contextType
};