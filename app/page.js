import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full h-12 flex items-center">
      <Link
        href="/product"
        className="bg-[#272E71] font-semibold text-white py-2.5 px-4 rounded-md">
        Show Me The Offers
      </Link>
    </main>
  )
}
