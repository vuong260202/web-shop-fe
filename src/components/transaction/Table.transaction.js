import {Table} from "antd";
import React, {useState} from "react";
import transaction from "../defined/Transaction";

const TableTransaction = ({data, handleRowKeys}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
        handleRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table rowSelection={rowSelection} columns={transaction.columns} dataSource={data}
               style={{alignItems: "center"}}/>
    )
}

export default TableTransaction;