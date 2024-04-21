import React from "react";

import AdminManageProduct from "../components/admin/manage/product";
import AdminManageCategory from "../components/admin/manage/category";
import AdminUploadProduct from "../components/admin/upload/product";
import AdminUploadCategory from "../components/admin/upload/category";

let DataType = {
    admin: {
        tab: {
            manage: {
                items: [
                    {
                        key: '1',
                        label: 'Quản lý phẩm',
                        children: <AdminManageProduct/>,
                    },
                    {
                        key: '2',
                        label: 'Quản lý Hãng',
                        children: <AdminManageCategory/>,
                    },
                ]
            },
            upload: {
                items: [
                    {
                        key: '1',
                        label: 'Thêm sản phẩm',
                        children: <AdminUploadProduct/>,
                    },
                    {
                        key: '2',
                        label: 'Thêm Hãng',
                        children: <AdminUploadCategory/>,
                    },
                    // {
                    //     key: '3',
                    //     label: 'Thêm banner',
                    //     children: <Banner />,
                    // },
                ]
            }
        }
    }
}

export default DataType;