import {Button, Col, Divider, Input, Popover, Row} from "antd";
import React, {useEffect, useState} from "react";
import "../../style/Header.css";
import {SearchOutlined, SendOutlined, WechatOutlined, SmileOutlined} from '@ant-design/icons';

import AuthService from "../../utils/AuthUtil";
import Profile from "./Profile";
import Auththen from "./Auththen";
import {useNavigate} from "react-router-dom";


const Header = ({onSearch}) => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [openChat, setOpenChat] = useState(false);

    const handleSearchPress = (event) => {
        console.log(event.key)
        if (event.key === "Enter")
            onSearch ? onSearch(value) : handleSearch();
    };

    const handleSearch = () => {
        if (value) {
            navigate(`/search?${new URLSearchParams({searchQuery: value})}`);
        }
    };

    const handleClickSearch = () => {
        onSearch ? onSearch(value) : handleSearch();
    };

    useEffect(() => {
    }, []);

    return (
        <div>
            <Row style={{alignItems: "center", justifyContent: "space-between", backgroundColor: "grey"}}>
                <Col span={5}>
                    <a href={`/`} style={{textAlign: "center", color: "black"}}>
                        {/*<img src={config.app.url + "/img/logo.jpg"} alt="logo" className="img-logo"/>*/}
                        <h2>Trendy Store</h2>
                    </a>
                </Col>
                <Col span={14}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Input
                            size="large"
                            placeholder="input search text"
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                            onKeyPress={handleSearchPress}
                            style={{flex: 7}}/>
                        <Button
                            bordered={false}
                            size="large"
                            style={{flex: 1}}
                            onClick={handleClickSearch}
                            icon={<SearchOutlined/>}/>
                        <nav style={{flex: 1}}/>
                    </div>
                </Col>
                <Col span={5}>
                    {AuthService.isLoggedIn() ? <Profile/> : <Auththen/>}
                </Col>
            </Row>
            <div style={{
                position: "fixed",
                zIndex: 999,
                bottom: '0px',
                right: '20px',
            }}>
                {/*{!openChat ? <WechatOutlined style={{fontSize: '30px'}} onClick={() => setOpenChat(true)}/> :*/}
                {/*<div style={{height: "400px", width: "300px", backgroundColor: "white", display: "flex", flexDirection: "column"}}>*/}
                {/*        <div style={{flexGrow: 0.5, display: "flex", flexDirection: "column"}}>*/}
                {/*            <div style={{textAlign: "right", flexGrow: 3}}>*/}
                {/*                <Button icon={'-'} onClick={() => setOpenChat(false)}/>*/}
                {/*            </div>*/}
                {/*            <div style={{flexGrow: 2}}>*/}
                {/*                <Divider style={{marginTop: '0px', marginBottom: '5px'}}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div style={{flexGrow: 15, backgroundColor: 'blue'}}>*/}
                {/*            chat content*/}
                {/*        </div>*/}
                {/*        <div style={{flexGrow: 1, bottom: '10px', width: "100%", display: "flex", flexDirection: "column"}}>*/}
                {/*            <div style={{flexGrow: 0.1}}>*/}
                {/*                <Divider style={{marginBottom: '0px', marginTop: '5px'}}/>*/}
                {/*            </div>*/}
                {/*            <div style={{ flexGrow: 1.5, alignItems: "center", display: "flex", flexDirection: "column"}}>*/}
                {/*                <div style={{flex: 7, width: '100%', border: "none"}}>*/}
                {/*                    <Input*/}
                {/*                        placeholder="Nhập tin nhắn"*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*                <div style={{width: '100%', display: "flex"}}>*/}
                {/*                    <div style={{flex: 1, textAlign: "left"}}>*/}
                {/*                        <Popover>*/}
                {/*                            <SmileOutlined onClick={() => {}}/>*/}
                {/*                        </Popover>*/}
                {/*                    </div>*/}
                {/*                    <div style={{flex: 1, textAlign: "right"}}>*/}
                {/*                        <SendOutlined/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>}*/}
            </div>
        </div>

    )
};

export default Header;
