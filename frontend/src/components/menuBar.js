import React from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import "./styles.css"

export default function menuBar(){
    const menusJogos = ["Ação","Animação","Aventura"
                            ,"Comédia","Documentário"
                            ,"Fantasia","Faroeste"
                            ,"Ficção científica"
                            ,"Guerra" ,"Musicais"
                            ,"Romance", "Suspense"
                            ,"Terror","Tragédia/Drama"]
    const menusMangas = ["Ação","Animação","Aventura"
                            ,"Comédia","Documentário"
                            ,"Fantasia","Faroeste"
                            ,"Ficção científica"
                            ,"Guerra" ,"Musicais"
                            ,"Romance", "Suspense"
                            ,"Terror","Tragédia/Drama"]
    const menusFilmes = ["Ação","Animação","Aventura"
                            ,"Comédia","Documentário"
                            ,"Fantasia","Faroeste"
                            ,"Ficção científica"
                            ,"Guerra" ,"Musicais"
                            ,"Romance", "Suspense"
                            ,"Terror","Tragédia/Drama"]
    const menusSeries = ["Ação","Animação","Aventura"
                            ,"Comédia","Documentário"
                            ,"Fantasia","Faroeste"
                            ,"Ficção científica"
                            ,"Guerra" ,"Musicais"
                            ,"Romance", "Suspense"
                            ,"Terror","Tragédia/Drama"]
    const menusAnimes = ["Ação","Animação","Aventura"
                            ,"Comédia","Documentário"
                            ,"Fantasia","Faroeste"
                            ,"Ficção científica"
                            ,"Guerra" ,"Musicais"
                            ,"Romance", "Suspense"
                            ,"Terror","Tragédia/Drama"]

   
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
            </ul>
         </div>
     )
}