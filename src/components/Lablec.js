import React, { useState, useEffect } from 'react';
import './Lablec.css';
import { myAxios } from '../contexts/MyAxios';
import useAuthContext from '../contexts/AuthContext';  // Az AuthContext importálása

function Lablec() {
    const { user } = useAuthContext();  // A felhasználó lekérése az AuthContextből
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [message, setMessage] = useState('');  // Üzenet tárolása

    useEffect(() => {
        if (user) {
            
            const checkSubscriptionStatus = async () => {
                try {
                    const response = await myAxios.get('/api/feliratkozas-status'); 
                    if (response.data.subscribed) {
                        setIsSubscribed(true);
                    } else {
                        setIsSubscribed(false);
                    }
                } catch (err) {
                    console.error('Hiba történt a státusz lekérdezésekor:', err);
                }
            };
            checkSubscriptionStatus();
        }
    }, [user]);

    const handleSubscribe = async () => {
        try {
            const response = await myAxios.patch('/api/feliratkozas-hirlevelre'); // Feliratkozás hívás

            // Email küldése a backend végponton keresztül
            await myAxios.post('/api/send-subscription-email'); // Feliratkozás email küldés

            alert(response.data.message);
            setIsSubscribed(true); // Feliratkozás sikeres
        } catch (err) {
            alert('Hiba történt a feliratkozás során. Kérlek próbáld újra!');
            console.error('Hiba:', err);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            const response = await myAxios.patch('/api/leiratkozas-hirlevelrol'); // Leiratkozás hívás

            // Email küldése a backend végponton keresztül
            await myAxios.post('/api/send-unsubscription-email'); // Leiratkozás email küldés

            alert(response.data.message);
            setIsSubscribed(false); // Leiratkozás sikeres
        } catch (err) {
            alert('Hiba történt a leiratkozás során. Kérlek próbáld újra!');
            console.error('Hiba:', err);
        }
    };

    return (
        <footer className="footer-container py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p style={{ color: 'black' }}>&copy; {new Date().getFullYear()} Dressly. Minden jog fenntartva.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-link me-3" aria-label="Facebook" style={{ color: 'black' }}>
                            <i className="fa fa-facebook fa-lg"></i>
                        </button>
                        <button className="btn btn-link me-3" aria-label="Instagram" style={{ color: 'black' }}>
                            <i className="fa fa-instagram fa-lg"></i>
                        </button>
                        <button className="btn btn-link me-3" aria-label="YouTube" style={{ color: 'black' }}>
                            <i className="fa fa-youtube fa-lg"></i>
                        </button>
                    </div>
                    {/* Csak akkor jelenjen meg a hírlevél rész, ha a felhasználó be van jelentkezve */}
                    {user && (
                        <div className="col-md-12 text-center mt-4">
                            <div className="newsletter-subscription">
                                <small className="text-muted">Hírlevél kezelése</small>
                                <div className="d-flex justify-content-center align-items-center mt-2">
                                    <button 
                                        onClick={handleSubscribe} 
                                        className="btn btn-primary subscribe-btn ms-3"
                                        disabled={isSubscribed} // Ha fel van iratkozva, ne lehessen kattintani
                                        style={{ opacity: isSubscribed ? 0.5 : 1 }} // Ha feliratkozott, halványodjon
                                    >
                                        Feliratkozom
                                    </button>
                                    <button 
                                        onClick={handleUnsubscribe} 
                                        className="btn btn-danger ms-3"
                                        disabled={!isSubscribed} // Ha nincs feliratkozva, ne lehessen kattintani
                                        style={{ opacity: !isSubscribed ? 0.5 : 1 }} // Ha nincs feliratkozva, halványodjon
                                    >
                                        Leiratkozom
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default Lablec;
