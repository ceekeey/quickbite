import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/30',
    cta: 'bg-accent text-white rounded-2xl shadow-lg shadow-accent/20 hover:shadow-accent/30',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 rounded-2xl',
    ghost: 'text-text-muted hover:text-primary hover:bg-bg-base rounded-2xl',
    danger: 'bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-3',
  };

  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
