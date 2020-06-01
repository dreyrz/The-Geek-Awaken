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
        console.log(vetorAux)
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
        <div>
            <div className="r">Reviews Recentes</div>
            {vetorCats.map((cat, key) => (
                <div className='card' key={key} onClick={() => handleClick(cat.id)} >
                    <img className="cardImage" alt='card' src={cat.imagem} />

                    <div className='nota'>
                         <h1 className="notaN">{cat.titulo}</h1>
                    </div>

                    <div className="cardContent">
                        <h1>{cat.title}</h1>
                        <h2 className='plataforma' >PC</h2>
                    </div>

                </div>
            ))}

            <div className="verMaisContainer" style={{ cursor: 'pointer' }} onClick={()=>verMais()} >
                <h1 className='verMaisText'>Ver Mais</h1>
            </div>
        </div>
    )
}