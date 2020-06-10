import React from 'react';
import './styles.css';
import firebase from '../firebase';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import logo from '../assets/59164.jpg'
import teste from '../assets/teste.jpg'
import logoTGA from '../assets/logoTGA.png'

export default function Slides(props) {

  const [vetCats,setVetCats] = React.useState([{imagem:'',titulo:'',id:''}])

   async  function carregarDados(){
       let vetAux = []
        await firebase.database().ref('posts/postsFront').once('value').then(function(snapshot){
                Object.keys(snapshot.val()).forEach(function(postFeed){
                    vetAux.push({imagem:snapshot.val()[postFeed].imagem,id:postFeed,
                                titulo:snapshot.val()[postFeed].titulo,titulos:snapshot.val()[postFeed].titulos,
                                imagens:snapshot.val()[postFeed].fotos,textos:snapshot.val()[postFeed].textos})
                })
        })
        setVetCats(vetAux)
    }
    
    React.useEffect(()=>{
        carregarDados();
    },[])


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
            {vetCats.map((cat,id)=>(
              <div className="slide">
                <div style={{backgroundImage: `url(${cat.imagem})`}}>
                  <div className='slideTextContainer'>
                     <p>{cat.titulo}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      )
  }

