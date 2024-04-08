import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Header from "../header/Header";
import FetchData from "../api/FetchData";
import product from "../defined/Product";

const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData.filterProducts().then((res) => {
      console.log(res);
      const newData = res.data.data.products.map((product, index) => ({
        key: index,
        id: product.id,
        productName: product.productName,
        price: product.price,
        category: product.category,
        total: product.total,
        path: product.path,
        size: 32,
        updateAt: product.updateAt,
        update: (<a href={`http://localhost:3001/admin/update-product/${product.id}`}>edit</a>)
      }));
      setData(newData);
    })
    .catch((error) => {
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

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <Table rowSelection={rowSelection} columns={product.adminProductColumns} dataSource={data} />;
    </div>
  );
};
export default App;
