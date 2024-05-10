import React from "react";

const transactionMapper = {
    filterTransactionsToDisplayTransactions: (transactions) => {
        return transactions.map((transaction) => {
            transaction.key = transaction.id;
            transaction.productName = <a href={`/${transaction.id}/detail`}>{transaction.productName}</a>;

            return transactions;
        })
    },
}

export default transactionMapper;