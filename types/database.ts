
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      counter_logs: {
        Row: {
          action: string
          count_value: number
          created_at: string
          id: string
        }
        Insert: {
          action: string
          count_value: number
          created_at?: string
          id?: string
        }
        Update: {
          action?: string
          count_value?: number
          created_at?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
