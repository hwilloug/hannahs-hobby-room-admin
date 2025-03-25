'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post, Comment } from '@/types/blog'

interface ArticleWithComments extends Post {
  comments: Comment[]
  commentCount: number
}

export default function CommentsPage() {
  const [articles, setArticles] = useState<ArticleWithComments[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticlesWithComments() {
      try {
        // First get all articles
        const articlesRes = await fetch('/api/posts')
        if (!articlesRes.ok) throw new Error('Failed to fetch articles')
        const articlesData = await articlesRes.json()
        
        // Then get comments for each article
        const articlesWithComments = await Promise.all(
          articlesData.posts.map(async (article: Post) => {
            const commentsRes = await fetch(`/api/comments/${article.slug}`)
            const commentsData = await commentsRes.json()
            return {
              ...article,
              comments: commentsData.comments,
              commentCount: commentsData.comments.length
            }
          })
        )

        setArticles(articlesWithComments)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchArticlesWithComments()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Comments Dashboard</h1>

      {articles.map((article) => (
        <div key={article.slug} className="mb-8 bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-500">{article.commentCount} comments</p>
          </div>
          <div className="p-4">
            {article.comments.length > 0 ? (
              <div className="space-y-4">
                {article.comments.map((comment) => (
                  <div key={comment.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{comment.username}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.body}</p>
                    {comment.parent_id && (
                      <div className="mt-1 text-sm text-gray-500">
                        Reply to comment #{comment.parent_id}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 