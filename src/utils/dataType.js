import React from "react";

import AdminUploadProduct from "../components/admin/upload/product";
import AdminUploadCategory from "../components/admin/upload/category";

let DataType = {
    admin: {
        tab: {
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
        },
        avatar: {}
    },
    user: {
        avatar: {}
    },
    isOnline: {}
}

export default DataType;