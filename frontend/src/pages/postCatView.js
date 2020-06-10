import React from 'react'
import MenuBar from "../components/menuBar"
import firebase from "../firebase"
import { Link } from "react-router-dom"
import "./styles.css"

export default function PostCatView(){
    
    const [obras, setObras] = React.useState([])
    const [cat, setCat] = React.useState()

    async function carregarDados(){
        let str = '';
        for(var i =0; i<window.location.search.length;i++){
            if(i>3){
                str = `${str}` + `${window.location.search[i]}`
            }
        }
        if(str !== ''){
            setCat(str)
            let obrasAux = [];
            await firebase.database().ref(`posts/categorias/${str.toLowerCase()}`).limitToLast(10).once('value').
            then(function(snapshot){
                Object.keys(snapshot.val()).forEach(function(postFeed){
                    obrasAux.push({nomeDaObra:postFeed,fotos:snapshot.val()[postFeed].fotos,
                        titulos:snapshot.val()[postFeed].titulos,textos:snapshot.val()[postFeed].textos,
                        imagem:snapshot.val()[postFeed].imagem,sinopse:snapshot.val()[postFeed].sinopse,id:snapshot.val()[postFeed].id})
                })
    
                
            })
            setObras(obrasAux)

            
        }
        setObras(obrasAux)
        
    }
    
    React.useEffect(()=>{
        carregarDados();
        
    },[])

    /*function verMais() {
        let vetorAux = [];
        let cont = contador
        let aux = 0
        let i = 0
        for(let y = 0; y<vetorCats.length; y++){
            vetorAux.push(vetorCats[y])
        }
        if(vetorStorage.length - cont < 4){
            cont--
            aux = vetorStorage.length - cont
            for(let t=0; t<aux;t++){
                vetorAux.push(vetorStorage[cont])
                cont++
            }
        }
        for(cont; cont<vetorStorage.length;cont++){
            i++
            if(i<4){
                vetorAux.push(vetorStorage[cont])
            }
        }
        aux != 0 ?  setContador(contador+aux) : setContador(contador+4)
        setVetorCats(vetorAux)
    }*/
    
    return(
        <div><MenuBar/>
        <div className='page' style={{minHeight:'700px'}} >
            
            
            <div id='containerReviews'>
            <h1>{cat}</h1>
            {obras.map((cat, key) => (           
                <div key={key}>
                    
                    <div id='card' style={{width:'100%',height:'180px'}} >
                        <div id="cardImageAux">
                            <Link style={{ textDecoration: 'none', borderRadius:'7px'}} to={{pathname:'/postView', state:{post:cat}}} >
                                    <img id="cardImage" alt='imagem do card' src={cat.imagem} />             
                            </Link>  
                        </div>         
                        <div id='cardText'>
                            <Link style={{ textDecoration: 'none' }} to={{pathname:'/postView', state:{post:cat}}}>
                                 <h2>{cat.nomeDaObra}</h2> 
                             </Link> 
                                <p>{cat.sinopse}</p>
                        </div>      
                    </div>
                    <div id="line" style={{width:'98%'}} ></div>
                </div>
            ))}
            
        </div>
        </div></div>
    );
}