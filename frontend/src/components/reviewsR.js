import React from 'react'
import './styles.css'
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"

export default function ReviewsRecentes() {
    const vetorStorage = [
    { image: imagem, title: '1', id: "imagem1" },
    { image: imagem, title: '2', id: "imagem2" },
    { image: imagem, title: '3', id: "imagem3" },
    { image: imagem, title: '4', id: "imagem4" },
    { image: imagem, title: '5', id: "imagem3" },
    { image: imagem, title: '6', id: "imagem4" },
    { image: imagem, title: '7', id: "imagem1" },
    { image: imagem, title: '8', id: "imagem2" },
    { image: imagem, title: '9', id: "imagem3" }]
    const [vetorCats, setVetorCats] = React.useState([])
    const [contador, setContador] = React.useState(0)
    
    function carregarDados(){
        let vetorAux = [];
        let cont = contador
        for(cont; cont<vetorStorage.length;cont++){
            if(cont<4){
                vetorAux.push(vetorStorage[cont])
            }
        }
        setContador(4)
        setVetorCats(vetorAux);
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    function handleClick(id) {
        window.location = `/post?id=${id}`
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
                    <img className="cardImage" alt='card' src={cat.image} />

                    <div className='nota'>
                        <h1 className="notaN">10</h1>
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