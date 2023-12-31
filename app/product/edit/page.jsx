"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getTrl, updateProductDetails, updateProductVideo, updateProductOfferDetails } from "@/lib/redux/slices/productSlice"
import { Editor } from "@tinymce/tinymce-react";
import Button from "@/app/components/Button";

const Edit = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products)
    const trl = useSelector(state => state.products.trl)
    const editorRef = useRef(null);

    const onProductDetailsSubmit = async (data) => {
        const { productName, productDesc } = data
        console.log(productName, productDesc)
        await dispatch(updateProductDetails(productName, productDesc))
    }

    const onProductVideoSubmit = async (data) => {
        const { productVideo } = data
        console.log(productVideo)
        await dispatch(updateProductVideo(productVideo))
    }

    const onProductOfferDetailsSubmit = async (data) => {
        const { productTech, productBusiness, productTrl, productCosts } = data
        console.log(productTech, productBusiness, productTrl, productCosts)
        await dispatch(updateProductOfferDetails(productTech, productBusiness, productTrl, productCosts))
    }

    const fetchProducts = async () => {
        await dispatch(getProducts())
    }

    const fetchTrl = async () => {
        await dispatch(getTrl())
    }

    useEffect(() => {
        fetchProducts()
        fetchTrl()
    }, [])

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        setValue: setValue1,
        control: control1,
    } = useForm();

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        setValue: setValue2,
    } = useForm();

    const {
        register: register3,
        handleSubmit: handleSubmit3,
        setValue: setValue3,
    } = useForm();

    const sanitizeText = (text) => {
        const sanitizedText = text?.replace(/(<([^>]+)>)|console\.log\([^\)]*\);/ig, '')
        return sanitizedText
    }

    return (
        <div className="flex flex-col gap-y-5 w-full">
            <div className="flex flex-col xl:flex-row bg-white rounded-md border border-[#E5E7EB]">
                <div className="xl:max-w-[46.625rem]">
                    <div className="max-h-[18.75rem] overflow-hidden relative">
                        <Image
                            src={product.products?.picture}
                            alt="Product image"
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
                        <div className="absolute top-0 right-0 h-[2.5rem] border-b border-l border-[#E5E7EB] rounded-bl-md p-3 bg-white">
                            <Button>
                                <Image
                                    src="/inno_delete.svg"
                                    alt="Delete icon"
                                    width={16} height={16}
                                />
                            </Button>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit1(onProductDetailsSubmit)}
                        className="p-5 flex flex-col gap-2.5">
                        <input
                            {...register1("productName", {
                                required: true,
                                pattern:
                                    /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                            })}
                            defaultValue={product.products?.name}
                            className="leading-6 font-semibold text-[#374151] px-2.5 py-1.5 w-full border border-[#E5E7EB] rounded-md"
                        />
                        <Controller
                            name="productDesc"
                            control={control1}
                            rules={{
                                required: 'Content is required',
                                validate: value => value.length <= 1000 || 'Content exceeds 1000 characters limit'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                    value={value}
                                    onEditorChange={onChange}
                                    onBlur={onBlur}
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    initialValue={sanitizeText(product.products?.description)}
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "code",
                                            "help",
                                            "wordcount",
                                        ],
                                        toolbar:
                                            "undo redo | blocks | " +
                                            "bold italic forecolor | alignleft aligncenter " +
                                            "alignright alignjustify | bullist numlist outdent indent | " +
                                            "removeformat | help",
                                        content_style:
                                            "body { font-family:Open Sans,Arial,sans-serif; line-height:1.5rem; font-size:0.875rem; color: #6B7280; }",
                                    }}
                                />)}
                        />
                        <div className="flex justify-end w-full gap-2.5">
                            <Button
                                buttonOnClick={() => {
                                    setValue1("productDesc", sanitizeText(product.products?.description))
                                    setValue1("productName", product.products?.name)
                                }}
                                buttonType="button" desc="Cancel" buttonStyle="text-sm text-[#6B7280]">
                            </Button>
                            <Button
                                buttonType="submit"
                                desc="Save"
                                buttonStyle="text-sm text-white bg-[#272E71] py-1.5 px-2.5 rounded-md">
                                <Image
                                    src="/Chevron_right.svg"
                                    alt="Save icon"
                                    width={16}
                                    height={16} />
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="p-5 flex flex-col min-w-max gap-y-2.5 border-l border-[#E5E7EB]">
                    <span className="leading-6 font-semibold text-[#374151]">Offered By</span>
                    <Image
                        src={product.products?.company?.logo}
                        alt="Product company logo"
                        width={200}
                        height={36}
                    />
                    <div className="flex items-center gap-x-2.5">
                        <Image
                            src={product.products?.user?.profilePicture}
                            width={60}
                            height={60}
                            alt="Profile image"
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
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Video</h3>
                <div>
                    <form
                        onSubmit={handleSubmit2(onProductVideoSubmit)}
                        className="flex flex-col gap-2.5">
                        <input
                            {...register2("productVideo", {
                                required: true,
                                pattern:
                                    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/|vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^\/]+\/videos\/|album\/\d+\/video\/|video\/|))([^\s&]+)/,
                            })}
                            defaultValue={product.products?.video}
                            placeholder="Add a youtube or vimeo link"
                            className="leading-6 font-semibold text-[#374151] px-2.5 py-1.5 w-full border border-[#E5E7EB] rounded-md"
                        />
                        <div className="flex justify-end w-full gap-2.5">
                            <Button
                                buttonOnClick={() => {
                                    setValue2("productVideo", product.products?.video)
                                }}
                                buttonType="button"
                                desc="Cancel"
                                buttonStyle="text-sm text-[#6B7280]">
                            </Button>
                            <Button buttonType="submit" desc="Save" buttonStyle="text-sm text-white bg-[#272E71] py-1.5 px-2.5 rounded-md">
                                <Image src="/Chevron_right.svg" alt="Right arrow icon" width={16} height={16} />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-col bg-white rounded-md border border-[#E5E7EB] w-full p-5">
                <h3 className="pb-5 font-semibold">Offer details</h3>
                <form
                    onSubmit={handleSubmit3(onProductOfferDetailsSubmit)}
                    className="grid xl:grid-cols-2 gap-x-10 gap-y-5 text-[#6B7280]">
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_dev-4.svg" width={24} height={24} alt="Technology icon" />
                            <div className="flex flex-col gap-y-2.5 w-full">
                                <span>Technology</span>
                                <input
                                    {...register3("productTech", {
                                        required: true,
                                        pattern:
                                            /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                                    })}
                                    defaultValue={product.products?.categories?.map((category) => (
                                        category.name
                                    ))}
                                    className="text-sm py-1.5 px-3.5 w-full border border-[#E5E7EB] rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_strategy.svg" width={24} height={24} alt="Business model icon" />
                            <div className="flex flex-col gap-y-2.5 w-full">
                                <span>Business Model</span>
                                <input
                                    {...register3("productBusiness", {
                                        required: true,
                                        pattern:
                                            /^(?=.*[a-zA-ZçÇşŞğĞüÜıİöÖ])[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*(?:\s[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+(?:-[a-zA-ZçÇşŞğĞüÜıİöÖ\d\W]+)*)*$/,
                                    })}
                                    defaultValue={product.products?.businessModels?.map((model) => (
                                        model.name
                                    ))}
                                    className="text-sm py-1.5 px-3.5 w-full border border-[#E5E7EB] rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_clock.svg" width={24} height={24} alt="TRL icon" />
                            <div className="flex flex-col gap-2.5 w-full">
                                <span>TRL</span>
                                <select {...register3("productTrl", {
                                    required: true,
                                })}
                                    className="text-sm py-1.5 px-3.5 w-full border border-[#E5E7EB] rounded-md"
                                    defaultValue={product.products?.trl?.name?.replace(/\(.*?\)/g, '').trim()}
                                >
                                    {trl?.map((trl) => (
                                        <option key={trl.id} selected={product.products?.trl?.name?.replace(/\(.*?\)/g, '').trim() === trl.name.replace(/\(.*?\)/g, '').trim()} value={trl.name.replace(/\(.*?\)/g, '').trim()}>{trl.name.replace(/\(.*?\)/g, '').trim()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-x-1.5">
                            <Image src="/inno_investor.svg" width={24} height={24} alt="Costs icon" />
                            <div className="flex flex-col gap-2.5 w-full">
                                <span>Costs</span>
                                <input
                                    {...register3("productCosts", {
                                        required: true,
                                        pattern:
                                            /^<\s*\d{1,3}(?:\.\d{3})*(\,\d+)?\s*€$/,
                                    })}
                                    defaultValue={product.products?.investmentEffort?.replace("€", " €")}
                                    className="text-sm py-1.5 px-3.5 w-full border border-[#E5E7EB] rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end w-full gap-2.5 mt-2.5">
                            <Button
                                buttonOnClick={() => {
                                    setValue3("productTech", product.products?.categories?.map((category) => (
                                        category.name
                                    )))
                                    setValue3("productBusiness", product.products?.businessModels?.map((model) => (
                                        model.name
                                    )))
                                    setValue3("productTrl", product.products?.trl?.name?.replace(/\(.*?\)/g, '').trim())
                                    setValue3("productCosts", product.products?.investmentEffort?.replace("€", " €"))
                                }}
                                buttonType="button"
                                desc="Cancel"
                                buttonStyle="text-sm text-[#6B7280]">
                            </Button>
                            <Button
                                buttonType="submit"
                                desc="Save"
                                buttonStyle="text-sm text-white bg-[#272E71] py-1.5 px-2.5 rounded-md">
                                <Image src="/Chevron_right.svg" alt="Right arrow icon" width={16} height={16} />
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit