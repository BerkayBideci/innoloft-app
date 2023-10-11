import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full h-screen">
      <div className="border border-red-600 h-full">
        <Link href="/product">Offers</Link>
      </div>
    </main>
  )
}
