
export default function Input({ label = 'label', type = 'text', id, placeholder = 'placeholder', success = false, error = false }: { label: string; type?: string; id: string; placeholder?: string; success?: boolean; error?: boolean }) {
    return <div>
        <label htmlFor={id} className="text-sm text-navy-700 dark:text-white font-bold">{label}</label>
        <input type={type} id={id} placeholder={placeholder}
            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${success ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                    : error ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                        : 'border-gray-200'
                }`} />
    </div>
}