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

const csvHeaderProduct = [
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
];

const csvHeaderCategory = [
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
];

export default {
    column: {
        transaction: transactionColumns,
        statistic: {
            product: statisticProductColumns,
            category: statisticCategoryColumns,
        },
    },
    csv: {
        header: {
            product: csvHeaderProduct,
            category: csvHeaderCategory,
        }
    }
}