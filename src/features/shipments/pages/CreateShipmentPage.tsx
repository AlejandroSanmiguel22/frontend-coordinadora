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
       
      </div>
    </ShipmentLayout>
  );
};

export default CreateShipmentPage;