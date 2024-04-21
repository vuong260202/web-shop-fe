const adminProductColumns = [
    {
        title: "id",
        dataIndex: "key",
    },
    {
        title: "Tên sản phẩm",
        dataIndex: "productName",
    },
    {
        title: "Giá",
        dataIndex: "price",
    },
    {
        title: "Hãng",
        dataIndex: "category",
    },
    {
        title: "Số lượng",
        dataIndex: "total",
    },
    {
        title: "Size",
        dataIndex: "size",
    },
    {
        title: "Lần cập nhật cuối",
        dataIndex: "updatedAt",
    },
    {
        title: "ảnh",
        dataIndex: "image"
    },
    {
        dataIndex: "update",
    }
]

const adminCategoryColumns = [
    {
        title: "id",
        dataIndex: "key",
    },
    {
        title: "Tên hãng",
        dataIndex: "categoryName",
    },
    {
        title: "Số lượng sản phẩm",
        dataIndex: "productCount",
    },
    {
        title: "Lần cập nhật cuối",
        dataIndex: "updatedAt",
    },
    {
        title: "ảnh",
        dataIndex: "image"
    },
    {
        dataIndex: "update",
    }
]

export default {
    adminProductColumns,
    adminCategoryColumns,
}