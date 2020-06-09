import React from 'react'
import firebase from "../firebase"
import { Link } from 'react-router-dom'
import './styles.css'

export default function ReviewsRecentes(props) {
    const [vetorStorage,setVetorStorage] = React.useState([])
    const [vetorCats, setVetorCats] = React.useState([])
    const [contador, setContador] = React.useState(0)
    
    async function carregarDados(){
        console.log("carregar dadod")
        let vetorPostsFeedID = []
        await firebase.database().ref(`posts/feed`).once('value').then(function(snapshot){
            Object.keys(snapshot.val()).forEach(function(postFeed){
                vetorPostsFeedID.push(snapshot.val()[postFeed])
            })
        })
        let vetorAux = [];
        let cont = contador
        for(cont; cont<vetorPostsFeedID.length;cont++){
            if(cont<4){
                vetorAux.push(vetorPostsFeedID[cont])
            }
            props.posts.push(vetorPostsFeedID[cont])
        }
        setContador(4)
        setVetorCats(vetorAux);
        setVetorStorage(vetorPostsFeedID)
    }

    React.useEffect(()=>{
        carregarDados();
    },[])
    function verMais() {
        let vetorAux = [];
        let cont = contador
        let aux = 0
        let i = 0
        vetorAux=[...vetorCats]
        if(vetorStorage.length - cont < 4){
            aux = vetorStorage.length - cont
            for(let t=0; t<aux;t++){
                vetorAux.push(vetorStorage[cont])
                cont++
            }
        }
        else{
            for(cont; cont<vetorStorage.length;cont++){
                if(i<4){
                    vetorAux.push(vetorStorage[cont])
                }
                i++
            }
        }
        setVetorCats(vetorAux)
        aux !== 0 ?  setContador(contador+aux) : setContador(contador+4)
    }
    return (
        <div id='containerReviews'>
            <div style={{marginBottom:'3%'}}>
                <h1>Postagens</h1>
            <button onClick={()=>props.openModal()} style={{display: localStorage.getItem('logado') === 'logado' ? "block":"none"}}>Novo</button></div>
            {vetorCats.map((cat, key) => (
           
                <div key={key}>
                    <div id='card'>
                        <div id="cardImageAux">
                            <Link style={{ textDecoration: 'none', borderRadius:'7px'}} to={{pathname:'/postView', state:{post:cat}}} >
                                    <img id="cardImage" alt='imagem do card' src={cat.imagem} />             
                            </Link>  
                        </div>         
                        <div id='cardText'>
                            <Link style={{ textDecoration: 'none' }} to={{pathname:'/postView', state:{post:cat}}}>
                                 <span>{cat.titulo}</span> 
                             </Link> 
                                <p>{cat.sinopse}</p>
                        </div>      
                    </div>
                    <div id="line"></div>
                </div>
            ))}
            <div className='verMais' onClick={()=>verMais()} >
                <h4 >Ver Mais</h4>
            </div>
            
        </div>
    )
}
