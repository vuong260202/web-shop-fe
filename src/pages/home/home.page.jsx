import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../style/Home.css";
import Header from '../../components/header/Header'
import FetchData from '../../components/api/Fetch.api';
import CarouselHome from "../../components/home/CarouselHome";
import NewProducts from "../../components/home/NewProducts";
import SellingProducts from "../../components/home/SellingProducts";

const Home = () => {
    const [newProducts, setNewProducts] = useState(null);
    const [sellingProducts, setSellingProducts] = useState(null);
    const navigate = useNavigate()

    const handleSearch = (searchQuery) => {

        if (searchQuery) {
            navigate(`/search?${new URLSearchParams({searchQuery: searchQuery})}`);
        }

        FetchData.productAPI.filters({type: "new"}).then((res => {
            console.log(res.products);
            setNewProducts(res.products);
        }))

        FetchData.productAPI.filters({type: "hot"}).then((res => {
            console.log(res.products);
            setSellingProducts(res.products);
        }))
    };

    useEffect(() => {
            handleSearch();
    }, []);

    return (
        <div style={{backgroundColor: 'rgba(89,87,87,0.8)'}}>
            <Header onSearch={handleSearch} />
            <CarouselHome />
            <div style={{backgroundColor: 'rgba(245,242,242,0.8)'}}>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm mới</h2>
                <div  style={{ margin: '0px 0px', alignItems: "center", textAlign: "center"}}>
                    <NewProducts data={newProducts}/>
                </div>
            </div>
            <div style={{backgroundColor: 'rgba(245,242,242,0.8)'}}>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm bán chạy</h2>
                <div  style={{ margin: '0px 0px', alignItems: "center", textAlign: "center"}}>
                    <SellingProducts data={sellingProducts}/>
                </div>
            </div>
        </div>
    );
};

export default Home;