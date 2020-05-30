import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css"

export default function menuBar(){
     return (
         <div>
             <ul className="listaCat">
                <li id="inicio" className="liCFilho"><a>Inicio</a></li>
                <li className="liCFilho"><a>Jogos<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        <li><p>Uncharted</p></li>
                        <li><p>Mario Kart</p></li>
                    </ul>
                </li>
                <li className="liCFilho"><a>Mangas<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        <li><p>Dragon Ball Z</p></li>
                    </ul>
                </li>
                <li className="liCFilho"><a>Animes<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        <li><p>Dragon Ball Z</p></li>
                        <li><p>the rising of the shield hero of the mommy</p></li>
                    </ul>
                </li>
                <li className="liCFilho"><a>Filmes<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        <li><p>Poderoso Chefão</p></li>
                    </ul>
                </li>
                <li className="liCFilho"><a>Series<ArrowDropDownIcon/></a>
                    <ul className="listaCat2">
                        <li><p>13 reasons why</p></li>
                    </ul>
                </li>
            </ul>
         </div>
     )
}