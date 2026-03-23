import { SearchBar } from './search-bar'
import { FilterPanel } from './filter-panel'

export function Sidebar() {
  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="bg-background-card border-border sticky top-4 rounded-lg border p-6">
        <h2 className="text-foreground mb-4 text-lg font-semibold">Search & Filters</h2>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="text-foreground-muted mb-2 block text-xs font-medium uppercase">
              Search
            </label>
            <SearchBar />
          </div>

          {/* Filters */}
          <div>
            <label className="text-foreground-muted mb-3 block text-xs font-medium uppercase">
              Filters
            </label>
            <FilterPanel />
          </div>
        </div>
      </div>
    </aside>
  )
}
