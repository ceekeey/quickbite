import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white rounded-xl shadow-md active:scale-95',
    cta: 'bg-accent hover:opacity-90 text-white rounded-xl shadow-md active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 rounded-xl',
    ghost: 'text-text-muted hover:text-primary hover:bg-primary/5 rounded-lg',
    danger: 'bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
    icon: 'p-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
