import React from 'react'
import "./styles.css"
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

    window.onload = function() { 
        setTimeout(function () {
            let timeout = document.getElementById("timeout");
            timeout.className = ""; //Remove a classe hide
        }, 1500);
   };

    return(
    <div id='timeout' class='hide'    > 
        <h1 className='dest' >Destaques</h1>
        <div className="containerOB"  >    
            {vetCats.map((cat,key)=>(
                <div>
                    <button style={{display: localStorage.getItem('logado') === 'logado' ? "block":"none"}} onClick={()=>props.openModal(key)}>clique</button>
                    <Link to={{pathname:"/postFront",state:{post:cat}}}>
                        <div key={key} className="cats" >
                            <img className="image" src={cat.imagem}  alt=''/>
                            <div className="title" ><h3>{cat.titulo}</h3></div>
                        </div>
                    </Link>
                </div>
                 
            ))}
        </div>  
    </div>
        
    )
}