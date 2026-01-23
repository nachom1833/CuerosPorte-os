export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Product {
  id: string
  created_at: string
  name: string
  slug: string
  description: string | null
  material: string | null
  dimensions: string | null
  category: string
  price: number | null
}

export interface ProductVariant {
  id: string
  product_id: string
  color_name: string
  color_hex: string
  images: string[]
  is_active: boolean
  // Optional: Join field for frontend convenience
  product?: Product
}
