"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "@/lib/redux/slices/productSlice"
import Image from "next/image"

const Product = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)
    console.log(product)

    const sanitizeText = (text) => {
        const sanitizedText = text?.replace(/(<([^>]+)>)|console\.log\([^\)]*\);/ig, '')
        return sanitizedText
    }

    const fetchProducts = async () => {
        await dispatch(getProducts())
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="flex bg-white rounded-md w-full">
            <div className="max-w-[47.75rem]">
                <div className="max-h-[18.75rem] overflow-hidden">
                    <Image
                        src={product.products?.picture}
                        alt="product"
                        width={746}
                        height={300}
                        className="object-contain" />
                </div>
                <div className="p-5">
                    <h1 className="leading-6 font-semibold text-[#374151] pb-2.5">{product.products?.name}</h1>
                    <p className="text-sm leading-6 text-[#6B7280]">{sanitizeText(product.products?.description)}</p>
                </div>
            </div>
            <div className="p-5 flex flex-col">
                <span className="leading-6 font-semibold text-[#374151] pb-2.5">Offered By</span>
                <Image
                    src={product.products?.company?.logo}
                    alt="product"
                    width={200}
                    height={36}
                />
            </div>
        </div>
    )
}

export default Product