import React from "react";

export default function Button({ type, children }: { type?: string; children: React.ReactNode }) {
    return (
        <button
            type="button"
            className={`border text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none  focus:outline-none focus:shadow-outline ${type === 'primary' ? 'border-indigo-500 bg-indigo-500 hover:bg-indigo-600'
                    : type === 'success' ? 'border-green-500 bg-green-500 hover:bg-green-600'
                        : type === 'error' ? 'border-red-500 bg-red-500 hover:bg-red-600'
                            : type === 'warning' ? 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600'
                                : ' border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
        >
            { children }
        </button>

    )
}