// Create a new component: components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
  }
  
  export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className,
    ...props
  }) => {
    const baseStyles = "rounded-full font-medium transition-all duration-300 flex items-center justify-center";
    
    const variants = {
      primary: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90",
      secondary: "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700",
      outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
    };
  
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    };
  
    return (
      <button 
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  };