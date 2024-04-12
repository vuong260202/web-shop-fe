const columns = [
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

const STATUS = {
    ALL: null,
    PENDING: 'PENDING',
    DONE: 'DONE',
    IN_PROGRESS: 'IN-PROGRESS'
};

export default {
    columns,
    STATUS,
}