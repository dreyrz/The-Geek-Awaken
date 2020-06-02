import React from 'react'
import firebase from "../firebase"
import './styles.css'

export default function ReviewsRecentes() {
    const [vetorStorage,setVetorStorage] = React.useState([])
    const [vetor,setVetor] = React.useState([])
    const [vetorCats, setVetorCats] = React.useState([])
    const [contador, setContador] = React.useState(0)
    
    async function carregarDados(){
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

    function handleClick(id) {
        window.location = `/postView?id=${id}`
    }

    function verMais() {
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
    }
    return (
        <div className='containerReviews'>
            <h1>Postagens recentes</h1>
            {vetorCats.map((cat, key) => (           
                <div>
                    <div className="linha"></div>
                    <div className='card' key={key} onClick={() => handleClick(cat.id)}>
                    <img className="cardImage" alt='imagem do card' src={cat.imagem} />                   
                    <div>
                        <div>
                            <h2>{cat.titulo}</h2>
                            <h4>{cat.textos.texto1}</h4>
                        </div>
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
//<h2 className='cardTitle'>{cat.title}</h2>

/*hexagono css .nota {
    width: 50px;
    height: 27px;
    background: red;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: red;
    margin-left: 16%;
  }
.nota h3 {
    font: 900 25px Roboto, sans-serif;
    -webkit-font-smoothing: antialised;
    color: white;
}
.nota:before {
    content: "";
    position: absolute;
    top: -13px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 13px solid red;
    
  }
.nota:after {
    content: "";
    position: absolute;
    bottom: -13px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 13px solid red;


HEXAGONO CODIGO: 
<div className='nota'>
                        <h3>10</h3>
                    </div>
}*/ 