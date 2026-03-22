export default function Loading() {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex animate-pulse flex-col gap-6">
          <div className="bg-background-subtle h-10 w-64 rounded" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background-subtle h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
