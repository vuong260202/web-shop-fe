import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Header from "../../../components/header/Header";
import FetchData from "../../../components/api/Fetch.api";
import product from "../../../components/defined/Product";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchData.productAPI.filters().then((res) => {
      console.log(res);
      const newData = res.products.map((product ) => ({
        key: product.id,
        id: product.id,
        productName: (<a href={`http://localhost:3001/${product.id}/detail`}>{product.productName}</a>),
        price: product.price,
        category: product.category.categoryName,
        total: product.total,
        path: product.path,
        size: 32,
        updatedAt: product.updatedAt,
        update: (<a href={`http://localhost:3001/admin/update-product/${product.id}`}>edit</a>)
      }));
      setData(newData);
    })
    .catch((error) => {
      console.error("Error fetching transaction data: ", error);
    });
  }, [])
  
  const handleSearch = (searchQuery) => {
    console.log("searchQuery: ", searchQuery);
    FetchData.productAPI.filters({filters: {
      productName: searchQuery
      }}).then((res) => {
      console.log(res);
      const newData = res.products.map((product ) => ({
        key: product.id,
        id: product.id,
        productName: (<a href={`http://localhost:3001/${product.id}/detail`}>{product.productName}</a>),
        price: product.price,
        category: product.category.categoryName,
        total: product.total,
        path: product.path,
        size: 32,
        updatedAt: product.updatedAt,
        update: (<a href={`http://localhost:3001/admin/update-product/${product.id}`}>edit</a>)
      }));
      setData(newData);
    })
  }

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <Table columns={product.adminProductColumns} dataSource={data} />;
    </div>
  );
};

export default App;
