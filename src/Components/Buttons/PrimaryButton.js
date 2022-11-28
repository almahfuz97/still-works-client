import React from 'react'

export default function PrimaryButton({ children, disabled }) {
    return (
        <div>
            {
                disabled ?
                    <button type="button" className="disabled sm:py-2.5 py-1.5 px-1.5 sm:px-5 mr-2 mb-2 text-sm font-semibold text-white focus:outline-none bg-slate-400 rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{children}</button>
                    :
                    <button type="button" className="sm:py-2.5 py-1.5 px-1.5 sm:px-5 mr-2 mb-2 text-sm font-semibold text-white focus:outline-none bg-primary-color rounded-lg border border-gray-200 hover:text-slate-300 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{children}</button>
            }
        </div>
    )
}
