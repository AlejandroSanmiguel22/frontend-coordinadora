interface Props {
  children: React.ReactNode;
}

const ShipmentLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0057C8] p-4">
      <div className="w-full max-w-xl text-white">{children}</div>
    </div>
  );
};

export default ShipmentLayout;