export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'tenant' | 'landlord' | 'admin'
export type PropertyType = 'bedsitter' | 'apartment' | 'house' | 'commercial' | 'other'
export type PropertyStatus = 'pending' | 'approved' | 'rejected'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: UserRole
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          is_banned: boolean
          is_scammer: boolean
          terms_accepted: boolean
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id: string
          email: string
          role: UserRole
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_banned?: boolean
          is_scammer?: boolean
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: UserRole
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          is_banned?: boolean
          is_scammer?: boolean
          terms_accepted?: boolean
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      properties: {
        Row: {
          id: string
          landlord_id: string
          title: string
          description: string
          price: number
          property_type: PropertyType
          bedrooms: number
          country: string
          county: string
          sub_county: string
          estate: string
          landlord_phone: string
          landlord_email: string
          caretaker_name: string | null
          caretaker_phone: string | null
          caretaker_email: string | null
          show_caretaker_contact: boolean
          status: PropertyStatus
          images: string[]
          videos: string[]
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          landlord_id: string
          title: string
          description: string
          price: number
          property_type: PropertyType
          bedrooms: number
          country: string
          county: string
          sub_county: string
          estate: string
          landlord_phone: string
          landlord_email: string
          caretaker_name?: string | null
          caretaker_phone?: string | null
          caretaker_email?: string | null
          show_caretaker_contact?: boolean
          status?: PropertyStatus
          images?: string[]
          videos?: string[]
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          landlord_id?: string
          title?: string
          description?: string
          price?: number
          property_type?: PropertyType
          bedrooms?: number
          country?: string
          county?: string
          sub_county?: string
          estate?: string
          landlord_phone?: string
          landlord_email?: string
          caretaker_name?: string | null
          caretaker_phone?: string | null
          caretaker_email?: string | null
          show_caretaker_contact?: boolean
          status?: PropertyStatus
          images?: string[]
          videos?: string[]
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
      }
      property_analytics: {
        Row: {
          id: string
          property_id: string
          user_id: string | null
          action: 'view' | 'save' | 'contact'
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id?: string | null
          action: 'view' | 'save' | 'contact'
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string | null
          action?: 'view' | 'save' | 'contact'
          created_at?: string
        }
      }
      search_analytics: {
        Row: {
          id: string
          user_id: string | null
          search_query: string
          location: string | null
          property_type: PropertyType | null
          min_price: number | null
          max_price: number | null
          bedrooms: number | null
          results_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_query: string
          location?: string | null
          property_type?: PropertyType | null
          min_price?: number | null
          max_price?: number | null
          bedrooms?: number | null
          results_count: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          search_query?: string
          location?: string | null
          property_type?: PropertyType | null
          min_price?: number | null
          max_price?: number | null
          bedrooms?: number | null
          results_count?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
