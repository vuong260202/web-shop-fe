import FetchData from "../api/Fetch.api";
import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";

const ConfirmDisPlay = ({productId, categoryId, status, setOpen}) => {
    const [title, setTitle] = useState('');
    const handleAccept = () => {
        if (productId) {
            FetchData.admin.productAPI.updateStatus({productId, status}).then(res => {
                console.log(res.message);
                setOpen(false);
            });
        } else if (categoryId) {
            FetchData.admin.categoryAPI.updateStatus({categoryId, status}).then(res => {
                console.log(res.message);
                setOpen(false);
            });
        }

        window.location.reload();
    }

    useEffect(() => {
        setTitle(
            "Bạn có muốn " + (status === true ? "ẩn " : "hiển thị ") + (productId ? "sản phẩm?" : "hãng và các sản phẩm của hãng?")
        )
    }, []);

    return (
        <Modal title={title}
               open={true}
               centered
                closable={false}
               width={'400px'}
               footer={<div style={{ display: 'flex', justifyContent: 'center', marginTop: "30px" }}>
                   <Button key="back" onClick={() => setOpen(false)} style={{ width: '100px', margin: '0 10px' }}>
                       Cancel
                   </Button>
                   <Button key="submit" type="primary" onClick={handleAccept} style={{ width: '100px', margin: '0 10px' }}>
                       OK
                   </Button>
               </div>}
        />
    )
}

export default ConfirmDisPlay;