export function Toggle({
  value,
  onChange,
  label,
  desc,
  disabled,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
  desc: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      className={`flex items-start gap-3 w-full text-left transition-opacity ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      }`}
    >
      <div
        className={`mt-0.5 w-9 h-5 rounded-full shrink-0 transition-colors relative ${
          value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
      </div>
    </button>
  )
}

export function NumInput({
  value,
  onChange,
  label,
  desc,
  min,
  max,
  step,
}: {
  value: number
  onChange: (v: number) => void
  label: string
  desc: string
  min: number
  max: number
  step: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">
        {label}
      </label>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{desc}</p>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-32 px-2.5 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
