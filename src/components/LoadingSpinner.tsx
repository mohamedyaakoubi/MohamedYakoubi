// Create components/ui/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);