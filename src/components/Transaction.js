import React, { useEffect, useState } from "react";
import {Table, Button, Tabs} from "antd";
import Header from "./header/Header";
import FetchData from "./api/FetchData";
import {useNavigate} from "react-router-dom";
import AuthService from "../service/AuthService";
import {get} from "axios";
const columns = [
  {
    title: "Người đặt",
    dataIndex: "buyerName",
  },
  {
    title: "Số điên thoại",
    dataIndex: "numberPhone",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
  },
  {
    title: "Số lượng",
    dataIndex: "count",
  },
  {
    title: "Tổng số tiền",
    dataIndex: "totalAmount",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "createdAt",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const handleClick = (status, transaction) => {
  FetchData.handleTransaction({status, transaction});
  window.location.reload();
}

const Transaction = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchData.getTransaction().then((res) => {
      console.log(">>" + res);
      if (res === 401 || null) {
        navigate('/');
      }

      setData(res);
    })
    .catch((error) => {
      if (!AuthService.isLoggedIn()) {
        navigate('/');
      }
      console.error("Error fetching transaction data: ", error);
    });
  }, [])

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleSearch = (search) => {}

  const getData = (status) => {
    console.log(status)
    FetchData.getTransaction(status).then((res) => {
      console.log(">>" + res);
      if (res === 401 || null) {
        navigate('/');
      }
      setData(res);
    })
        .catch((error) => {
          if (!AuthService.isLoggedIn()) {
            navigate('/');
          }
          console.error("Error fetching transaction data: ", error);
        });
  }

  const handleData = (status) => {
    console.log(status)
    getData(status);

    return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
  }

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Tất cả',
      children: handleData(),
    },
    {
      key: '2',
      label: 'Đang chờ',
      children: handleData("PENDING"),
    },
    {
      key: '3',
      label: 'Đang xử lý',
      children: handleData("IN-PROGRESS"),
    },
    {
      key: '4',
      label: 'Đã hoàn thành',
      children: handleData("DONE"),
    },
  ];

  return (
    <div>
      <Header onSearch={handleSearch}/>
      {/*<div>*/}
      {/*  <Button onClick={() => handleClick('pending', selectedRowKeys.map((key) => data[key].id))}>đang chờ</Button>*/}
      {/*  <Button onClick={() => handleClick('process', selectedRowKeys.map((key) => data[key].id))}>đang xử lý</Button>*/}
      {/*  <Button onClick={() => handleClick('done', selectedRowKeys.map((key) => data[key].id))}>hoàn thành</Button>*/}
      {/*</div>*/}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};
export default Transaction;
