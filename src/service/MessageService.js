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

    accountNotFound: 'Tài khoản hoặc mật khẩu không đúng',
    buySuccess: 'Đặt hàng thành công',
    uploadSuccess: 'Upload thành công',
    categoryDoesNotExist: "Hãng đã tồn tại",
    notDeleteTransaction: "Chỉ có thể hủy đơn hàng có trạng thái là PENDING",
    deleteTransactionSuccess: "Xóa đơn hàng thành công",
});


const contextType = {
    fieldEmpty: {
        usernameOrPassword: <Context.Consumer>{({ empty }) => `${empty}!`}</Context.Consumer>,
        name: <Context.Consumer>{({ nameEmpty }) => `${nameEmpty}!`}</Context.Consumer>,
        username: <Context.Consumer>{({ usernameEmpty }) => `${usernameEmpty}!`}</Context.Consumer>,
        password: <Context.Consumer>{({ passwordEmpty }) => `${passwordEmpty}!`}</Context.Consumer>,
        numberPhone: <Context.Consumer>{({ numberPhoneEmpty }) => `${numberPhoneEmpty}!`}</Context.Consumer>,
        address: <Context.Consumer>{({ addressEmpty }) => `${addressEmpty}!`}</Context.Consumer>,
        file: <Context.Consumer>{({ fileEmpty }) => `${fileEmpty}!`}</Context.Consumer>,
    },

    notFound: {
        account: <Context.Consumer>{({ accountNotFound }) => `${accountNotFound}!`}</Context.Consumer>,
    },

    doesNotExist: {
        category: <Context.Consumer>{({ categoryDoesNotExist }) => `${categoryDoesNotExist}!`}</Context.Consumer>,
    },

    success: {
        buy: <Context.Consumer>{({ buySuccess }) => `${buySuccess}!`}</Context.Consumer>,
        upload: <Context.Consumer>{({ uploadSuccess }) => `${uploadSuccess}!`}</Context.Consumer>,
        deleteTransaction: <Context.Consumer>{({ deleteTransactionSuccess }) => `${deleteTransactionSuccess}!`}</Context.Consumer>,
    },

    notDelete: {
        transaction: <Context.Consumer>{({ notDeleteTransaction }) => `${notDeleteTransaction}!`}</Context.Consumer>,
    },
}

export default {
    contextType
};