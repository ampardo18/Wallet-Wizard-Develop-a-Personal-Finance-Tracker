import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
                <tr key={item.id} onClick={() => router.push(`/category/${item.id}`)} className="hover:bg-gray-100 cursor-pointer">
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

export default CategoryList;