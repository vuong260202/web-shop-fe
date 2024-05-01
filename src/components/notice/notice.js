import {Badge, Divider, Empty, Popover} from "antd";
import {BellOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import FetchApi from "../api/Fetch.api";
import webService from "../../service/webService";
import {useNavigate} from "react-router-dom";


const NoticeComponent = () => {
    const [open, setOpen] = useState(false);
    const [newMs, setNewMs] = useState(false);
    const [content, setContent] = useState((<Empty />));
    const navigate = useNavigate();

    useEffect(() => {
        FetchApi.noticeAPI.getAll().then(res => {
            console.log(res);
            if (res && res.length > 0) {
                setNewMs(res[0].isRead === false);
                setContent((<div style={{height: '300px', width: '250px', overflowY: 'auto'}}>
                    <nav style={{opacity: 0.5}}>Thông báo mới</nav>
                    <Divider style={{marginTop: "0px"}}/>
                    <div>
                        {res.map(notice => {
                            let ntId = notice[webService.maskNotice[notice.title].name].toString();
                            if (ntId.length < 4) {
                                ntId = '0'.repeat(4 - ntId.length) + ntId;
                            }
                            return (

                                <a style={{color: "black"}} onClick={() => {
                                    if (notice.title === 'TRANSACTION') {
                                        navigate('/transaction/history');
                                    } else if (notice.title === 'PRODUCT') {
                                        navigate(`${notice.productId}/detail`);
                                    }
                                }}>
                                    <div>
                                        <Divider style={{marginBottom: '0px'}}/>
                                        {webService.maskNotice[notice.title].title} số {ntId}
                                        <Divider style={{marginTop: '0px', marginBottom: '0px'}}/>

                                        <div style={{minHeight: '75px'}}>
                                            <div style={{}}>
                                                {notice.content}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>))
            } else {
                setContent((<div style={{height: '300px', width: '250px'}}>
                    <nav style={{opacity: 0.5}}>Thông báo mới</nav>
                    <Divider style={{marginTop: "0px"}}/>
                    <div>
                        <Empty />
                    </div>
                </div>))
            }
        }).catch(err => {
            console.log(err);
        })


    }, []);

    const updateNotice = () => {
        FetchApi.noticeAPI.update().then((res) => {
            console.log(res);
        })
    }

    return (
        <Popover
            placement="bottomRight"
            content = {content}
            trigger="click"
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen)
                if (newMs) {
                    updateNotice()
                }
            }}>
            <Badge dot={newMs}>
                <BellOutlined style={{fontSize: "25px"}}/>
            </Badge>
        </Popover>
    )
}

export default NoticeComponent;