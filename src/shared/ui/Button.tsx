interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="w-full border border-white text-white py-2 rounded-lg transition-colors hover:bg-white hover:text-[#0057C8]"
    >
      {children}
    </button>
  );
};

export default Button;
