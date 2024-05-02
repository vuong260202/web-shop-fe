import Header from "../../../components/header/Header";
import {Modal, notification, Popconfirm, Table, Tabs} from "antd";
import React, {useEffect, useState} from "react";
import AuthService from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";
import FooterComponent from "../../../components/footer/FooterComponent";
import FetchData from "../../../components/api/Fetch.api";
import MessageService from "../../../service/MessageService";
import product from "../../../components/defined/Product";



const AdminManages = () => {
    const navigate = useNavigate();
    const [displayData, setDisplayData] = useState([]);
    const [key, setKey] = useState('1');
    const [api, contextHolder] = notification.useNotification();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const openNotification = (type) => {
        api.info({
            message: "Message",
            description: type,
            placement: 'topRight',
        });
    };

    const getData = (body) => {
        if (key === '1') {
            FetchData.productAPI.filters(body).then((res) => {
                console.log(res.products);
                setDisplayData(res.products.map((product, index) => ({
                        key: index + 1,
                        id: product.id,
                        productName: (<a href={`http://localhost:3001/${product.id}/detail`}>{product.productName}</a>),
                        price: product.price,
                        category: product.category.categoryName,
                        total: product.total,
                        path: product.path,
                        size: 32,
                        updatedAt: product.updatedAt,
                        image: (
                            <div>
                                <img
                                    src={'http://localhost:3001' + product.path}
                                    style={{width: '100px', height: "auto"}}
                                />
                            </div>),
                        update: (<div>
                            <a href={`http://localhost:3001/admin/${product.id}/update`}>sửa</a> |
                            <a onClick={() => {
                                setId(product.id)
                                setOpen(true);
                            }}>xóa</a>

                        </div>)
                    })
                ));
            })
                .catch((error) => {
                    console.error("Error fetching transaction data: ", error);
                });
        } else {
            FetchData.categoryAPI.filter(body).then((res) => {
                console.log(res);
                setDisplayData(res.map((category, index) => ({
                        key: index + 1,
                        id: category.id,
                        categoryName: category.categoryName,
                        productCount: category.productCount,
                        path: category.path,
                        updatedAt: category.updatedAt,
                        image: (
                            <div>
                                <img
                                    src={'http://localhost:3001' + category.path}
                                    style={{width: '100px', height: "auto"}}
                                />
                            </div>),
                        update: (<div>
                            <a href={`http://localhost:3001/admin/${category.id}/category-update`}>sửa</a> | <a onClick={() => handleDelete(category.id)}>xóa</a>
                        </div>)
                    })
                ));
            })
                .catch((error) => {
                    console.error("Error fetching transaction data: ", error);
                });
        }
    }

    const handleDelete = (id) => {
        if (key === '1') {
            FetchData.admin.productAPI.delete({productId: id}).then((res) => {
                openNotification(MessageService.contextType.success.delete)
            })
        } else {
            FetchData.admin.categoryAPI.delete({categoryId: id}).then((res) => {
                openNotification(MessageService.contextType.success.delete)
            })
        }

        window.location.reload();
    }

    let manage = {
        items: [
            {
                key: '1',
                label: 'Quản lý phẩm',
                children: <Table columns={product.adminProductColumns} dataSource={displayData}/>,
            },
            {
                key: '2',
                label: 'Quản lý Hãng',
                children: <Table columns={product.adminCategoryColumns} dataSource={displayData}/>,
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

        getData();
    }, [key])

    let handleSearch = (query) => {
        getData({
            query: query
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
            >
            </Modal>
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
        </div>
    )
}

export default AdminManages;