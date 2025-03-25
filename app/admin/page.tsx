'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/types/blog'

interface Stats {
  total_posts: number
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<Stats>({
    total_posts: 0
  })
  const [newsletterStats, setNewsletterStats] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        
        const data = await response.json()
        setPosts(data.posts)
        setStats(data.stats)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
    fetchNewsletterStats()
  }, [])

  async function fetchNewsletterStats() {
    try {
      const response = await fetch('/api/newsletter')
      if (!response.ok) throw new Error('Failed to fetch newsletter stats')

      const data = await response.json()
      setNewsletterStats(data.stats.total_subscribers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Posts</h2>
          <p className="text-3xl">{stats.total_posts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Newsletter Subscribers</h2>
          <p className="text-3xl">{newsletterStats}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4">Title</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Subcategory</th>
                <th className="pb-4">Created</th>
                <th className="pb-4">Likes</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="py-2">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.subtitle}</div>
                    </div>
                  </td>
                  <td>{post.category}</td>
                  <td>{post.subcategory}</td>
                  <td>{new Date(post.created_at).toLocaleDateString()}</td>
                  <td>{post.likes}</td>
                  <td>
                    <Link 
                      href={`/admin/posts/${post.slug}`} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 