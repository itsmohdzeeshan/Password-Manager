import React from 'react'

const footer = () => {
    return (
        <>

            <div className='bg-slate-900 p-4 text-white flex justify-around items-center w-full '>
                <div className='flex font-bold mx-6'>
                    <span className='text-green-600'>&lt;</span>
                    <h1>Pass</h1>
                    <span className='text-green-600'>OP/</span>
                    <span className='text-green-600'>&gt;</span>

                </div>
                <span className='font-bold'>
                Created By Mohd Zeeshan Khan
                </span>
            </div>
        </>
    )
}

export default footer
