import React from "react";

const Context = React.createContext({
    empty: 'Tài khoản hoặc mật khẩu không được để trống',
    accountNotFound: 'Tài khoản hoặc mật khẩu không đúng',
    addressEmpty: 'Địa chỉ không được để trống',
    nameEmpty: 'Tên không được để trống',
    numberPhoneEmpty: 'Điện thoại không được để trống',
    buySuccess: 'Đặt hàng thành công'
});


const contextType = {
    empty: <Context.Consumer>{({ empty }) => `${empty}!`}</Context.Consumer>,
    accountNotFound: <Context.Consumer>{({ accountNotFound }) => `${accountNotFound}!`}</Context.Consumer>,
    addressEmpty: <Context.Consumer>{({ addressEmpty }) => `${addressEmpty}!`}</Context.Consumer>,
    nameEmpty: <Context.Consumer>{({ nameEmpty }) => `${nameEmpty}!`}</Context.Consumer>,
    numberPhoneEmpty: <Context.Consumer>{({ numberPhoneEmpty }) => `${numberPhoneEmpty}!`}</Context.Consumer>,
    buySuccess: <Context.Consumer>{({ buySuccess }) => `${buySuccess}!`}</Context.Consumer>,
}

export default {
    contextType
};