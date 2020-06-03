import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css";

import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';


export default function menuBar(){
    const menusJogos = ["Puzzle"]
    const menusMangas = []
    const menusFilmes = ["Romance","Drama"]
    const menusSeries = []
    const menusAnimes = ["Shounen", "Escolar", "Sobrenatural"]

    function socialFont() {
        
        if (window.matchMedia("(min-width: 1374px)").matches) {    
            return 40;
        } else if (window.matchMedia('(max-width: 1373px)')){
            return 30;
        } else if (window.matchMedia(('max-width: 1148px'))){
              return 20;
        } else if (window.matchMedia(('max-width: 1100px'))){
            return 10;
        } else if (window.matchMedia(('max-width: 821px'))){
            return 5;
        }
    }
    
     return (
         <div className="containerMenu">
             
                <ul className="listaCat">
                    <li onClick={()=>(window.location=`/`)}  id="inicio" className="liCFilho"><div>Início</div></li>
                    <li className="liCFilho"><div>Jogos<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusJogos.map((jogo,key)=>(
                                <li onClick={()=>(window.location=`/postCatView?id=${jogo}`)} key={key}><p>{jogo}</p></li>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Mangás<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusMangas.map((mangas,key)=>(
                                <li onClick={()=>(window.location=`/postCatView?id=${mangas}`)} key={key}><p>{mangas}</p></li>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Animes<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusAnimes.map((animes,key)=>(
                                <li onClick={()=>(window.location=`/postCatView?id=${animes}`)} key={key}><p>{animes}</p></li>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Filmes<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusFilmes.map((filmes,key)=>(
                                <li onClick={()=>(window.location=`/postCatView?id=${filmes}`)} key={key}><p>{filmes}</p></li>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Séries<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusSeries.map((series,key)=>(
                                <li onClick={()=>(window.location=`/postCatViewid=${series}`)} key={key}><p>{series}</p></li>
                            ))}   
                        </ul>
                    </li>
                    <li className="LiCFilho">
                    <div className="socialContainer">
                        <div className="social">
                        <a  target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/the_geek_awaken/' >
                                    <InstagramIcon className="ig" style={{fontSize: socialFont() }} />
                            </a>  
                            
                            <a  target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/channel/UC-rFR4rU0OeHCWzOdVrywWA'>
                                    <YouTubeIcon className="yt" style={{fontSize: socialFont() }} />
                            </a>
                            <a  target="_blank" rel="noopener noreferrer" href='https://twitter.com/TheGeekAwaken'>
                                    <TwitterIcon className="tt" style={{fontSize: socialFont()}} />
                            </a>
                        </div>
                    </div>   
                    </li>
                </ul>               
        </div>

     )
}