import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

function CategoryList(){
    const router = useRouter()
    const [category, setCategory]=useState<
    {id: string; category_name: string; date: Date; created_at: Date}[] | string
    >();

    useEffect(() => {
        fetch("http://localhost:3100/api/category")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCategory(data);
        });
    }, []);

    return(
        <div>
            <h2 className="text-xl font-bold text-center p-2">Category List - <button onClick={() => router.push("/category/new")} className="bg-blue-300 font-bold w-28 border border-white cursor-pointer hover:bg-gray-300">Add New</button></h2>
            <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Created at</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(category) && category.map((item, index) => (
                <tr key={item.id} onClick={() => router.push(`/category/${item.id}`)} className="group cursor-pointer">
                    <td className="group-hover:bg-gray-200">{index + 1}</td>
                    <td className="group-hover:bg-gray-200">{item.category_name}</td>
                    <td className="group-hover:bg-gray-200">{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                        <button className="cursor-pointer hover:scale-120 transition-transform" onClick={() => 
                        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/${item.id}`, {
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

export default CategoryList;