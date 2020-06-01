import React from 'react'
import './styles.css'
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"

export default function ReviewsRecentes() {
    const [vetorCats, setVetorCats] = React.useState([{ image: imagem, title: 'ronald disse que ele é assi msm', id: "imagem1" },
    { image: imagem, title: 'ronald disse que ele é assi msm', id: "imagem2" },
    { image: imagem, title: 'ronald disse que ele é assi msm', id: "imagem3" },
    { image: imagem, title: 'ronald disse que ele é assi msm', id: "imagem4" }])

    function handleClick(id) {
        window.location = `/post?id=${id}`
    }
    function verMais() {
        var vetorAux = vetorCats;
        vetorAux.push({ image: imagem, title: 'socrr deus', id: "imagem2" });
        console.log(vetorCats);
        setVetorCats(vetorAux);
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

            <div className="verMaisContainer" style={{ cursor: 'pointer' }} onClick={() => verMais()} >
                <h1 className='verMaisText'>Ver Mais</h1>
            </div>
        </div>
    )
}