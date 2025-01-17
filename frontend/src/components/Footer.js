import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <p>15 Engineering Drive, ECSC 002, Hanover, NH, 03755</p>
                    <p>In partnership with the Magnuson Center for Entrepreneurship</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <p>(603) 646-8744</p>
                    <p>contact@dali.dartmouth.edu</p>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/school/dali-lab">LinkedIn</a>
                        <a href="https://www.instagram.com/dartmouth_dali_lab">Instagram</a>
                        <a href="https://github.com/dali-lab">GitHub</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {currentYear} Dali Lab. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;