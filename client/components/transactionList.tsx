import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa"

function TransactionList(){
    const router = useRouter();
    const [transaction, setTransaction]= useState<
    {id: string; name: string; category_name: string; date: Date; amount: number; created_at: Date}[] | string
    >("Loading...");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction`)
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
            <tr key={item.id}  className="group cursor-pointer" onClick={() => router.push(`/transaction/${item.id}`)}>
              <td className="group-hover:bg-gray-200">{index + 1}</td>
              <td className="group-hover:bg-gray-200">{item.name}</td>
              <td className="group-hover:bg-gray-200">{item.category_name}</td>
              <td className="group-hover:bg-gray-200">{new Date(item.date).toLocaleDateString()}</td>
              <td className="group-hover:bg-gray-200">${(item.amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
              <td className="group-hover:bg-gray-200">{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
              <td onClick={(e) => e.stopPropagation()}>
                    <button className="cursor-pointer hover:scale-120 transition-transform" onClick={() => 
                        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction/${item.id}`, {
                            method: "DELETE"
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            router.reload()
                        })}>
                        <FaTrash style={{color: 'red'}}/>
                    </button>
              </td>
            </tr>
         ))}
        </tbody>
        </table>
    </div>
    )
}

export default TransactionList;