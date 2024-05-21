import React from "react";

const transactionMapper = {
    filterTransactionsToDisplayTransactions: (transactions) => {
        return transactions.map((transaction) => {
            transaction.key = transaction.id;
            transaction.productName = <a href={`/${transaction.id}/detail`}>{transaction.productName}</a>;
            transaction.totalAmount = transaction.totalAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});

            return transaction;
        })
    },
}

export default transactionMapper;