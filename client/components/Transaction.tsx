import {useRouter} from "next/router";
import CategorySelect from "./CategorySelect";
import React, {useEffect, useState} from "react";

function Transaction({id}: {id: string}){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [transaction, setTransaction] = useState<{
        id: string;
        name: string;
        category_id: string;
        category_name: string; 
        description: string;
        date: Date;
        amount: number;
        created_at: Date;
    } >({
        id: "",
        name: "",
        category_id: "",
        category_name: "",
        description: "",
        date: new Date(),
        amount: 0,
        created_at: new Date()
    });

    useEffect(() =>{
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/transaction/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTransaction({
                ...data,
                id: id
            });
            setLoading(false);
        })
    }, [id])

    if(loading){
        return <div>Loading...</div>
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: value
        })
    }

    return(
        <div className='flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg'>
            <h2 className="text-l font-bold">Transaction Edit/Delete</h2>
            <div className="flex items-center space-x-4">
                <label htmlFor="id">ID : </label>{transaction.id}    
            </div>

            <div className="flex items-center space-x-4">
                <label htmlFor="name">Name : </label>
                <input
                    className="flex-1 border rounded p-1"
                    type="text"
                    value={transaction.name}
                    onChange={(e) =>
                        setTransaction((prev) => ({ ...prev, name: e.target.value}))
                    }
                />
            </div>

            <div className="flex items-center space-x-4">
                <label htmlFor="description">Description : </label>

                <input
                    className="flex-1 border rounded p-1"
                    type="text"
                    value={transaction.description}
                    onChange={(e) =>
                        setTransaction((prev) => ({
                            ...prev, description: e.target.value
                        }))
                    }
                />
            </div>

            <div className="flex items-center space-x-4">
                <label htmlFor="category_id">Category : </label>
                <CategorySelect
                    value={transaction.category_id}
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="date">Date :</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={transaction.date ? new Date(transaction.date).toISOString().split("T")[0] : ""}
                    onChange={handleChange}
                    required
                    className="flex-1 border rounded p-1"
                />  
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor="amount">Amount : </label>
                $<input 
                    type="number"
                    id="amount"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleChange}
                    className="flex-1 border rounded p-1"
                />
            </div>    
            <div>
                <label htmlFor="created_at">Created At : </label>{new Date(transaction.created_at).toLocaleString('en-US', {timeZoneName: 'short'})}
            </div> 
        </div>
    );
}

export default Transaction;