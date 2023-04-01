import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <header className='flex p-5 top-0 sticky z-50 justify-between bg-white shadow-md'>
            {/* left */}
            <div className='flex space-x-2 items-center'>
                <Image src='https://links.papareact.com/4t3'
                    alt='logo'
                    height={30}
                    width={30}
                />
                <div>
                    <h1 className='text-bold'>The DEEPK <span className='text-red-500'>AI</span> Image Generator</h1>
                    <h2 className='text-xs'>Powered by DALL.E, Chapt Gpt & Microsoft Azure </h2>
                </div>
            </div>

            {/* right */}
            <div className='text-xs md:text-base text-gray-500 divide-x items-center'>
                <Link href='https://6421a60d12aaff0008bd132e--deepkumar-portfolio-17323b.netlify.app/'
                    className='px-2 font-light text-right'>Checkout my Portfolio Site</Link>
                <Link href=""
                    className='px-2 font-light'>GitHub Repository</Link>
            </div>
        </header>
    )
}

export default Header
