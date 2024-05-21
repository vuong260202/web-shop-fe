import React, {useEffect, useState} from "react";
import "../../style/Home.css";
import Header from '../../components/header/Header'
import FetchData from '../../components/api/Fetch.api';
import CarouselHome from "../../components/home/CarouselHome";
import NewProducts from "../../components/home/NewProducts";
import SellingProducts from "../../components/home/SellingProducts";
import FooterComponent from "../../components/footer/FooterComponent";

const Home = () => {
    const [newProducts, setNewProducts] = useState(null);
    const [sellingProducts, setSellingProducts] = useState(null);

    useEffect(() => {
        FetchData.productAPI.filters({type: "new"}).then((res => {
            console.log(res?.products);
            setNewProducts(res?.products);
        }))

        FetchData.productAPI.filters({type: "hot"}).then((res => {
            console.log(res?.products);
            setSellingProducts(res?.products);
        }))
    }, []);

    return (
        <div style={{backgroundColor: 'rgba(89,87,87,0.8)'}}>
            <Header/>
            <div style={{backgroundColor: 'rgba(245,242,242,0.8)', margin: '10px'}}>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm mới</h2>
                <div style={{alignItems: "center", textAlign: "center"}}>
                    <NewProducts data={newProducts}/>
                </div>
            </div>
            <div style={{backgroundColor: 'rgba(245,242,242,0.8)', margin: '10px'}}>
                <h2 style={{padding: "16px 10px"}}>Sản phẩm bán chạy</h2>
                <div style={{alignItems: "center", textAlign: "center"}}>
                    <SellingProducts data={sellingProducts}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
