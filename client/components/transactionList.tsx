import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function TransactionList(){
    const router = useRouter();
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
        <h2 className="text-xl font-bold text-center p-2">Transaction List - <button onClick={() => router.push("/transaction/new")} className="bg-blue-300 font-bold w-28 border border-white cursor-pointer hover:bg-gray-300">Add New</button></h2>
        <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Transaction Name</th>
            <th>Category Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Created at</th>
            </tr>
        </thead>
        <tbody>
           {Array.isArray(transaction) && transaction.map((item, index) => (
            <tr key={item.id} onClick={() => router.push(`/transaction/${item.id}`)} className="hover:bg-gray-100 cursor-pointer" >
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category_name}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td align="right">{(item.amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
              <td>{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
            </tr>
         ))}
        </tbody>
        </table>
    </div>
    )
}

export default TransactionList;