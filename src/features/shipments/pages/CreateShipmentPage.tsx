import ShipmentLayout from '../components/ShipmentLayout';
import ShipmentForm from '../components/ShipmentForm';
import ShipmentFormTitle from '../components/ShipmentFormTitle';
import logo from '../../../assets/logo.png';


const CreateShipmentPage = () => {
  return (
    <ShipmentLayout>
      <div className="w-full max-w-xl border border-white rounded-xl p-8 bg-transparent relative mb-24"> 
        <ShipmentFormTitle
          title="Registrar nuevo envío"
          subtitle="Completa los datos para generar el envío"
        />
        <ShipmentForm />
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-full">
          <div className="bg-white w-48 h-28 rounded-t-full flex justify-center items-end pb-3 shadow-md mx-auto">
            <img src={logo} alt="Logo Coordinadora" className="w-45 translate-x-[-10px]" />
          </div>
        </div>
      </div>
    </ShipmentLayout>
  );
};

export default CreateShipmentPage;