import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <Image
          src="/products/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Modern ve Şık Perde Çözümleri
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            Evinize ve ofisinize özel tasarım perdeler ile yaşam alanlarınızı güzelleştirin
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Hemen İncele
          </Link>
        </div>
      </div>
    </div>
  )
} 