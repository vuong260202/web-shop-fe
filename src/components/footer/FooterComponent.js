import React from "react";

const FooterComponent = () => {
    return (
        <footer style={{alignItems: "center", textAlign: "center", color: "black", backgroundColor: '#807d7d', bottom: 0}}>
            <div style={{marginTop: '5px'}}>
                Địa chỉ liên hệ: 123 Nguyễn Văn Trỗi, Hà Nội
            </div>
            <div style={{marginTop: '5px'}}>
                Số điện thoại liên hệ: 1234567890
            </div>
            <div style={{marginTop: '-5px', marginBottom: '5px'}}>
                <p style={{color: "black"}}>Gmail: <a href="mailto:hege@example.com">admin@gmail.com</a></p>
            </div>
        </footer>
    )
}

export default FooterComponent;