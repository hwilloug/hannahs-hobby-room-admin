export interface Post {
  slug: string
  title: string
  subtitle: string
  img: string
  img_alt: string
  category: string
  subcategory: string
  created_at: Date
  updated_at: Date
  likes: number
}

export interface Author {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'writer'
}

export interface Comment {
  id: number
  timestamp: Date
  body: string
  article_slug: string
  username: string
  parent_id: number | null
} 