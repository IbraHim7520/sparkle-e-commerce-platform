// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full space-y-4">
      {/* Loading Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      
      {/* Loading Text */}
      <p className="text-lg font-medium text-gray-600 animate-pulse">
        Loading...
      </p>
    </div>
  );
}