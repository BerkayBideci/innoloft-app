"use client"

import Logo from "./Logo"
import Button from "./Button"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration } from "@/lib/redux/slices/userSlice"
import { useEffect } from "react"

const Header = () => {
    const dispatch = useDispatch()
    const configuration = useSelector(state => state.user)

    const fetchConfiguration = async () => {
        await dispatch(getConfiguration())
    }

    useEffect(() => {
        fetchConfiguration()
    }, [])

    return (
        <header style={{ backgroundColor: configuration.configuration?.mainColor }}>
            <div className="container mx-auto py-3.5 px-10 flex justify-between items-center">
                <Logo image={configuration.configuration?.id === 1 ? "/Logo.svg" : configuration.configuration?.logo} />
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <div className="relative mr-[27.875rem]">
                            <input type="text" placeholder="Enter interests, keyword, company name, etc." className={`placeholder:text-[#374151] py-1.5 px-2.5 h-7 w-[31.25rem] rounded ${!configuration.configuration?.hasUserSection && "mr-32"}`} />
                            <Image src="./inno_search.svg" alt="Search" width={16} height={16} className={`absolute top-1.5 right-3.5 ${!configuration.configuration?.hasUserSection && "absolute top-1.5 right-36"}`} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-5">
                        <Button buttonStyle={`${!configuration.configuration?.hasUserSection && "hidden"}`}>
                            <Image src="./inno_messenger.svg" alt="Messenger" width={16} height={16} />
                        </Button>
                        <div className="flex items-center space-x-2">
                            <Button desc="EN" buttonStyle="text-white">
                                <Image src="./inno_accordion-down-light.svg" alt="Language" width={16} height={16} />
                            </Button>
                        </div>
                        <Button buttonStyle={`${!configuration.configuration?.hasUserSection && "hidden"}`}>
                            <Image src="./inno_notifications.svg" alt="Notifications" width={16} height={16} />
                        </Button>
                        <div className={`flex items-center space-x-2 ${!configuration.configuration?.hasUserSection && "hidden"}`}>
                            <Button>
                                <div className="relative">
                                    <Image src="./Border-Profile-Pic.svg" width={26} height={26} />
                                    <Image src="/profile-image.png" width={25} height={25} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
                                </div>
                                <Image src="./inno_accordion-down-light.svg" alt="Language" width={16} height={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header