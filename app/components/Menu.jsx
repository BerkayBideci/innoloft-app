import Image from "next/image"
import Link from "next/link"

const Menu = () => {
    return (
        <div className="hidden 2xl:flex flex-col min-w-[17.5rem]">
            <div className="flex items-center gap-x-4">
                <Image
                    src="/profile-image.png"
                    width={70}
                    height={70}
                    alt="Profile image"
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <span className="font-bold text-[#374151] text-lg">Sven Pietsch</span>
                    <span className="text-sm text-[#374151]">Innoloft GmbH</span>
                </div>
            </div>
            <Link href="/" className="flex items-center my-3 mx-2 gap-x-3">
                <Image src="./inno_home.svg" width={16} height={16} alt="Home icon" />
                <span>Home</span>
            </Link>
            <Link href="/" className="flex items-center my-3 mx-2 gap-x-3">
                <Image src="./inno_group.svg" width={16} height={16} alt="Members icon" />
                <span>Members</span>
            </Link>
            <Link href="/" className="flex items-center my-3 mx-2 gap-x-3">
                <Image src="./inno_organizations.svg" width={16} height={16} alt="Organizations icon" />
                <span>Organizations</span>
                <svg width="16" height="16" className="ms-auto" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="inno_accordion-down-light" clipPath="url(#clip0_16302_1335)">
                        <path id="Vector" d="M7.99998 12.25C7.93431 12.2501 7.86927 12.2372 7.8086 12.2121C7.74793 12.1869 7.69284 12.1501 7.64648 12.1035L0.14648 4.60354C0.0987245 4.55742 0.0606334 4.50224 0.0344289 4.44124C0.00822435 4.38024 -0.00556876 4.31463 -0.00614567 4.24824C-0.00672258 4.18185 0.00592827 4.11601 0.0310687 4.05456C0.0562092 3.99312 0.0933357 3.93729 0.140282 3.89034C0.187228 3.8434 0.243054 3.80627 0.304503 3.78113C0.365951 3.75599 0.431791 3.74334 0.49818 3.74392C0.56457 3.74449 0.63018 3.75829 0.691182 3.78449C0.752184 3.81069 0.807356 3.84879 0.85348 3.89654L7.99998 11.043L15.1465 3.89654C15.1926 3.84879 15.2478 3.81069 15.3088 3.78449C15.3698 3.75829 15.4354 3.74449 15.5018 3.74392C15.5682 3.74334 15.634 3.75599 15.6955 3.78113C15.7569 3.80627 15.8127 3.8434 15.8597 3.89034C15.9066 3.93729 15.9438 3.99312 15.9689 4.05456C15.994 4.11601 16.0067 4.18185 16.0061 4.24824C16.0055 4.31463 15.9917 4.38024 15.9655 4.44124C15.9393 4.50224 15.9012 4.55742 15.8535 4.60354L8.35348 12.1035C8.30712 12.1501 8.25203 12.1869 8.19136 12.2121C8.13069 12.2372 8.06565 12.2501 7.99998 12.25Z" fill="#374151" />
                    </g>
                    <defs>
                        <clipPath id="clip0_16302_1335">
                            <rect width="16" height="16" fill="#374151" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
        </div>
    )
}

export default Menu