interface Props {
    shipments: any[];
}

const ReportTable = ({ shipments }: Props) => {
    return (
        <div className="overflow-x-auto rounded border border-white">
            <table className="min-w-full text-white text-sm">
                <thead className="bg-[#0057C8]">
                    <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Peso</th>
                        <th className="px-4 py-2 text-left">Producto</th>
                        <th className="px-4 py-2 text-left">Dirección</th>
                        <th className="px-4 py-2 text-left">Estado</th>
                        <th className="px-4 py-2 text-left">Transportista</th>
                        <th className="px-4 py-2 text-left">Fecha</th>
                    </tr>
                </thead>
                <tbody className="bg-[#0057C8]">
                    {shipments.map((s) => (
                        <tr key={s.id} className="border-t border-white">
                            <td className="px-4 py-2">{s.id}</td>
                            <td className="px-4 py-2">{s.peso} kg</td>
                            <td className="px-4 py-2">{s.tipoProducto}</td>
                            <td className="px-4 py-2">{s.direccion}</td>
                            <td className="px-4 py-2">{s.estado}</td>
                            <td className="px-4 py-2">{s.route?.carrier?.nombre || 'N/A'}</td>
                            <td className="px-4 py-2">
                                {new Date(s.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
