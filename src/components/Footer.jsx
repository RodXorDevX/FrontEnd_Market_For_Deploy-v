import '../assets/css/Footer.css';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
// Importa los iconos de las redes sociales
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <div className="developers">
                        Diseñado por: <br/>
                        <div><a href="https://github.com/adcrx" target="_blank" rel="noopener noreferrer">adcrx</a></div>
                        <div><a href="https://github.com/RodXorDevX" target="_blank" rel="noopener noreferrer">RodXorDevX</a></div>
                        <div><a href="https://github.com/Vanssnii" target="_blank" rel="noopener noreferrer">Vanssnii</a></div>
                    </div>
                </div>

                <div className="footer-center">
                    <div className="social-container">
                        <p>Encuéntranos en:</p>
                        <div className="social-links">
                            <div><a href="https://x.com/" aria-label="Twitter">
                                <FaTwitter />
                            </a></div>
                            <div><a href="https://www.facebook.com/" aria-label="Facebook">
                                <FaFacebook />
                            </a></div>
                            <div><a href="https://www.instagram.com/" aria-label="Instagram">
                                <FaInstagram />
                            </a></div>
                        </div>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="copyright">
                        TREND'S 2025
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
