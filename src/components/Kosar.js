import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { KosarContext } from '../contexts/KosarContext';
import KosarElem from './KosarElem';
import './Kosar.css';

function Kosar({ isKosarVisible, bezarKosar }) {
    const { kosarLISTA } = useContext(KosarContext);
    const navigate = useNavigate();

    const handleMegrendeles = () => {
        navigate('/rendelesoldal');
    };

    const vegosszeg = kosarLISTA.reduce((osszeg, termek) => osszeg + termek.ar * termek.mennyiseg, 0);

    return (
        <div className={`kosar ${isKosarVisible ? 'visible' : ''}`}>
            <div className='row'>
                <button className="kosar-exit col-lg-1" onClick={bezarKosar}>X</button>
                <h2 className="kosar-title col-lg-10">Kosár</h2>
            </div>
            <div className='kosar-item-container'>
                {kosarLISTA.length > 0 ? (
                    <>
                        {
                            kosarLISTA.map((adat, index) => (
                                <div className="kosar-item" key={index}>
                                    <KosarElem adat={adat} />
                                </div>
                        ))}
                        
                    </>
                ) : (
                    <p className="kosar-item">A kosár üres.</p>
                )}
            </div>
            <h2 className='kosar-title'>Összeg: {vegosszeg} Ft</h2>
            <button className="kosar-button" onClick={handleMegrendeles}>Megrendelés</button>
        </div>
    );
}

export default Kosar;
