import React from 'react'
import MenuBar from "../components/menuBar"
import Banner from "../components/banner"
import firebase from "../firebase"
import "./styles.css"

export default function PostCatView(){

    const [postId, setPostId] = React.useState(null);
    const [post, setPost] = React.useState({images:'', textos:'', titulos:''});
    const [vetor,setVetor] = React.useState([])
    const [obras, setObras] = React.useState([])

    async function carregarDados(){
        let str = '';
        for(var i =0; i<window.location.search.length;i++){
            if(i>3){
                str = `${str}` + `${window.location.search[i]}`
            }
        }
        let obrasAux = []; 
        await firebase.database().ref(`posts/categorias/${str.toLowerCase()}`).once('value').
        then(function(snapshot){
            Object.keys(snapshot.val()).forEach(function(postFeed){
                obrasAux.push({nomeDaObra:postFeed,images:snapshot.val()[postFeed].fotos,
                    titulos:snapshot.val()[postFeed].titulos,textos:snapshot.val()[postFeed].textos,imagem:snapshot.val()[postFeed].imagem})
            })

            
        })
        setObras(obrasAux)
        setPost({titulos:'',images:'',textos:''})
        setPostId(str)
        setVetor([])
    }

    React.useEffect(()=>{
        carregarDados();
    },[])

    return(
        <div>
            <Banner/>
            <MenuBar/>
            <div className="containerPost">
            {obras.map((obra,key)=>(
                    <>
                        <div className="containerTitle"><h1>{obra.nomeDaObra}</h1></div>
                        <div className="containerImage"><img src={obra.imagem}/></div>
                    </>
                ))}
            </div>
        </div>
    );
}