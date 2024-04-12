import {Button, Col, Dropdown, Input, Row, Space} from "antd";
import React, {useEffect, useState} from "react";
import "../../style/Header.css";
import {UserOutlined, SearchOutlined} from '@ant-design/icons';

import AuthService from "../../service/AuthService";
import Profile from "./Profile";
import Auththen from "./Auththen";
const { Search } = Input;

const Header = ({onSearch}) => {
    const [value, setValue] = useState("");

    const handleSearchPress = (event) => {
        console.log(event.key)
        if (event.key === "Enter")
            onSearch(value);
    };

    const handleClickSearch = (event) => {
        console.log(value)
        onSearch(value);
    };

  useEffect(() => {
  }, []);

    return (
        <div>
            <Row style={{alignItems: "center", justifyContent: "space-between", backgroundColor: "grey"}}>
                <Col span={5}>
                    <a href={`/`} style={{textAlign: "center", color: "black"}}>
                        {/*<img src={config.app.url + "/img/logo.jpg"} alt="logo" className="img-logo"/>*/}
                        <h2>ABC Shop</h2>
                    </a>
                </Col>
                <Col span={14}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    <Input
                        size="large"
                        placeholder="input search text"
                        onChange={(e) => {setValue(e.target.value)}}
                        onKeyPress={handleSearchPress}
                        style={{flex: 7}} />
                    <Button
                        bordered={false}
                        size="large"
                        style={{flex: 1}}
                        onClick={handleClickSearch}
                        icon={<SearchOutlined/>} />
                        <nav style={{flex: 1}} />
                    </div>
                </Col>
                <Col span={5}>
                    {AuthService.isLoggedIn() ? <Profile /> : <Auththen />}
                </Col>
            </Row>
        </div>

    )
};

export default Header;
