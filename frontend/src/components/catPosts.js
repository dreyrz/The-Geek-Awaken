import React from 'react'
import "./styles.css"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"

export default function CatPosts(){
    return(
        <div className="container">
            <div className="catJogos">
                <div className="imageCat"><img className="image" src={imagem}/></div>
                <div className="textCat"><h1>Titulo</h1><p>uasuahs asuhausa auhsua</p></div>
            </div>
            <div className="catAnimes">
                <div className="imageCat"><img className="image" src={imagem}/></div>
                <div className="textCat"><h1>Titulo</h1><p>uasuahs asuhausa auhsua</p></div>
            </div>
            <div className="catFilmes">
                <div className="imageCat"><img className="image" src={imagem}/></div>
                <div className="textCat"><h1>Titulo</h1><p>uasuahs asu</p></div>
            </div>
        </div>
    )
}