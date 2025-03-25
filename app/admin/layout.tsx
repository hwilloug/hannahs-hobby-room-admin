import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/admin" className="flex items-center px-2 py-2 text-gray-900">
                Blog Admin
              </Link>
              <Link href="/admin/posts" className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900">
                Posts
              </Link>
              <Link href="/admin/comments" className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900">
                Comments
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
} 