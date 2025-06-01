import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '../../components/ProductGallery'
import productsData from '@/data/products.json'

interface ProductPricing {
  type: 'metrekare' | 'metre' | 'adet'
  unitPrice: number
  minOrder: number
  unit: 'm²' | 'm' | 'adet'
}

interface Product {
  id: number
  title: string
  description: string
  image: string
  image2?: string
  heroImage: string
  slug: string
  category: string
  price: number
  pricing: ProductPricing
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  
  if (!product) {
    return {
      title: 'Ürün Bulunamadı - Fatoş Perde',
      description: 'Aradığınız ürün bulunamadı.'
    }
  }

  return {
    title: `${product.title} - Fatoş Perde`,
    description: product.description
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  
  if (!product) {
    notFound()
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const images = [product.image, ...(product.image2 ? [product.image2] : [])]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src={product.heroImage}
          alt={product.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.title}</h1>
              <p className="text-xl text-gray-200">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
            {/* Ürün Görseli */}
            <ProductGallery images={images} title={product.title} />

            {/* Ürün Bilgileri */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-black">₺{product.price.toLocaleString()}</span>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.pricing.type === 'metrekare' ? 'Metrekare başına' : 
                       product.pricing.type === 'metre' ? 'Metre başına' : 'Adet'} fiyatı
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {product.category === 'popular' ? 'Popüler' : 
                     product.category === 'campaign' ? 'Kampanyalı' : 'Yeni Gelenler'}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Fiyatlandırma Detayları</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-black">Birim Fiyat:</span>
                      <span className="font-medium text-black">₺{product.pricing.unitPrice.toLocaleString()} / {product.pricing.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Minimum Sipariş:</span>
                      <span className="font-medium text-black">{product.pricing.minOrder} {product.pricing.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Fiyatlandırma Türü:</span>
                      <span className="font-medium text-black">
                        {product.pricing.type === 'metrekare' ? 'Metrekare Bazlı' : 
                         product.pricing.type === 'metre' ? 'Metre Bazlı' : 'Adet Bazlı'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-800 text-lg mb-8">{product.details}</p>

                {/* Özellikler */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Özellikler</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp Butonu */}
              <div className="space-y-4">
                <a
                  href={`https://wa.me/905555555555?text=Merhaba, ${product.title} ürünü hakkında bilgi almak istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp ile İletişime Geç
                </a>
                <Link
                  href="/urunler"
                  className="inline-flex items-center justify-center w-full px-6 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Ürünlere Dön
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benzer Ürünler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Benzer Ürünler</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bu ürünle birlikte ilginizi çekebilecek diğer perde modellerimizi keşfedin.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {similarProducts.map((product) => (
            <Link
              key={product.id}
              href={`/urun/${product.slug}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-900 rounded-full">
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
      </div>
    </main>
  )
} 