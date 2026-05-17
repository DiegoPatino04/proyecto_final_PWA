export default function SelectField({ label, error, options, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        className={`
          border rounded-lg px-4 py-2.5 text-sm w-full bg-white
          focus:outline-none focus:ring-2 focus:ring-violet-400
          focus:border-transparent transition
          ${error ? 'border-red-400' : 'border-gray-300'}
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}