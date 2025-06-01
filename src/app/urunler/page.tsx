import ProductGrid from '@/components/ProductGrid'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Tüm Ürünlerimiz
          </h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            Modern tasarımlarımız ve kaliteli ürünlerimizle yaşam alanlarınıza değer katın
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid />
      </div>
    </main>
  )
} 