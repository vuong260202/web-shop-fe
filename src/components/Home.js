import { Pagination } from 'antd';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/Home.css";
import Header from './header/Header'
import FetchData from './api/FetchData';
import Menu from "./menu/Menu";
import breadcrumbData from "./defined/BreadcrumbData";
import ProductItem from "./product/ProductItem";
import Products from "./product/Products";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState(null)
    const navigate = useNavigate()

    const handleSearch = async (searchQuery) => {
        const conditions = {page: page}

        if (searchQuery) {
            setFilter(searchQuery)
        }

        if (searchQuery || filter) {
            if (filter !== searchQuery && searchQuery !== null) {
                conditions.filters = {
                    productName: searchQuery,
                }
            } else {
                conditions.filters = {
                    productName: filter,
                }
            }
        }

        FetchData.filterProducts(conditions).then((res => {
            console.log(res.data.data.products);
            setProducts(res.data.data.products);
            setTotal(res.data.data.total);
        }))
    };

    const handlePage = (newPage) => {
        setPage(newPage)
    }

    useEffect(() => {
        handleSearch()
    }, [page])

    useEffect(() => {
        const token = localStorage.getItem('token')
        setFilter(null)
        setPage(1)
        const fetchData = async () => {
            if (token === 'null') { navigate('/') }

            handleSearch()
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch} />
            <Menu datas={breadcrumbData.home}/>
            <div>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm mới</h2>
                {/*{product}*/}
            </div>
            <div>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm bán chạy</h2>
                {/*{product}*/}
            </div>
            <Products data={products}/>
            <div className="pageination">
                <Pagination current={page} defaultCurrent={1} total={total} onChange={(newPage) => handlePage(newPage)} />
            </div>
        </div>
    );
};

export default Home;
