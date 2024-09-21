'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error('Error:', error.message)
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button onClick={() => reset()} className="bg-blue-500 text-white px-4 py-2 rounded">
        Try again
      </button>
    </div>
  )
}