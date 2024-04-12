import { Pagination } from 'antd';
import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import "../../style/Home.css";
import Header from '../../components/header/Header'
import FetchData from '../../components/api/Fetch.api';
import Product from "../../components/filter/Product";

const Filter = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const query = new URLSearchParams(location.search).get("searchQuery");

    const handleSearch = async (searchQuery) => {
        console.log(query + "||" + searchQuery)
        const conditions = {
            page: page,
            searchQuery: searchQuery? searchQuery : query,
        }

        if (searchQuery && searchQuery !== query) {
            navigate(`/search?${new URLSearchParams({searchQuery: searchQuery})}`);
        }

        FetchData.productAPI.filters(conditions).then((res => {
            console.log(res.products);
            setProducts(res.products);
            setTotal(res.total);
        }))
    };

    useEffect(() => {
        handleSearch()
    }, [page])

    useEffect(() => {
        setPage(1)
        const fetchData = async () => {
            handleSearch()
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch} />
            <Product data={products}/>
            <div className="pageination">
                <Pagination current={page} defaultCurrent={1} total={total} onChange={(newPage) => setPage(newPage)} />
            </div>
        </div>
    );
};

export default Filter;
