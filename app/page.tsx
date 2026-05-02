
import Counter from '@/components/Counter'

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center p-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Teller</h1>
        <p className="text-slate-500 text-sm">Klikken worden opgeslagen in Supabase</p>
      </div>
      <Counter />
    </main>
  )
}
