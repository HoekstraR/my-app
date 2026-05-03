
export type Database = {
  public: {
    Tables: {
      counter_logs: {
        Row: { action: string; count_value: number; created_at: string; id: string }
        Insert: { action: string; count_value: number; created_at?: string; id?: string }
        Update: { action?: string; count_value?: number; created_at?: string; id?: string }
      }
    }
  }
}
