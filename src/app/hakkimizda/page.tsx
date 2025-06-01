import Image from 'next/image'

export const metadata = {
  title: 'Hakkımızda - Fatos Perde',
  description: 'Fatos Perde olarak 20 yılı aşkın tecrübemizle kaliteli ve modern perde çözümleri sunuyoruz.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-xl">20 Yıllık Tecrübe, Kalite ve Güven</p>
          </div>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
            <p className="text-gray-600 mb-4">
              2003 yılında küçük bir mağaza ile başladığımız yolculuğumuzda, bugün Türkiye'nin önde gelen perde üreticilerinden biri haline geldik. Müşteri memnuniyetini her şeyin üstünde tutan anlayışımız ve kaliteli ürünlerimizle sektörde fark yaratmaya devam ediyoruz.
            </p>
            <p className="text-gray-600">
              Modern tasarımlarımız, geniş ürün yelpazemiz ve uzman ekibimizle yaşam alanlarınıza değer katıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Kalite</h3>
              <p className="text-gray-600 text-center">
                En kaliteli kumaşlar ve malzemelerle üretim yapıyor, uzun ömürlü ürünler sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Güven</h3>
              <p className="text-gray-600 text-center">
                20 yıllık tecrübemizle müşterilerimize güvenilir hizmet sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Yenilikçilik</h3>
              <p className="text-gray-600 text-center">
                Sektördeki yenilikleri takip ediyor, modern tasarımlar sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 