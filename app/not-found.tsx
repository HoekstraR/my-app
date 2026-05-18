import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>

          <p className="text-gray-600 mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Go Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
