import {Checkbox, Divider, Empty, Pagination} from 'antd';
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import "../../style/Home.css";
import Header from '../../components/header/Header'
import FetchData from '../../components/api/Fetch.api';
import Product from "../../components/filter/Product";
import NewProducts from "../../components/home/NewProducts";
import FooterComponent from "../../components/footer/FooterComponent";

const Filter = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(undefined);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate()
    const location = useLocation()
    const [checkCategory, setCheckCategory] = useState([]);
    const [optionsCategory, setOptionsCategory] = useState([]);
    const query = new URLSearchParams(location.search).get("searchQuery");

    const handleSearch = (searchQuery) => {
        const conditions = {
            filters: {
                page: page ?? 1,
                productName: searchQuery ?? query,
                categories: (checkCategory.length === optionsCategory.length || checkCategory.length === 0)
                    ? undefined
                    : optionsCategory.filter(category => checkCategory.includes(category.categoryName)).map(category => category.id)
            }
        }

        console.log(conditions);

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
        console.log("page", page,  query)
        if(page !== undefined) handleSearch();
    }, [page])

    useEffect(() => {
        console.log(query)
        handleSearch()
        FetchData.categoryAPI.all().then((res) => {
            console.log(">>>", res);
            setOptionsCategory(res);
            setCheckCategory(res.map(category => category.categoryName));
        })
    }, []);

    return (
        <div>
            <Header onSearch={handleSearch} />
            <div style={{display: 'flex', flexDirection: "column", height: "500px"}}>
                <div style={{flexGrow: 15}}>
                    <div>
                        {optionsCategory && <div style={{alignItems: "center", display: "flex", margin: "20px"}}>
                            <div>
                                Hãng:
                            </div>
                            <div style={{marginLeft: "20px"}}>
                                <Checkbox checked={checkCategory.length === optionsCategory.length} onChange={() => {
                                    if (checkCategory.length === optionsCategory.length) {
                                        setCheckCategory([]);
                                    } else {
                                        setCheckCategory(optionsCategory.map(category => category.categoryName));
                                    }
                                }}>
                                    Check all
                                </Checkbox>
                            </div>
                            <div style={{marginLeft: "20px"}}>
                                <Checkbox.Group options={optionsCategory.map(category => category.categoryName)}
                                                value={checkCategory} onChange={(list) => {
                                    setCheckCategory(list);
                                }}/>
                            </div>
                        </div>}
                    </div>
                    <Divider/>
                    <div>
                        {!products.length ? <Empty/> :
                            <div>
                                <div style={{margin: '0px 0px', alignItems: "center", textAlign: "center"}}>
                                    <Product data={products}/>
                                </div>
                                <div className="pageination">
                                    <Pagination current={page} defaultCurrent={1} total={total}
                                                onChange={(newPage) => setPage(newPage)}/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div style={{flexGrow: 0.2}}>
                        <FooterComponent />
                </div>
            </div>
        </div>
    );
};

export default Filter;
