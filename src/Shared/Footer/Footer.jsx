import React from 'react';
import logo from '../../assets/images/logo/logo.png';
import { FaLinkedin, FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing social media icons
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
                <img className="w-24" src={logo} alt="ACME Industries Logo" />
                <p className='text-teal-800 text-xl'>
                    Click & Cash
                    <br />
                    Providing reliable service since 2024
                </p>
            </aside>
            <nav>
                <h6 className="footer-title text-teal-900 text-xl">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title text-teal-900 text-xl">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title text-teal-900 text-xl">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            {/* New Social Media Section */}
            <nav>
                <h6 className="footer-title text-teal-900 text-xl">Follow Us</h6>
                <div className="flex gap-2">
                    <Link to='https://www.linkedin.com/in/md-shahien-khan-a46275229/'>
                        <FaLinkedin size={24} className="inline-block mr-3 text-blue-700" />
                    </Link>
                    <Link to='https://www.facebook.com/shawon.khan.5055/'>
                        <FaFacebook size={24} className="inline-block mr-3 text-sky-700" />
                    </Link>
                    <Link to='https://github.com/Md-shahien-khan?tab=repositories'>
                        <FaGithub size={24} className="inline-block mr-3" />
                    </Link>
                    <Link to='https://x.com/?lang=en-gb'>
                        <FaTwitter size={24} className="inline-block mr-3 text-blue-800" />
                    </Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
