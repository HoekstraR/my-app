CREATE TABLE public.counter_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  action      text        NOT NULL CHECK (action IN ('increment', 'decrement', 'reset')),
  count_value integer     NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.counter_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon can insert"
  ON public.counter_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon can select"
  ON public.counter_logs
  FOR SELECT
  TO anon
  USING (true);
