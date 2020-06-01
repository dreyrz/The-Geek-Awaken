import React from 'react'
import "./styles.css"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"
import firebase from "../firebase"

export default function CatPosts(props){

    const [cate1,setCat1] = React.useState({imagem:'',titulo:'',id:'anime1'})
    const [cate2,setCat2] = React.useState({imagem:'',titulo:'',id:'anime2'})
    const [cate3,setCat3] = React.useState({imagem:'',titulo:'',id:'anime3'})
    const [cate4,setCat4] = React.useState({imagem:'',titulo:'',id:'anime4'})

   async  function carregarDados(){
        await firebase.database().ref('posts/postsFront/postFront1').once('value').then(function(snapshot){
            setCat1({titulo:snapshot.val().titulo,
                image:snapshot.val().imagem,id:'postFront1'})
        })
        await firebase.database().ref('posts/postsFront/postFront2').once('value').then(function(snapshot){
            setCat2({titulo:snapshot.val().titulo,
                image:snapshot.val().imagem,id:'postFront2'})
        })
        await firebase.database().ref('posts/postsFront/postFront3').once('value').then(function(snapshot){
            setCat3({titulo:snapshot.val().titulo,
                image:snapshot.val().imagem,id:'postFront3'})
        })
        await firebase.database().ref('posts/postsFront/postFront4').once('value').then(function(snapshot){
            setCat4({titulo:snapshot.val().titulo,
                image:snapshot.val().imagem,id:'postFront4'})
        })
    }
    
    React.useEffect(()=>{
        carregarDados();
    },[])

    function handleClick(id){
        window.location=`/post?id=${id}`
    }

    return(
        <div className="containerOB">
            <div onClick={()=>handleClick(cate1.id)} className="cats">
                <img className="image" src={cate1.image}/>
                <div className="title"><h3>{cate1.titulo}</h3></div>
            </div>
            <div onClick={()=>handleClick(cate2.id)} className="cats">
                <img className="image" src={cate2.image}/>
                <div className="title"><h3>{cate2.titulo}</h3></div>
            </div>
            <div onClick={()=>handleClick(cate3.id)} className="cats">
                <img className="image" src={cate3.image}/>
                <div className="title"><h3>{cate3.titulo}</h3></div>
            </div>
            <div onClick={()=>handleClick(cate4.id)} className="cats">
                <img className="image" src={cate4.image}/>
                <div className="title"><h3>{cate4.titulo}</h3></div>
            </div>
        </div>
    )
}