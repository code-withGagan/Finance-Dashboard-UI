import { clsx } from 'clsx'

export const Card = ({ className, children, ...props }) => {
  return (
    <div className={clsx('dashboard-card rounded-xl p-6 shadow-lg', className)} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children }) => (
  <div className={clsx('flex flex-col space-y-1.5 p-0 mb-4', className)}>
    {children}
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h3 className={clsx('text-2xl font-bold tracking-tight', className)}>
    {children}
  </h3>
);

export const CardContent = ({ className, children }) => (
  <div className={clsx('p-0 pt-0', className)}>
    {children}
  </div>
);

export const CardDescription = ({ className, children }) => (
  <p className={clsx('text-sm text-muted-foreground', className)}>
    {children}
  </p>
);

