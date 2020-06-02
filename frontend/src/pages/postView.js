import React from 'react'
import MenuBar from "../components/menuBar"
import Banner from "../components/banner"
import firebase from "../firebase"
import "./styles.css"

export default function PostView(){

    const [postId, setPostId] = React.useState(null);
    const [post, setPost] = React.useState({images:'', textos:'', titulos:''});
    const [vetor,setVetor] = React.useState([])

    async function carregarDados(){
        let str = '';
        for(var i =0; i<window.location.search.length;i++){
            if(i>3){
                str = `${str}` + `${window.location.search[i]}`
            }
        }
        let fotos = [];
        let textos = [];
        let titulos = [];
        await firebase.database().ref(`posts/feed/${str}`).once('value').then(function(snapshot){
            Object.keys(snapshot.val().fotos).forEach(function(foto){
                fotos.push(snapshot.val().fotos[foto])
            })
            Object.keys(snapshot.val().titulos).forEach(function(foto){
                titulos.push(snapshot.val().titulos[foto])
            })
            Object.keys(snapshot.val().textos).forEach(function(foto){
                textos.push(snapshot.val().textos[foto])
            })
            
        })

        setPost({titulos:titulos,images:fotos,textos:textos})
        setPostId(str)
        setVetor(titulos)
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    return(
        <div>
            <Banner/>
            <MenuBar/>
            <div className="containerPost">
            {vetor.map((titulo,key)=>(
                    <>
                        <div className="containerTitle"><h1>{titulo}</h1></div>
                        <div className="containerImage"><img src={post.images[key]}/></div>
                        <div className="containerTexto"><p>{post.textos[key]}</p></div>
                    </>
                ))}
            </div>
        </div>
    );
}