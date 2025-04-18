import { InputHTMLAttributes, ReactElement } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactElement;
  rightIcon?: ReactElement;
  onRightIconClick?: () => void;
}

const Input = ({ label, icon, rightIcon, onRightIconClick, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#005DB3]">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#005DB3] ${
            icon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''}`}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#005DB3]"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;