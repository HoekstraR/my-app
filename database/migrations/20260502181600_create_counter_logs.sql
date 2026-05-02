-- counter_logs: publieke teller waarbij elke klik wordt opgeslagen
-- RLS ingeschakeld met anon insert + select policies

CREATE TABLE IF NOT EXISTS counter_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  action      text        NOT NULL CHECK (action = ANY (ARRAY['increment'::text, 'decrement'::text, 'reset'::text])),
  count_value integer     NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE counter_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert"
  ON counter_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon can select"
  ON counter_logs
  FOR SELECT
  TO anon
  USING (true);
