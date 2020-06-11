import React from 'react'
import MenuBar from "../components/menuBar"
import firebase from "../firebase"
import "./styles.css"

export default function PostFrontView(props){

    const [postagem,setPostagem] = React.useState([])

    async function carregarDados(){
        if(props.location.state !== undefined){
            let aux = props.location.state.post
            let vetAux = []
            let cont = 1
            Object.keys(aux.titulos).forEach(function(titulo){
                vetAux.push({titulos:aux.titulos[titulo],textos:aux.textos['texto'+cont],images:aux.imagens['foto'+cont]})
                cont++
                
            })
            setPostagem(vetAux)
        }else{
            let str = ''
            let cont = 0
            for(let i =0;i<props.location.pathname.length;i++){
                
                if(props.location.pathname[i] === '/'){
                    cont = cont+1
                }
                if(cont ===2){
                    str = `${str+props.location.pathname[i]}`
                }
            }
            let fotos = [];
            let textos = [];
            let titulos = [];
            await firebase.database().ref(`posts/postsFront/${str}`).once('value').then(function(snapshot){
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
            let vetAux = []
            for(let y = 0; y<fotos.length;y++){
                vetAux.push({titulos:titulos[y],textos:textos[y],images:fotos[y]})
            }
            console.log(vetAux)
            setPostagem(vetAux)
        }
    }

    React.useEffect(()=>{
        carregarDados();
    },[])
    

    return(
        <div>
            <MenuBar/>
            <div className="containerPost" style={{backgroundColor:'white', margin:'6% 5% 1% 5%', borderRadius:'15px'}} >
            {postagem.map((post,key)=>(
                    <>
                        <div className="containerTitle"><h1>{post.titulos}</h1></div>
                        <div className="containerImage"><img alt="" src={post.images}/></div>
                        <div className="containerTexto"><p>{post.textos}</p></div>
                    </>
                ))}
            </div>
        </div>
    )


    
}