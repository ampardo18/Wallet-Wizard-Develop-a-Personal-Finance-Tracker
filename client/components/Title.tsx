import React, { useEffect, useState } from "react"
import Link from "next/link"

function Title(){
    const [title, setTitle]=useState<{title: string}>({title: "Loading..."});
    useEffect(() =>{
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/title`)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data)
            setTitle(data)
        })
    }, [])

    const walletWizardTitle = title.title === "Wallet Wizard Project - February 2026"

    return(
        <header className="bg-blue-300 sticky top-0 z-50 p-2" >
            <div className="flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    {walletWizardTitle ? (
                        <Link href="/" className="block cursor-pointer">{title.title}</Link>
                    ) : (title.title)}
                </h1>
            </div>
        </header>
    )
}

export default Title;