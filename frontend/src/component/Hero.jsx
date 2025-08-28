import React from 'react'
import {assets , } from '../assets/assets.js'

const Hero = () => {
  return (
    <div className='flex flex-col  items-start justify-center px-6
       md:px-16 lg:px-24 xl:px-32 text-white
       bg-[url("/src/assets/Hero.jpg")] bg-no-repeat bg-cover bg-center h-screen'
     >
     <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-19'>
        Your Gateway to Business Insights
     </p>

     <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px]
     md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Discover Companies That Power the Future
    </h1>

     <p className='max-w-130 mt-2 text-sm md:text-base'>
       Discover leading companies, explore their insights, and stay informed with the latest industry data. Start your journey today.
     </p>

     
    </div>
  )
}

export default Hero