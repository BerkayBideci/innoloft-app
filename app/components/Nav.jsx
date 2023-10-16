'use client'

import { usePathname } from 'next/navigation'
import { useSelector } from "react-redux"
import Image from "next/image"
import Link from 'next/link'

const Nav = () => {
    const pathname = usePathname()
    const product = useSelector(state => state.products)
    const productStatus = useSelector(state => state.products.status)

    return (
        <nav className="flex items-center gap-0 sm:gap-2.5 h-8">
            <Link href="/">
                <Image src="/inno_home.svg" width={16} height={16} alt="Home icon" />
            </Link>
            {pathname === '/product' && productStatus === 'succeeded' && (
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-0 sm:gap-2.5'>
                        <Image src="/Chevron_right.svg" width={20} height={20} alt="Right arrow icon" />
                        <Link href="/product" className='text-sm text-[#6B7280]'>Offers</Link>
                        <Image src="/Chevron_right.svg" width={20} height={20} alt="Right arrow icon" />
                        <Link href="/product" className='text-sm font-semibold text-[#6B7280]'>{product.products?.name}</Link>
                    </div>
                    <div>
                        <Link href="/product/edit" className="bg-[#272E71] text-sm text-white px-2.5 py-1.5 rounded-md">Edit</Link>
                    </div>
                </div>
            )}
            {pathname === '/product/edit' && (
                <div className='flex flex-wrap items-center justify-between w-full'>
                    <div className='flex items-center gap-0 sm:gap-2.5'>
                        <Image src="/Chevron_right.svg" width={20} height={20} alt="Right arrow icon" />
                        <Link href="/product" className='text-sm text-[#6B7280]'>Offers</Link>
                        <Image src="/Chevron_right.svg" width={20} height={20} alt="Right arrow icon" />
                        <Link href="/product" className='text-sm text-[#6B7280]'>{product.products?.name}</Link>
                        <Image src="/Chevron_right.svg" width={20} height={20} alt="Right arrow icon" />
                        <Link href="/product/edit" className='text-sm font-semibold text-[#6B7280]'>Edit</Link>
                    </div>
                    <div>
                        <Link href="/product" className="bg-[#272E71] text-sm text-white px-2.5 py-1.5 rounded-md">View Offer</Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Nav