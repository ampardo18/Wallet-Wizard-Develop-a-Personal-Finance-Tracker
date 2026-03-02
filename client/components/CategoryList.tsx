import React, { useEffect, useState } from "react";

function CategoryList(){
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
            <table className="table-auto border border-black mx-auto text-center">
            <thead>
                <tr>
                <th className="border-4 px-4 py-2">ID</th>
                <th className="border-4 px-4 py-2">Category Name</th>
                <th className="border-4 px-4 py-2">Created at</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(category) && category.map((item, index) => (
                <tr key={item.id}>
                    <td className="border-4 px-4 py-2">{index + 1}</td>
                    <td className="border-4 px-4 py-2">{item.category_name}</td>
                    <td className="border-4 px-4 py-2">{new Date(item.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

export default CategoryList;