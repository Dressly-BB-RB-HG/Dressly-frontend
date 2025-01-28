import React, { useState } from 'react'
import KosarElem from './KosarElem';

function Kosar({ termekek }) {
    const [nyitva, setNyitva] = useState(false);

    const kosarOsszeg = termekek.reduce((osszeg, termek) => osszeg + termek.ar, 0);

    return (
        <div className="relative">
            <button 
                onClick={() => setNyitva(!nyitva)} 
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg">
                Kosár ({termekek.length} tétel) - {kosarOsszeg} Ft
            </button>

            {nyitva && (
                <div className="absolute top-full right-0 w-64 mt-2 p-4 bg-white border rounded-lg shadow-lg">
                    {termekek.length > 0 ? (
                        <div>
                            {termekek.map((termek, index) => (
                                <KosarElem key={index} adat={termek} />
                            ))}
                            <p className="mt-4 font-bold">Teljes összeg: {kosarOsszeg} Ft</p>
                            <button className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-lg">
                                Tovább a fizetéshez
                            </button>
                        </div>
                    ) : (
                        <p>A kosár üres.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Kosar
