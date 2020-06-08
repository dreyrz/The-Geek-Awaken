import React from 'react'
import MenuBar from "../components/menuBar"
import "./styles.css"

export default function PostFrontView(props){

    const [postagem,setPostagem] = React.useState([])

    async function carregarDados(){
        let aux = props.location.state.post
        let vetAux = []
        let cont = 1
        Object.keys(aux.titulos).forEach(function(titulo){
            vetAux.push({titulos:aux.titulos[titulo],textos:aux.textos['texto'+cont],images:aux.imagens['foto'+cont]})
            cont++
            
        })
        setPostagem(vetAux)
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    return(
        <div>
            <MenuBar/>
            <div className="containerPost">
            {postagem.map((post,key)=>(
                    <>
                        <div className="containerTitle"><h1>{post.titulos}</h1></div>
                        <div className="containerImage"><img alt="" src={post.images}/></div>
                        <div className="containerTexto"><p>{post.textos}</p></div>
                    </>
                ))}
            </div>
        </div>
    );
}