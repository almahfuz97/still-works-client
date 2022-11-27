import React from 'react'

export default function PrimaryButton({ children }) {
    return (
        <div>
            <button type="button" class="sm:py-2.5 py-1.5 px-1.5 sm:px-5 mr-2 mb-2 text-sm font-semibold text-white focus:outline-none bg-primary-color rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{children}</button>
        </div>
    )
}
