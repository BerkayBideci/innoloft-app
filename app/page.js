import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full h-24 flex items-center">
      <Link
        href="/product"
        className="bg-[#272E71] font-semibold text-white p-5 rounded-xl">
        Show Me The Offers
      </Link>
    </main>
  )
}
