import React, {useEffect, useState} from "react";
import {Button, notification, Popconfirm, Tabs} from "antd";
import Header from "../../components/header/Header";
import FetchData from "../../components/api/Fetch.api";
import {useNavigate} from "react-router-dom";
import TransactionTable from "../../components/table/transaction/transaction.table";
import message from "../../dto/message.dto";
import {QuestionCircleOutlined} from '@ant-design/icons';
import AuthService from "../../utils/AuthUtil";
import FooterComponent from "../../components/footer/FooterComponent";
import transactionDto from "../../dto/transaction.dto";
import transactionMapper from "../../mapper/transaction.mapper";

const Transaction = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [filterStatus, setFilterStatus] = useState(transactionDto.STATUS.ALL);
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

    const handleSearch = (search) => {
        getData(search);
    }

    const getData = ({status, search}) => {
        let body = {
            status: status ?? filterStatus
        }

        if (search) {
            console.log("search: ", search);
            body.query = search;
        }

        if (status) {
            setFilterStatus(status);
        }

        FetchData.transactionAPI.filters(body).then((res) => {
            setData(transactionMapper.filterTransactionsToDisplayTransactions(res));
            console.log(res)
        });
    }



    const handleData = (status) => {
        console.log(status)
        getData({status: status});
    }

    const onChange = (key) => {
        if (key === keyTabs) return;
        setKeyTabs(key);

        console.log(items[0])
        switch (key) {
            case '1':
                handleData(transactionDto.STATUS.ALL);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '2':
                handleData(transactionDto.STATUS.PENDING);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '3':
                handleData(transactionDto.STATUS.IN_PROGRESS);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '4':
                handleData(transactionDto.STATUS.DONE);
                items[key - 1].children = <TransactionTable data={data}/>
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

    const handleDelete = () => {
        let isAccept = false;
        selectData?.forEach(sdt => {
            if (sdt.status !== transactionDto.STATUS.PENDING) {
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

    const handleAccept = () => {
        let transactionIds = selectData.map(sdt => sdt.id);
        console.log(transactionIds);
        FetchData.admin.transactionAPI.update({transactionIds: transactionIds}).then((res) => {
            openNotification(message.contextType.success.updateTransaction);
            setTimeout(() => window.location.reload(), 1000)
        });
    }

    const items = [
        {
            key: '1',
            label: 'Tất cả',
            children: <TransactionTable data={data} handleRowKeys={handleRowKeys}/>,
        },
        {
            key: '2',
            label: 'Đang chờ',
            children: <TransactionTable data={data} handleRowKeys={handleRowKeys}/>,
        },
        {
            key: '3',
            label: 'Đang xử lý',
            children: <TransactionTable data={data} handleRowKeys={handleRowKeys}/>,
        },
        {
            key: '4',
            label: 'Đã hoàn thành',
            children: <TransactionTable data={data} handleRowKeys={handleRowKeys}/>,
        },
    ];

    useEffect(() => {
        if (!AuthService.isLoggedIn) {
            navigate('/');
        }

        if (AuthService.isLoggedIn) {
            FetchData.transactionAPI.filters().then((res) => {
                setData(transactionMapper.filterTransactionsToDisplayTransactions(res));
            });
        }
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch}/>
            <div style={{display: "flex", flexDirection: "column", height: "600px"}}>
                <div style={{flexGrow: 0.7, display: "flex"}}>
                    <nav style={{flex: 2}}/>
                    <div style={{flex: 1, alignItems: "screenLeft", display: "flex"}}>
                        <div style={{flex: 1}}>
                            {AuthService.isAdmin() && <Popconfirm
                                title="Xác nhận"
                                description="Cho phép giao dịch thực hiện?"
                                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                onConfirm={handleAccept}
                            >
                                <Button danger disabled={isDisable}>Xác thực</Button>
                            </Popconfirm>}
                        </div>
                        <div style={{flex: 1}}>
                            <Popconfirm
                                title="Xác nhận"
                                description="Bạn có chắc muốn xóa?"
                                icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                onConfirm={handleDelete}
                            >
                                <Button danger disabled={isDisable}>Xóa</Button>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
                <div style={{flexGrow: 4}}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
            </div>
            {contextHolder}
        </div>
    );
};
export default Transaction;
