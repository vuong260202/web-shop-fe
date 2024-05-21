
const ProductDto = {
    request: {

    },
    statisticColumn: [
        {
            title: "STT",
            dataIndex: "index",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
        },
        {
            title: "Tên hãng",
            dataIndex: "categoryName",
        },
        {
            title: "Số giao dịch đã thực hiện",
            dataIndex: "transactionCount",
        },
        {
            title: "Số lượng sản phẩm đã bán",
            dataIndex: "totalCount",
        },
        {
            title: "Đánh giá trung bình",
            dataIndex: "totalRate",
        },
        {
            title: "Số đánh giá",
            dataIndex: "rateCount",
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
            title: "hiển thị",
            dataIndex: "hide",
        },
        {
            title: "ảnh",
            dataIndex: "image"
        },
        {
            dataIndex: "update",
        }
    ],
    titleCompare: [
        {productName: 'Tên'},
        {path: 'Hình ảnh'},
        {price: 'Giá'},
        {size: 'Kích thước'},
        {transactionCount: 'SL đã bán'},
        {rating: 'Đánh giá'}
    ],
}

export default ProductDto;