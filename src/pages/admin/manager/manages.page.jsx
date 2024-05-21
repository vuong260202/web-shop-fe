import Header from "../../../components/header/Header";
import {Modal, notification, Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";
import FooterComponent from "../../../components/footer/FooterComponent";
import FetchData from "../../../components/api/Fetch.api";
import MessageService from "../../../dto/message.dto";
import ProductMapper from "../../../mapper/product.mapper";
import CategoryMapper from "../../../mapper/category.mapper";
import productDto from "../../../dto/product.dto";
import categoryDto from "../../../dto/category.dto";
import ConfirmDisPlay from "../../../components/modal/confirmDisplayProduct.productManager";



const AdminManages = () => {
    const navigate = useNavigate();
    const [displayData, setDisplayData] = useState([]);
    const [key, setKey] = useState('1');
    const [api, contextHolder] = notification.useNotification();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [status, setStatus] = useState(null);
    const [productId, setProductId] = useState(undefined);
    const [categoryId, setCategoryId] = useState(undefined);

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const deleteClickEvent = ({productId, categoryId}) => {
        setId(productId ?? categoryId);
        setOpen(true);
    }

    const getData = (body) => {
        if (key === '1') {
            FetchData.productAPI.filters(body).then((res) => {
                console.log(res.products);
                setDisplayData(ProductMapper.ProductListToProductManager({
                    products: res.products,
                    deleteClickEvent,
                    changeStatusEvent
                }));
            })
        } else {
            FetchData.categoryAPI.filter(body).then((res) => {
                console.log(res);
                setDisplayData(CategoryMapper.CategoryListToCategoryManager({
                    categories: res,
                    deleteClickEvent,
                    changeStatusEvent
                }));
            })
        }
    }

    const changeStatusEvent = ({productId, categoryId, status}) => {
        if (productId) {
            setProductId(productId);
            setCategoryId(undefined);
            setStatus(status);
            setOpenConfirm(true);
        } else if (categoryId) {
            setProductId(undefined);
            setCategoryId(categoryId);
            setStatus(status);
            setOpenConfirm(true);
        }
    }

    const handleDelete = (id) => {
        FetchData
            .admin[key === '1' ? 'productAPI' : 'categoryAPI']
            .delete(key === '1' ? {productId: id} : {categoryId: id})
            .then(() => openNotification(MessageService.contextType.success.delete))

        window.location.reload();
    }

    let manage = {
        items: [
            {
                key: '1',
                label: 'Quản lý phẩm',
                children: <Table columns={productDto.adminManagerColumn} dataSource={displayData}/>,
            },
            {
                key: '2',
                label: 'Quản lý Hãng',
                children: <Table columns={categoryDto.adminManagerColumn} dataSource={displayData}/>,
            },
        ]
    }

    const onChange = (key) => {
        console.log(key);
        setKey(key);
    };

    useEffect(() => {
        if (!AuthService.isAdmin()) {
            navigate('/PageNotFound');
        }

        getData({isAll: true});
    }, [key])

    let handleSearch = (query) => {
        getData({
            query: query,
            isAll: true
        })
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {contextHolder}
            <Modal
                title="Bạn có chắc chắn muốn xóa?"
                centered
                open={open}
                onOk={() => {
                    handleDelete(id);
                    setOpen(false)
                }}
                onCancel={() => setOpen(false)}
                width={'600px'}
            />
            <div style={{flexGrow: 0.5}}>
                <Header onSearch={handleSearch}/>
            </div>
            <div style={{flexGrow: 10, minHeight: '420px'}}>
                    <Tabs
                        defaultActiveKey="1"
                        items={manage.items}
                        onChange={onChange}
                        style={{textAlign: "center"}}
                        indicator={{
                            size: (origin) => origin - 20,
                            align: "center",
                        }}
                    />
            </div>
            <div style={{flexGrow: 1}}>
                <FooterComponent />
            </div>
            {openConfirm && <ConfirmDisPlay
                productId={productId}
                categoryId={categoryId}
                status={status}
                setOpen={setOpenConfirm}/>}
        </div>
    )
}

export default AdminManages;