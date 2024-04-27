import React, {useEffect, useState} from "react";
import {Button, notification, Popconfirm, Tabs} from "antd";
import {useNavigate} from "react-router-dom";
import {QuestionCircleOutlined} from '@ant-design/icons';
import FooterComponent from "../../../components/footer/FooterComponent";
import Header from "../../../components/header/Header";
import AuthService from "../../../service/AuthService";
import StatisticTable from "../../../components/table/statistic/statistic.table";


const StatisticPage = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [keyTabs, setKeyTabs] = useState('1');
    const [selectData, setSelectData] = useState(null);
    const [isDisable, setIsDisable] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topLeft',
        });
    };

    const handleSearch = (search) => {
    }

    const onChange = (key) => {
        console.log(key);
        if (key === keyTabs) return;
        setKeyTabs(key);
    };

    const items = [
        {
            key: '1',
            label: 'Sản phẩm',
            children: <StatisticTable parentType={keyTabs}/>,
        },
        {
            key: '2',
            label: 'Hãng',
            children: <StatisticTable parentType={keyTabs}/>,
        },
    ];

    useEffect(() => {
        if (!AuthService.isLoggedIn) {
            navigate('/');
        }
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch}/>
            <div style={{display: "flex", flexDirection: "column", height: "600px"}}>
                <div style={{flexGrow: 4}}>
                    {keyTabs && <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>}
                </div>
                <div>
                    <FooterComponent/>
                </div>
            </div>
            {contextHolder}
        </div>
    );
};
export default StatisticPage;
