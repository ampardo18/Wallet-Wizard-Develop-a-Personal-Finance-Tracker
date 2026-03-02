import React, { useEffect, useState } from "react";

function TransactionList(){
    const [transaction, setTransaction]= useState<
    {id: string; name: string; category_name: string; date: Date; amount: number; created_at: Date}[] | string
    >("Loading...");

    useEffect(() => {
        fetch("http://localhost:3100/api/transaction")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTransaction(data);
        });
    }, []);

    return(
    <div>
        <table className="table-auto border border-black mx-auto text-center">
        <thead>
            <tr>
            <th className="border-4 px-4 py-2">ID</th>
            <th className="border-4 px-4 py-2">Transaction Name</th>
            <th className="border-4 px-4 py-2">Category Name</th>
            <th className="border-4 px-4 py-2">Date</th>
            <th className="border-4 px-2 py-2">Amount</th>
            <th className="border-4 px-4 py-2">Created at</th>
            </tr>
        </thead>
        <tbody>
           {Array.isArray(transaction) && transaction.map((item, index) => (
            <tr key={item.id}>
              <td className="border-4 px-4 py-2">{index + 1}</td>
              <td className="border-4 px-4 py-2">{item.name}</td>
              <td className="border-4 px-4 py-2">{item.category_name}</td>
              <td className="border-4 px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
              <td className="border-4 px-4 py-2" align="right">{(item.amount / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
              <td className="border-4 px-4 py-2">{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
            </tr>
         ))}
        </tbody>
        </table>
    </div>
    )
}

export default TransactionList;