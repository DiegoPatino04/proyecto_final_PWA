const base_class = `
  border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full
  focus:outline-none focus:ring-2 focus:ring-violet-400
  focus:border-transparent transition
`

export default function InputField({ type = 'text', error, ...props }) {
  return (
    <input
      type={type}
      className={`${base_class} ${error ? 'border-red-400' : ''}`}
      {...props}
    />
  )
}