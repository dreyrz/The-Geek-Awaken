import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css";

import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';


export default function menuBar(){
    const menusJogos = []
    const menusMangas = []
    const menusFilmes = ["Romance","Drama"]
    const menusSeries = []
    const menusAnimes = ["Shounen", "Escolar", "Sobrenatural"]
    
     return (
         <div className="containerMenu">
                <ul className="listaCat">
                    <li onClick={()=>(window.location=`/`)}  id="inicio" className="liCFilho"><div>Inicio</div></li>
                    <li className="liCFilho"><div>Jogos<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusJogos.map((jogo,key)=>(
                                <li onClick={()=>(window.location=`/postCatView?id=${jogo}`)} key={key}><p>{jogo}</p></li>
                            ))}
                        </ul>
                    </li>
                    <li className="liCFilho"><div>Mangas<ArrowDropDownIcon/></div>
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
                    <li className="liCFilho"><div>Series<ArrowDropDownIcon/></div>
                        <ul className="listaCat2">
                            {menusSeries.map((series,key)=>(
                                <li onClick={()=>(window.location=`/postCatViewid=${series}`)} key={key}><p>{series}</p></li>
                            ))}
                        </ul>
                    </li>    
                </ul>               
        </div>

     )
}