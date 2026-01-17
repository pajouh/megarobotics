import { Metadata } from 'next'
import { Building2 } from 'lucide-react'
import { getManufacturers } from '@/lib/sanity'
import ManufacturerCard from '@/components/ManufacturerCard'

export const metadata: Metadata = {
  title: 'Manufacturers',
  description: 'Browse robotics manufacturers from China and around the world. Leading companies in humanoid robots, industrial automation, and consumer robotics.',
}

export const revalidate = 60

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Manufacturers
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover leading robotics manufacturers from China and around the world.
            From consumer quadrupeds to industrial automation solutions.
          </p>
        </div>

        {/* Manufacturers Grid */}
        {manufacturers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {manufacturers.map((manufacturer) => (
              <ManufacturerCard key={manufacturer._id} manufacturer={manufacturer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No manufacturers yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Check back soon for our comprehensive manufacturer directory.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
