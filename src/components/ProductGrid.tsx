'use client'

import Image from 'next/image'
import Link from 'next/link'
import ProductFilters from './ProductFilters'
import { useState } from 'react'
import productsData from '@/data/products.json'

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

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(true)

  const filteredProducts = products.filter(product => {
    // Kategori filtresi
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false
    }

    // Diğer filtreler
    for (const [filterType, selectedValues] of Object.entries(selectedFilters)) {
      if (selectedValues.length > 0 && !selectedValues.includes(product[filterType as keyof typeof product] as string)) {
        return false
      }
    }

    return true
  })

  // Sıralama
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'popular':
        return a.category === 'popular' ? -1 : 1
      default: // newest
        return a.category === 'new' ? -1 : 1
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Üst Bar ve Filtreler */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <p className="text-sm text-gray-600 whitespace-nowrap">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün bulundu
            </p>
            <div className="h-4 w-px bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-hide">
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'popular', label: 'Popüler' },
                { id: 'new', label: 'Yeni Gelenler' },
                { id: 'campaign', label: 'Kampanyalı' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          <select 
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">En Yeniler</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="popular">En Popüler</option>
          </select>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex flex-col gap-6">
        {/* Filtreler */}
        <div className={`w-full ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/urun/${product.slug}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">₺{product.price.toLocaleString()}</p>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 