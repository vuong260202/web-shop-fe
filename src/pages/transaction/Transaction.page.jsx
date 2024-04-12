import React, { useEffect, useState } from "react";
import {Table, Button, Tabs, notification, Popconfirm} from "antd";
import Header from "../../components/header/Header";
import FetchData from "../../components/api/Fetch.api";
import {useNavigate} from "react-router-dom";
import transaction from "../../components/defined/Transaction";
import TableTransaction from "../../components/transaction/Table.transaction";
import message from "../../service/MessageService";
import { QuestionCircleOutlined } from '@ant-design/icons';

const Transaction = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [keyTabs, setKeyTabs] = useState(0);
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

    const handleSearch = (search) => {}

    const getData = (status) => {
        console.log(status)
        FetchData.transactionAPI.filters({
            status: status,
        }).then((res) => {
            res.map((transaction) => {
                transaction.key = transaction.id;
            })
            console.log(res)
            setData(res);
        });
    }

    const handleData = (status) => {
        console.log(status)
        getData(status);
    }

    const onChange = (key) => {
        if(key === keyTabs) return;
        setKeyTabs(key);

        console.log(items[0])
        switch (key) {
            case '1':
                handleData(transaction.STATUS.ALL);
                items[key-1].children = <TableTransaction data={data}/>
                break;
            case '2':
                handleData(transaction.STATUS.PENDING);
                items[key-1].children = <TableTransaction data={data}/>
                break;
            case '3':
                handleData(transaction.STATUS.IN_PROGRESS);
                items[key-1].children = <TableTransaction data={data}/>
                break;
            case '4':
                handleData(transaction.STATUS.DONE);
                items[key-1].children = <TableTransaction data={data}/>
                break;
            default:
        }
    };

    const handleRowKeys = (selectRowKeys) => {
        if (selectRowKeys.length > 0) {
            setSelectData(data.filter(dt => selectRowKeys.includes(dt.key)));
            setIsDisable(false);
        } else {
            setSelectData(null);
            setIsDisable(true);
        }
    }

    const handleClick = () => {
        let isAccept = false;
        selectData.forEach(sdt => {
            if (sdt.status !== transaction.STATUS.PENDING) {
                isAccept = true;
            }
        })

        if (isAccept) {
            openNotification(message.contextType.notDelete.transaction);
        } else {
            let transactionIds = selectData.map(sdt => sdt.id);
            FetchData.transactionAPI.remove({transactionIds: transactionIds}).then((res) => {
                openNotification(message.contextType.success.deleteTransaction);
                window.location.reload();
            });
        }
    }

    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children:  <TableTransaction data={data} handleRowKeys={handleRowKeys}/>,
        },
        {
            key: '2',
            label: 'Đang chờ',
            children:  <TableTransaction data={data}/>,
        },
        {
            key: '3',
            label: 'Đang xử lý',
            children:  <TableTransaction data={data}/>,
        },
        {
            key: '4',
            label: 'Đã hoàn thành',
            children:  <TableTransaction data={data}/>,
        },
    ];

    useEffect(() => {
        FetchData.transactionAPI.filters().then((res) => {
            res.map((transaction) => {
                transaction.key = transaction.id;
            })
            setData(res);
        });
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch}/>
            <div style={{height: "50px", display: "flex"}}>
                <nav style={{flex: 4}}>

                </nav>
                <div style={{flex: 1, alignItems: "screenLeft"}}>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={handleClick}
                    >
                        <Button danger disabled={isDisable}>Delete</Button>
                    </Popconfirm>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            {contextHolder}
        </div>
    );
};
export default Transaction;
