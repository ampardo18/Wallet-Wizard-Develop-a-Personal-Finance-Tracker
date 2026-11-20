import React, {useState} from 'react'
import {useRouter} from 'next/router'

function Login(){
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleLogin = async (e:React.FormEvent) => {

    }

    return(
        <div className='min-h-screen px-4 py-6'>
            <form onSubmit={handleLogin} className='flex flex-col space-y-4 p-4 bg-gray-700 rounded-lg shadow-md max-w-md w-full mx-auto mt-2'>
                <h2 className='font-bold text-xl text-center'>
                    Log-in
                </h2>
            </form>
        </div>
    )
}

export default Login