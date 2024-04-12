import React, {useEffect, useState} from 'react';
import { Carousel } from 'antd';
import FetchApi from "../api/Fetch.api";
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const CarouselHome = () => {
    const [banners, setBanners] = useState();

    useEffect(() => {
        FetchApi.bannerAPI.all().then(
            res => {
                if(res === null) return;
                setBanners(res.banners.map(banner => {
                    return {
                        src: banner.path,
                        alt: banner.id,
                    }
                }))
            }
        )
    }, []);
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <Carousel afterChange={onChange} autoplay={true}>
            {
                banners && banners.map((banner, index) => {
                    return (
                        <div key={index}>
                            <img
                                src={"http://localhost:3001" + banner.path}
                                alt={`Banner ${banner.id}`}
                            />
                        </div>
                    )
                })
            }
        </Carousel>
    );
};
export default CarouselHome;