import {Table} from "antd";
import React, {useState} from "react";
import tableColumn from "../../defined/tableColumn";

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
        <Table rowSelection={rowSelection} columns={tableColumn.column.transaction} dataSource={data}
               style={{alignItems: "center"}}/>
    )
}

export default TransactionTable;