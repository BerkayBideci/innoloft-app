import Image from "next/image"
import Link from "next/link"

const Logo = ({ image }) => {
    return (
        <Link href="/">
            <Image src={image} alt="Logo" className="object-fill max-h-7 max-w-36" width={144} height={28} />
        </Link>
    )
}

export default Logo