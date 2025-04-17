interface Props {
    title: string;
    subtitle: string;
  }
  
  const ShipmentFormTitle = ({ title, subtitle }: Props) => (
    <>
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      <p className="text-sm text-center text-white mb-6">{subtitle}</p>
    </>
  );
  
  export default ShipmentFormTitle;
  