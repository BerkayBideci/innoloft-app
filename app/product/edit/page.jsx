"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/lib/redux/slices/productSlice"

const Edit = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)

    const fetchProducts = async () => {
        await dispatch(getProducts())
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        control,
        setValue,
    } = useForm();

    const sanitizeText = (text) => {
        const sanitizedText = text?.replace(/(<([^>]+)>)|console\.log\([^\)]*\);/ig, '')
        return sanitizedText
    }

    const productDesc = watch("productDesc");

    return (
        <div className="flex flex-col gap-y-5 w-full">
            <div className="flex bg-white rounded-md border border-[#E5E7EB]">
                <div className="max-w-[46.625rem]">
                    <div className="max-h-[18.75rem] overflow-hidden relative">
                        <Image
                            src={product.products?.picture}
                            alt="product"
                            width={746}
                            height={300}
                            className="object-contain" />
                        <div className="absolute top-0 left-0 flex items-center h-[2.5rem] gap-x-2.5 border-b border-r border-[#E5E7EB] rounded-tl-md rounded-br-md">
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
                    <form className="p-5 flex flex-col gap-2.5">
                        <input
                            {...register("productName", {
                                required: true,
                                pattern:
                                    /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                            })}
                            defaultValue={product.products?.name}
                            className="leading-6 font-semibold text-[#374151] px-2.5 py-1.5 w-full border border-[#E5E7EB] rounded-md"
                        />
                        <div className="relative">
                            <textarea
                                {...register("productDesc", {
                                    required: true,
                                    maxLength: 1000,
                                    pattern:
                                        /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                                })}
                                defaultValue={sanitizeText(product.products?.description)}
                                className="leading-6 text-sm text-[#6B7280] px-2.5 pt-16 w-full border border-[#E5E7EB] rounded-md min-h-[22rem] resize-y overflow-hidden"
                            />
                            <span className="absolute right-1.5 top-10 text-[#6B7280] text-[10px] leading-3">{productDesc?.length || 0}/1000</span>
                        </div>
                    </form>
                </div>
                <div className="p-5 flex flex-col min-w-max gap-y-2.5 border-l border-[#E5E7EB]">
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
                        <Image src="/inno_location.svg" width={16} height={16} />
                        <div className="flex flex-col text-sm text-[#6B7280]">
                            <span>{product.products?.company?.address.street + " " + product.products?.company?.address.house + ","}</span>
                            <span>{product.products?.company?.address.zipCode + " " + product.products?.company?.address.city.name + ", " + product.products?.company?.address.country.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Video</h3>
                <div>
                    <form>
                        <input
                            {...register("productVideo", {
                                required: true,
                                pattern:
                                    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/|vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]+\/videos\/|album\/\d+\/video\/|video\/|))([^\s&]+)/,
                            })}
                            defaultValue={product.products?.video}
                            placeholder="Add a youtube or vimeo link"
                            className="leading-6 font-semibold text-[#374151] px-2.5 py-1.5 w-full border border-[#E5E7EB] rounded-md"
                        />
                    </form>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Offer details</h3>
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[#6B7280]">
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_dev-4.svg" width={24} height={24} />
                            <div className="flex flex-col gap-y-2.5">
                                <span>Technology</span>
                                <div className="flex gap-x-1.5">
                                    {product.products?.categories?.map((category) => (
                                        <span key={category.id} className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{category.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_strategy.svg" width={24} height={24} />
                            <div className="flex flex-col gap-y-2.5">
                                <span>Business Model</span>
                                <div className="flex gap-x-1.5">
                                    {product.products?.businessModels?.map((model) => (
                                        <span key={model.id} className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{model.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_clock.svg" width={24} height={24} />
                            <div className="flex flex-col gap-2.5">
                                <span>TRL</span>
                                <span className="bg-[#E5E7EB] text-sm py-1.5 px-3.5 rounded-[1.25rem]">{product.products?.trl?.name?.replace(/\(.*?\)/g, '').trim()}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_investor.svg" width={24} height={24} />
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

export default Edit