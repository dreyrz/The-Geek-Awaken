import React from 'react';
import './styles.css';
import logoImg from '../assets/banner.png';
import { red } from '@material-ui/core/colors';


import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';


export default function Banner() {
    return (
        <div className="container">
            <div className="social">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <a className="ig" target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/the_geek_awaken/' >
                    <InstagramIcon style={{ color: red[50] }} />
                </a>

                <a className="yt" target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/channel/UC-rFR4rU0OeHCWzOdVrywWA'>
                <YouTubeIcon style={{ color: red[50] }} />
                </a>

                <a className="tt" target="_blank" rel="noopener noreferrer" href='https://twitter.com/TheGeekAwaken'>
                <TwitterIcon style={{ color: red[50] }} />
                </a>


            </div >
            <div className='logoC'>
                <img className='logo' src={logoImg} alt='logo' />
            </div>

        </div>
    );
}