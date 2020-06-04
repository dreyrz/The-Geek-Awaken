import React from 'react'
import firebase from "../firebase"
import { Link } from 'react-router-dom'
import './styles.css'

export default function ReviewsRecentes(props) {
    const [vetorStorage,setVetorStorage] = React.useState([])
    const [vetorCats, setVetorCats] = React.useState([])
    const [contador, setContador] = React.useState(0)
    
    async function carregarDados(){
        console.log(props)
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
        <div className='containerReviews'>
            <div style={{display:"flex"}}><h1>Postagens recentes</h1><button onClick={()=>props.openModal()} style={{display: localStorage.getItem('logado') === 'logado' ? "block":"block"}}>Novo</button></div>
            {vetorCats.map((cat, key) => (           
                <div key={key}>
                    <div className="line"></div>
                    <div className='card' >
                        <Link style={{ textDecoration: 'none' }} to={{pathname:'/postView', state:{post:cat}}} >
                            <div className="cardImageAux"><img className="cardImage" alt='imagem do card' src={cat.imagem} />  </div>
                            
                        </Link>           

                            <div className='cardText'>
                                <Link style={{ textDecoration: 'none'}} to={{pathname:'/postView', state:{post:cat}}}>
                                    <h2>{cat.titulo}</h2> 
                                </Link> 
                                    <h4>{cat.sinopse}</h4>
                            </div>      
                    </div>
                </div>
            ))}
            <div className='verMaisContainer' style={{ cursor: 'pointer' }} onClick={() => verMais()} >
                <h1>Ver mais</h1>
            </div>
        </div>
    )
}
