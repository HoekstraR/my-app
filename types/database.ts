
export type Database = {
  public: {
    Tables: {
      counter_logs: {
        Row: {
          id: string
          action: 'increment' | 'decrement' | 'reset'
          count_value: number
          created_at: string
        }
        Insert: {
          id?: string
          action: 'increment' | 'decrement' | 'reset'
          count_value: number
          created_at?: string
        }
        Update: {
          id?: string
          action?: 'increment' | 'decrement' | 'reset'
          count_value?: number
          created_at?: string
        }
      }
    }
  }
}
