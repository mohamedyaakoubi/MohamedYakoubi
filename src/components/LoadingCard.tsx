export function LoadingCard() {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-700" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    )
  }