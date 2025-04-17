import { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

const Input = ({ label, icon, ...props }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#005DB3]">
            {icon}
          </span>
        )}
        <input
          {...props}
          className="w-full px-4 py-2 pl-10 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#005DB3]"
        />
      </div>
    </div>
  );
};

export default Input;
