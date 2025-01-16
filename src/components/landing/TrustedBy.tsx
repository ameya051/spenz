import Image from 'next/image'

export default function TrustedBy() {
  return (
    <section className="container mx-auto px-4 py-20 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-12">Trusted by</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-75">
        {/* Add your Image components here */}
      </div>
    </section>
  )
}
