import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css";
import { red } from '@material-ui/core/colors';


import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';


export default function menuBar(){
    const menusJogos = ["Uncharted","Mario Kart"]
    const menusMangas = ["Dragon Ball Z"]
    const menusFilmes = ["Poderoso Chefão"]
    const menusSeries = ["13 reasons why"]
    const menusAnimes = ["Dragon Ball Z","the rising of the shield hero of the mommy"]

    function handleClick(id){
        window.location=`/post?id=${id}`
    }
     return (
         <div>
             <ul className="listaCat">
                <li onClick={()=>(window.location=`/`)}  id="inicio" className="liCFilho"><a>Inicio</a></li>
                <li className="liCFilho"><a>Jogos<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        {menusJogos.map((jogo,key)=>(
                            <li onClick={()=>(window.location=`/post?id=${jogo}`)} key={key}><p>{jogo}</p></li>
                        ))}
                    </ul>
                </li>
                <li className="liCFilho"><a>Mangas<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        {menusMangas.map((mangas,key)=>(
                            <li onClick={()=>(window.location=`/post?id=${mangas}`)} key={key}><p>{mangas}</p></li>
                        ))}
                    </ul>
                </li>
                <li className="liCFilho"><a>Animes<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        {menusAnimes.map((animes,key)=>(
                            <li onClick={()=>(window.location=`/post?id=${animes}`)} key={key}><p>{animes}</p></li>
                        ))}
                    </ul>
                </li>
                <li className="liCFilho"><a>Filmes<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        {menusFilmes.map((filmes,key)=>(
                            <li onClick={()=>(window.location=`/post?id=${filmes}`)} key={key}><p>{filmes}</p></li>
                        ))}
                    </ul>
                </li>
                <li className="liCFilho"><a>Series<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        {menusSeries.map((series,key)=>(
                            <li onClick={()=>(window.location=`/post?id=${series}`)} key={key}><p>{series}</p></li>
                        ))}
                    </ul>
                </li>
                <div className="social">
                    <a className="ig" target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/the_geek_awaken/' >
                        <InstagramIcon style={{ color: red[50] }} />
                    </a>

                    <a className="yt" target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/channel/UC-rFR4rU0OeHCWzOdVrywWA'>
                        <YouTubeIcon style={{ color: red[50] }} />
                    </a>

                    <a className="tt" target="_blank" rel="noopener noreferrer" href='https://twitter.com/TheGeekAwaken'>
                        <TwitterIcon style={{ color: red[50] }} />
                    </a>
                </div>
            </ul>
            
         </div>
     )
}