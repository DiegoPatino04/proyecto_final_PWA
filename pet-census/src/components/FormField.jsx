export default function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}