import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import FetchApi from "../../../components/api/Fetch.api";
import Header from "../../../components/header/Header";
import {Button, Input, notification, Rate, Select} from "antd";
import MessageService from "../../../service/MessageService";
import AuthService from "../../../service/AuthService";
import FooterComponent from "../../../components/footer/FooterComponent";


const ChangeCategoryPage = () => {
    const navigate = useNavigate();
    const {categoryId} = useParams();
    const [categoryName, setCategoryName] = useState();
    const [category, setCategory] = useState(null);
    const [file, setFile] = useState(null);
    const [api, contextHolder] = notification.useNotification();


    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const handleUpdateProduct = () => {
        let formData = new FormData();

        formData.append('id', category.id);
        formData.append('categoryName', categoryName);
        formData.append('file', file);

        FetchApi.admin.categoryAPI.update(formData).then(res => {
            if (res.status === 400) {
                openNotification(MessageService.contextType.doesNotExist.product);
            } else if (res.status === 200) {
                openNotification(MessageService.contextType.success.upload);
            }
        })
    }

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate('/PageNotFound');
        }

        FetchApi.categoryAPI.detail({categoryId}).then((response) => {
            setCategory(response);
            setCategoryName(response.categoryName);
            console.log(response)
        })
    }, [categoryId]);

    return (<div>
        <Header/>
        {contextHolder}
        {category && <div style={{display: "flex"}}>
            <nav style={{flex: 1}}/>
            <div style={{flex: 2.8, backgroundColor: "#eacbcb", width: "300px",  textAlign: "center", alignItems: "center"}}>
                <div>
                    {file ? <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected`}
                        style={{width: "300px", height: "auto"}}
                    /> : <img
                        src={"http://localhost:3001" + category.path}
                        alt={`Product ${category.id}`}
                        style={{width: "300px", height: "auto"}}
                    />}
                </div>
                <div>
                    <input type="file" style={{height: "20px"}} onChange={(event) => {
                        setFile(event.target.files[0]);
                    }}/>
                </div>
                <nav style={{height: '100px'}}/>
                <div style={{display: "flex", height: '100px', alignItems: "center"}}>
                    <div style={{flex: 4, textAlign: "right"}}>Tên hãng: </div>
                    <nav style={{flex: 0.1}}/>
                    <div style={{flex: 9, textAlign: "left"}}>
                        <Input
                            defaultValue={categoryName}
                            style={{
                                width: "300px",
                            }}
                            onChange={(e) => setCategoryName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <Button onClick={handleUpdateProduct}>Lưu</Button>
                </div>
            </div>
            <nav style={{flex: 1}}/>
        </div>}

        <FooterComponent />
    </div>)
}

export default ChangeCategoryPage;