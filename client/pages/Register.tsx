import { useRouter } from 'next/router'
import React, {useState} from 'react'

function Register(){
    const router = useRouter()
    const [ showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

    const handleRegister = async (e: React.FormEvent) => {

    }

    return(
        <div className='min-h-screen select-none px-4 py-6'>
            {/*Back button for returning to home page*/}
            <form onSubmit={handleRegister} className='flex flex-col space-y-4 p-4 bg-gray-700 rounded-lg shadow-md max-w-md w-full mx-auto mt-2'>
                <h2 className='font-bold text-xl text-center'>
                    Register
                </h2>
            </form>
        </div>
    )
}

export default Register