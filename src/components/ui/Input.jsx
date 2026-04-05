import { clsx } from 'clsx'

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500',
        className
      )}
      {...props}
    />
  );
};
