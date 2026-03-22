export default function HeroLoading() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex animate-pulse flex-col gap-6">
          <div className="bg-background-subtle h-64 rounded-lg" />
          <div className="bg-background-subtle h-8 w-48 rounded" />
          <div className="bg-background-subtle h-4 w-full rounded" />
          <div className="bg-background-subtle h-4 w-3/4 rounded" />
        </div>
      </section>
    </main>
  )
}
