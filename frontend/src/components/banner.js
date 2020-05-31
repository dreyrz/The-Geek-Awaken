import React from 'react';
import './styles.css';
import logoImg from '../assets/tgabanner.png';
import { red } from '@material-ui/core/colors';


import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';


export default function Banner() {
    return (

        <div className="container">
            <div className="social">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <a class="ig" href='https://www.instagram.com' >
                    <InstagramIcon style={{ color: red[50] }} />
                </a>

                <a className="yt" href='https://www.youtube.com'>
                <YouTubeIcon style={{ color: red[50] }} />
                </a>

                <a className="tt" href='https://www.twitter.com'>
                <TwitterIcon style={{ color: red[50] }} />
                </a>


            </div>

            <section>
                <img className='logo' src={logoImg} alt='logo' />
            </section>

        </div>
    );
}