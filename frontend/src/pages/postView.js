import React from 'react'
import MenuBar from "../components/menuBar"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"
import "./styles.css"

export default function PostView(){

    const [postId, setPostId] = React.useState(null);
    const [post, setPost] = React.useState({image:imagem, texto:"Minecraft Dungeons é o mais novo jogo da popular franquia da Mojang lançado para PC, Nintendo Switch, Xbox One e PlayStation 4. Dessa vez, em vez de apostar em mecânicas de construção em um mundo aberto, temos um spin-off que se arrisca por um novo gênero, o dungeon crawler. É quase como um Diablo mais acessível e com classificação etária livre! Confira o que torna o jogo tão legal em nossa análise completa.", titulo:"Minecraft Dungeons é uma aventura charmosa e cativante"});

    function carregarDados(){
        let str = '';
        for(var i =0; i<window.location.search.length;i++){
            if(i>3){
                str = `${str}` + `${window.location.search[i]}`
            }
        }
        setPostId(str)
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    return(
        <div>
            <MenuBar/>
            <div className="containerPost">
                <div className="containerTitle"><h1>{post.titulo}</h1></div>
                <div className="containerImage"><img src={post.image}/></div>
                <div className="containerTexto"><p></p>{post.texto}</div>
            </div>
        </div>
    );
}