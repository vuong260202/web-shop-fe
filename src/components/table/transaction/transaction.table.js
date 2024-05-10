import {Table} from "antd";
import React, {useState} from "react";
import transactionDto from "../../../dto/transaction.dto";

const TransactionTable = ({data, handleRowKeys}) => {
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
        <Table rowSelection={rowSelection} columns={transactionDto.transactionColumns} dataSource={data}
               style={{alignItems: "center"}}/>
    )
}

export default TransactionTable;