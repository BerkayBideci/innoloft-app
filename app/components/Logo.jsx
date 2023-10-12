import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link href="/">
            <Image src="/Logo.svg" alt="Innoloft Logo" width={140} height={27} />
        </Link>
    )
}

export default Logo