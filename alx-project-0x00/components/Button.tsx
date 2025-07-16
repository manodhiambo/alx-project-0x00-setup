import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ 
  title, 
  size = 'medium', 
  shape = 'rounded-md', 
  onClick, 
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      case 'medium':
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const getShapeClasses = () => {
    switch (shape) {
      case 'rounded-sm':
        return 'rounded-sm';
      case 'rounded-full':
        return 'rounded-full';
      case 'rounded-md':
      default:
        return 'rounded-md';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 font-medium ${getSizeClasses()} ${getShapeClasses()} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
