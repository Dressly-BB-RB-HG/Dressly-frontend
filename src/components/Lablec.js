import React, { useState } from 'react';
import './Lablec.css';
import { myAxios } from '../contexts/MyAxios';  // A myAxios importálása
import { useNavigate } from 'react-router-dom';

function Lablec() {
    const [isSubscribed, setIsSubscribed] = useState(false);  // Feliratkozás állapota
    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setIsSubscribed(event.target.checked);
    };

    const handleSubmit = async () => {
        if (isSubscribed) {
            try {
                // Feliratkozás kérés küldése a backendre
                await myAxios.patch('/api/feliratkozas-hirlevelre', { subscribed: true });
                alert('Sikeresen feliratkoztál a hírlevélre!');
                navigate('/');  // Például visszairányítunk a főoldalra
            } catch (err) {
                alert('Hiba történt a feliratkozás során.');
                console.error('Hiba történt:', err);
            }
        } else {
            alert('A hírlevélre való feliratkozás nem történt meg.');
        }
    };

    return (
        <footer className="footer-container py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p>&copy; {new Date().getFullYear()} Dressly. Minden jog fenntartva.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <a href="#" className="me-3"><i className="fa fa-facebook fa-lg"></i></a>
                        <a href="#" className="me-3"><i className="fa fa-instagram fa-lg"></i></a>
                        <a href="#" className="me-3"><i className="fa fa-youtube fa-lg"></i></a>
                    </div>
                    <div className="col-md-12 text-center mt-4">
                        <div className="newsletter-subscription">
                            <small className="text-muted">Feliratkozás a hírlevélre</small>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    checked={isSubscribed}
                                    onChange={handleCheckboxChange}
                                    className="newsletter-checkbox me-2"
                                />
                                <button 
                                    onClick={handleSubmit} 
                                    className="btn btn-primary subscribe-btn ms-3"
                                    disabled={!isSubscribed}
                                >
                                    Feliratkozom
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Lablec;
