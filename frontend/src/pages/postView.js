import React from 'react'
import MenuBar from "../components/menuBar"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"
import Banner from "../components/banner"
import firebase from "../firebase"
import "./styles.css"

export default function PostView(){

    const [postId, setPostId] = React.useState(null);
    const [post, setPost] = React.useState({image:'', texto:'', titulo:''});

    async function carregarDados(){
        let str = '';
        for(var i =0; i<window.location.search.length;i++){
            if(i>3){
                str = `${str}` + `${window.location.search[i]}`
            }
        }
        await firebase.database().ref(`posts/${str}`).once('value').then(function(snapshot){
            console.log(snapshot.val())
            setPost({texto:snapshot.val().texto,
                titulo:snapshot.val().titulo,
                image:snapshot.val().imagem})
        })
        setPostId(str)
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    return(
        <div>
            <Banner/>
            <MenuBar/>
            <div className="containerPost">
                <div className="containerTitle"><h1>{post.titulo}</h1></div>
                <div className="containerImage"><img src={post.image}/></div>
                <div className="containerTexto"><p></p>{post.texto}</div>
            </div>
        </div>
    );
}