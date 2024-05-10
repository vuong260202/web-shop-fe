
const categoryDto = {
    statisticColumn: [
        {
            title: "STT",
            dataIndex: "index",
        },
        {
            title: "Tên hãng",
            dataIndex: "categoryName",
        },
        {
            title: "Số sản phẩm",
            dataIndex: "productCount",
        },
        {
            title: "Số lượng sản phẩm đã bán",
            dataIndex: "productPayment",
        },
        {
            title: "Số giao dịch đã thực hiện",
            dataIndex: "transactionCount",
        },
        {
            title: "Tổng số tiền thu được",
            dataIndex: "totalAmount",
        },
    ],
    adminManagerColumn: [
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
    ],
}

export default categoryDto;