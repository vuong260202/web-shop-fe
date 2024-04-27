const transactionColumns = [
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
];

const statisticProductColumns = [
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
];

const statisticCategoryColumns = [
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
];

export default {
    column: {
        transaction: transactionColumns,
        statistic: {
            product: statisticProductColumns,
            category: statisticCategoryColumns,
        },
    }
}