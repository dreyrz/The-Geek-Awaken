import React from 'react';
import './styles.css';
import firebase from '../firebase';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import logo from '../assets/59164.jpg'
import teste from '../assets/teste.jpg'
import logoTGA from '../assets/logoTGA.png'

export default function Slides(props) {

    const slideImages = [
        logo,
        teste,
        logoTGA
      ];

      const properties = {
        duration: 4000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        arrows: true,
        pauseOnHover: true,
      }
      
      return (
        <div className="slideContainer">

          <Slide {...properties}>
            <div className="slide">
              <div style={{backgroundImage: `url(${slideImages[0]})`}}>
                <div className='slideTextContainer'>
                <p>KKKKKKKKKKKKK</p>
                </div>
              </div>
            </div>
            <div className="slide">
              <div style={{backgroundImage: `url(${slideImages[1]})`}}>
                <div className='slideTextContainer'>
                    <p>KKKKKKKKKKKKK</p>
                </div>
              </div>
            </div>
            <div className="slide">
              <div style={{backgroundImage: `url(${slideImages[2]})`}}>
                <div className='slideTextContainer'>
                    <p>KKKKKKKKKKKKK</p>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      )
  }

