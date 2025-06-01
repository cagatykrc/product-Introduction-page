import Image from 'next/image'
import Link from 'next/link'
import productsData from '@/data/products.json'

interface Product {
  id: number
  title: string
  description: string
  image: string
  image2?: string
  slug: string
  category: string
  price: number
  pricing: {
    type: 'metrekare' | 'metre' | 'adet'
    unitPrice: number
    minOrder: number
    unit: 'm²' | 'm' | 'adet'
  }
  details: string
  features: string[]
}

// JSON verilerini TypeScript tiplerine dönüştür
const products: Product[] = productsData.products.map(product => ({
  ...product,
  pricing: {
    ...product.pricing,
    type: product.pricing.type as 'metrekare' | 'metre' | 'adet',
    unit: product.pricing.unit as 'm²' | 'm' | 'adet'
  }
}))

export default function FeaturedProducts() {
  // Öne çıkan ürünleri filtrele (örneğin: popüler ve yeni ürünler)
  const featuredProducts = products
    .filter(product => product.category === 'popular' || product.category === 'new')
    .slice(0, 3)

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            En çok tercih edilen ve yeni gelen perde modellerimizi keşfedin.
          </p>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/urun/${product.slug}`}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.image2 && (
                  <Image
                    src={product.image2}
                    alt={product.title}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900">
                    {product.category === 'popular' ? 'Popüler' : 
                     product.category === 'campaign' ? 'Kampanyalı' : 'Yeni Gelenler'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">₺{product.price.toLocaleString()}</p>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Bölümü */}
        <div className="text-center">
          <div className="inline-block bg-black text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Link href="/urunler" className="flex items-center gap-2 text-lg font-semibold">
              Tüm Ürünleri Keşfet
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-gray-600">
            {products.length}+ ürün arasından size en uygun perdeyi seçin
          </p>
        </div>
      </div>
    </section>
  )
} 