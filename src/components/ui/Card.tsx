// Create a new component: components/ui/Card.tsx
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`
          bg-white dark:bg-gray-800 
          rounded-xl overflow-hidden 
          shadow-lg hover:shadow-xl 
          transition-all duration-300 
          border border-gray-100 dark:border-gray-700
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  };