import React, {useEffect, useState} from "react";
import {Button, notification, Popconfirm, Tabs} from "antd";
import Header from "../../components/header/Header";
import FetchData from "../../components/api/Fetch.api";
import {useNavigate} from "react-router-dom";
import transaction from "../../components/defined/Transaction";
import TransactionTable from "../../components/table/transaction/transaction.table";
import message from "../../service/MessageService";
import {QuestionCircleOutlined} from '@ant-design/icons';
import AuthService from "../../service/AuthService";
import FooterComponent from "../../components/footer/FooterComponent";
import FetchApi from "../../components/api/Fetch.api";
import webService from "../../service/webService";

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

    const handleSearch = (search) => {
    }

    const getData = (status) => {
        console.log(status)
        FetchData.transactionAPI.filters({
            status: status,
        }).then((res) => {
            res.map((transaction) => {
                transaction.key = transaction.id;
                transaction.productName = <a href={`/${transaction.id}/detail`}>{transaction.productName}</a>;
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
        if (key === keyTabs) return;
        setKeyTabs(key);

        console.log(items[0])
        switch (key) {
            case '1':
                handleData(transaction.STATUS.ALL);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '2':
                handleData(transaction.STATUS.PENDING);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '3':
                handleData(transaction.STATUS.IN_PROGRESS);
                items[key - 1].children = <TransactionTable data={data}/>
                break;
            case '4':
                handleData(transaction.STATUS.DONE);
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
                if (res?.status === 401) {
                    navigate('/PageNotFound');
                } else {
                    res?.map((transaction) => {
                        transaction.key = transaction.id;
                        transaction.productName = <a href={`/${transaction.product.id}/detail`}>{transaction.productName}</a>;
                    })
                    setData(res);
                }

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
                        <Popconfirm
                            title="Xác nhận"
                            description="Cho phép giao dịch thực hiện?"
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            onConfirm={handleAccept}
                        >
                            <Button danger disabled={isDisable}>Xác thực</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Xác nhận"
                            description="Bạn có chắc muốn xóa?"
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                            onConfirm={handleDelete}
                        >
                            <Button danger disabled={isDisable}>Delete</Button>
                        </Popconfirm>
                    </div>
                </div>
                <div style={{flexGrow: 4}}>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
                </div>
                <div>
                    <FooterComponent/>
                </div>
            </div>
            {contextHolder}
        </div>
    );
};
export default Transaction;
