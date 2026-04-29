
export type Database = {
  public: {
    Tables: {
      counter_logs: {
        Row: {
          id: string
          action: string
          count_value: number
          created_at: string
        }
        Insert: {
          action: string
          count_value: number
          id?: string
          created_at?: string
        }
      }
    }
  }
}
