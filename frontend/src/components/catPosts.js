import React from 'react'
import "./styles.css"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"
import firebase from "../firebase"
import { Link } from 'react-router-dom'

export default function CatPosts(props){

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

    return(
        <div className="containerOB">
            {vetCats.map((cat,key)=>(
                <Link to={{pathname:"/postFront",state:{post:cat}}}>
                    <div key={key} className="cats">
                        <img className="image" src={cat.imagem}/>
                        <div className="title"><h3>{cat.titulo}</h3></div>
                    </div>
                </Link>
                
            ))}
        </div>
    )
}