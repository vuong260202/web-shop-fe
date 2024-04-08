import React from 'react'
import { useNavigate } from 'react-router-dom';

import {Breadcrumb} from "antd";
  
const Menu = ({datas}) => {

    const navigate = useNavigate();

    const handleClick = (api) => {
        console.log("click... navigate: " + api)
        console.log(">>>"+api)
        navigate(api);
    }

    return (
        <div>
            <Breadcrumb style={{margin: '16px 10px'}}>
                {datas && datas.map((data, index) => {
                    console.log(data)
                    return (datas.length - 1 === index ?
                        <Breadcrumb.Item>{data.name}</Breadcrumb.Item> :
                        <Breadcrumb.Item>
                            <a onClick={() => handleClick(data.api)}>{data.name}</a>
                        </Breadcrumb.Item>)
                })}
            </Breadcrumb>
        </div>)
}


export default Menu;