"use client"

import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { getProducts } from "@/lib/redux/slices/productSlice"
import Image from "next/image"

const Product = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })

    const fetchProducts = async () => {
        await dispatch(getProducts())
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const Map = () => {
        const center = useMemo(() => ({ lat: parseFloat(product.products?.company?.address.latitude), lng: parseFloat(product.products?.company?.address.longitude) }), [])
        if (!isLoaded) return <div>Loading...</div>
        return (
            <GoogleMap
                zoom={14}
                center={center}
                mapContainerClassName="w-full h-[12.5rem]">
                <MarkerF key={center.lat} title={product.products?.company?.name}
                    position={center} />
            </GoogleMap>
        )
    }

    const sanitizeText = (text) => {
        const sanitizedText = text?.replace(/(<([^>]+)>)|console\.log\([^\)]*\);/ig, '')
        return sanitizedText
    }

    function extractYouTubeSrc(url) {
        const regex = /https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
        const match = url?.match(regex);
        return match ? match[1] : "";
    }

    return (
        <div className="flex flex-col gap-y-5 w-full">
            <div className="flex flex-col xl:flex-row bg-white rounded-md border border-[#E5E7EB]">
                <div className="xl:max-w-[46.625rem]">
                    <div className="max-h-[18.75rem] overflow-hidden relative">
                        <Image
                            src={product.products?.picture}
                            alt="product"
                            width={746}
                            height={300}
                            className="object-contain" />
                        <div className="absolute top-0 left-0 flex items-center h-[2.5rem] gap-x-2.5 border-b border-r border-[#E5E7EB] rounded-tl-md rounded-br-md bg-white">
                            <div className="bg-[#272E71] p-3 rounded-tl-md rounded-br-md">
                                <Image
                                    src="/inno_dev-4.svg"
                                    alt="Software icon"
                                    width={16} height={16}
                                />
                            </div>
                            <div className="pe-2.5">
                                <span className="font-semibold text-[#374151]">Software</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <h1 className="leading-6 font-semibold text-[#374151] pb-2.5">{product.products?.name}</h1>
                        <p className="text-sm leading-6 text-[#6B7280]">{sanitizeText(product.products?.description)}</p>
                    </div>
                </div>
                <div className="p-5 flex flex-col w-full gap-y-2.5 border-l border-[#E5E7EB]">
                    <span className="leading-6 font-semibold text-[#374151]">Offered By</span>
                    <Image
                        src={product.products?.company?.logo}
                        alt="product"
                        width={200}
                        height={36}
                    />
                    <div className="flex items-center gap-x-2.5">
                        <Image
                            src={product.products?.user?.profilePicture}
                            width={60}
                            height={60}
                            alt="profile-image"
                            className="rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm text-[#6B7280]">{product.products?.user?.firstName + " " + product.products?.user?.lastName}</span>
                            <span className="text-sm text-[#6B7280]">{product.products?.user?.position}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-x-1.5 mt-2.5">
                        <Image src="/inno_location.svg" width={16} height={16} alt="Location icon" />
                        <div className="flex flex-col text-sm text-[#6B7280]">
                            <span>{product.products?.company?.address.street + " " + product.products?.company?.address.house + ","}</span>
                            <span>{product.products?.company?.address.zipCode + " " + product.products?.company?.address.city.name + ", " + product.products?.company?.address.country.name}</span>
                        </div>
                    </div>
                    <Map />
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Video</h3>
                <div className="relative pt-[56.25%]">
                    <iframe
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                        src={`https://www.youtube.com/embed/${extractYouTubeSrc(product.products?.video)}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    >
                    </iframe>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Offer details</h3>
                <div className="grid xl:grid-cols-2 gap-x-10 gap-y-5 text-[#6B7280]">
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_dev-4.svg" width={24} height={24} alt="Technology icon" />
                            <div className="flex flex-col gap-y-2.5">
                                <span>Technology</span>
                                <div className="flex flex-col sm:flex-row gap-x-1.5 gap-y-1.5">
                                    {product.products?.categories?.map((category) => (
                                        <span key={category.id} className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{category.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_strategy.svg" width={24} height={24} alt="Business model icon" />
                            <div className="flex flex-col gap-y-2.5">
                                <span>Business Model</span>
                                <div className="flex flex-col sm:flex-row gap-x-1.5 gap-y-1.5">
                                    {product.products?.businessModels?.map((model) => (
                                        <span key={model.id} className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{model.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_clock.svg" width={24} height={24} alt="TRL icon" />
                            <div className="flex flex-col gap-2.5">
                                <span>TRL</span>
                                <span className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem] max-w-[9rem] sm:max-w-full">{product.products?.trl?.name?.replace(/\(.*?\)/g, '').trim()}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_investor.svg" width={24} height={24} alt="Costs icon" />
                            <div className="flex flex-col gap-2.5">
                                <span>Costs</span>
                                <span className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{product.products?.investmentEffort?.replace("€", " €")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product