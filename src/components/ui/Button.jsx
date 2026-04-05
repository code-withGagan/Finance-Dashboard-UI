import { clsx } from 'clsx'

export const Button = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-md',
        {
          'px-6 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300 shadow-lg hover:shadow-xl': variant === 'primary' && size === 'md',
          'px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-300': variant === 'primary' && size === 'sm',
          'px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white focus:ring-blue-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5': variant === 'primary' && size === 'lg',
          'px-6 py-3 text-base bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 focus:ring-gray-500 border': variant === 'secondary' && size === 'md',
          'px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5': variant === 'destructive' && size === 'md',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
