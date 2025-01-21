import React from 'react'
import './Lablec.css';

function Lablec() {
    return (
        <footer class="footer-container py-4">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <p>&copy; {new Date().getFullYear()} Dressly. Minden jog fenntartva.</p>
                    </div>
                    <div class="col-md-6 text-end">
                        <a href="#" class="me-3"><i class="fa fa-facebook fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fa fa-instagram fa-lg"></i></a>
                        <a href="#" class="me-3"><i class="fa fa-youtube fa-lg"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Lablec


