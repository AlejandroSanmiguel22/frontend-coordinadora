interface AuthFormTitleProps {
    title: string;
    subtitle: string;
  }
  
  const AuthFormTitle = ({ title, subtitle }: AuthFormTitleProps) => (
    <>
      <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
      <p className="text-sm text-center text-white mb-6">{subtitle}</p>
    </>
  );
  
  export default AuthFormTitle;
  