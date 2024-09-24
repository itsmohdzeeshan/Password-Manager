import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-slate-900 p-4 flex justify-around text-white items-center '>
        <div className='flex font-bold mx-6 text-xl'>
       <span className='text-green-600'>&lt;</span> 
        <h1>Pass</h1>
        <span className='text-green-600'>OP/</span>
        <span className='text-green-600'>&gt;</span>
        
        </div>
      {/* <ul className='flex space-x-4 mx-6'>
        <li className='text-white'>Home</li>
        <li className='text-white'>About</li>
        <li className='text-white'>Contact</li>
      </ul> */}

      <div className="github bg-green-500 flex gap-3 p-2 rounded-full cursor-pointer">
        <img width={20} className='invert ' src="./github.svg" alt="" />
        <span className='font-bold'>GitHub</span>
      </div>
    </nav>
  );
};

export default Navbar;
