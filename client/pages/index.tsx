import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router'


function Index() {
  const router = useRouter()

  return (
  <div className='min-h-screen select-none px-4 py-6'>
    <header className='flex justify-end'>
      <button className='md:cursor-pointer font-bold rounded-lg bg-blue-400 h-10 w-20 transform transition-transform duration-200 hover:scale-110' onClick={() => router.push('/Login')}>Log-in</button>
    </header>
    <section className='mt-10 flex flex-col items-center justify-center space-y-4 text-center'>
      <h1 className='font-bold text-3xl'>Welcome to Wallet Wizard Financial Dashboard!</h1>
      <p>An application to assist you tracking multiple transaction from different categories</p>
    </section>
    <section className='mt-15 md:mt-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

      </div>
    </section>
    
  </div>
  )
}

export default Index;