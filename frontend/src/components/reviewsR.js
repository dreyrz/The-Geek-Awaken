import React from 'react'
import './styles.css'
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"

export default function ReviewsRecentes() {
    const [vetorCats, setVetorCats] = React.useState([{ image: imagem, title: 'ronald disse que ele é assi msm', id: "imagem1" },
    { image: imagem, title: 'The God of HighSchool', id: "imagem2" },
    { image: imagem, title: 'Cuidado, eu sou o rei!', id: "imagem3" },
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
        <div className='containerReviews'>
            <h1>Reviews Recentes</h1>
            {vetorCats.map((cat, key) => (
                <div className='card' key={key} onClick={() => handleClick(cat.id)}>
                    <img className="cardImage" alt='imagem do card' src={cat.image} />

                    <div className='nota'>
                        <h3 className='notaText'>10</h3>
                    </div>

                    <div>
                        <h2 className='cardTitle' >{cat.title}</h2>
                        <h4 className='plataform' >Xbox One</h4>
                    </div>

                </div>
            ))}

            <div className='verMaisContainer' style={{ cursor: 'pointer' }} onClick={() => verMais()} >
                <h1>Exibir Mais</h1>
            </div>
        </div>
    )
}