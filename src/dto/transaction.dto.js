
const transactionDto = {
    csv: {
        productHeader: [
            {
                label: "STT",
                key: "index",
            },
            {
                label: "Tên sản phẩm",
                key: "productName",
            },
            {
                label: "Tên hãng",
                key: "categoryName",
            },
            {
                label: "Số giao dịch đã thực hiện",
                key: "transactionCount",
            },
            {
                label: "Số lượng sản phẩm đã bán",
                key: "totalCount",
            },
            {
                label: "Đánh giá trung bình",
                key: "totalRate",
            },
            {
                label: "Số đánh giá",
                key: "rateCount",
            },
            {
                label: "Tổng số tiền thu được",
                key: "totalAmount",
            },
        ],
        categoryHeader: [
            {
                label: "STT",
                key: "index",
            },
            {
                label: "Tên hãng",
                key: "categoryName",
            },
            {
                label: "Số sản phẩm",
                key: "productCount",
            },
            {
                label: "Số lượng sản phẩm đã bán",
                key: "productPayment",
            },
            {
                label: "Số giao dịch đã thực hiện",
                key: "transactionCount",
            },
            {
                label: "Tổng số tiền thu được",
                key: "totalAmount",
            },
        ],
    },
    transactionColumns: [
        {
            title: "Người đặt",
            dataIndex: "buyerName",
        },
        {
            title: "Số điên thoại",
            dataIndex: "numberPhone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "productName",
        },
        {
            title: "Số lượng",
            dataIndex: "count",
        },
        {
            title: "Tổng số tiền",
            dataIndex: "totalAmount",
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "createdAt",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
        },
    ],
    STATUS: {
        ALL: null,
        PENDING: 'PENDING',
        DONE: 'DONE',
        IN_PROGRESS: 'IN-PROGRESS'
    },
}

export default transactionDto;