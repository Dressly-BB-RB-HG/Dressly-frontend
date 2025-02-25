import React, { useContext } from 'react';
import { KosarContext } from '../contexts/KosarContext';
import KosarElem from './KosarElem';
import './Kosar.css';

function Kosar({ isKosarVisible }) {
    const { kosarLISTA } = useContext(KosarContext);

    return (
        <div className={`kosar ${isKosarVisible ? 'visible' : ''}`}>
            <div className='row'>
                <h2 className="kosar-title col-lg-6">Kosár</h2>
            </div>
            {kosarLISTA.length > 0 ? (
                kosarLISTA.map((adat, index) => (
                    <div className="kosar-item" key={index}>
                        <KosarElem adat={adat} />
                        
                    </div>
                ))
            ) : (
                <p className="kosar-item">A kosár üres.</p>
            )}
            <button className="kosar-button">Megrendelés</button>
        </div>
    );
}

export default Kosar;
