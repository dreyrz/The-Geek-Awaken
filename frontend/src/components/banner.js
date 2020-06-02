import React from 'react';
import './styles.css';
import logo from '../assets/banner.png';

export default function Banner() {
    return (
        <div className="container">
                <img className='logo' src={logo} alt='logo' />
        </div>
    );
}