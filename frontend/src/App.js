import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import Banner from "./components/banner"
import ReviewsRecentes from './components/reviewsR'
import Modal from '@material-ui/core/Modal';
import EditorTexto from './components/editorTexto';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './firebase'
import ImageUpload from './components/imageUpload'

/*
erro ao tentar enviar as fotos com a url salva da funcao, esta enviando undefined antes de salvar*/


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: "600px",
      height: "600px",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      marginLeft:"28%",
      marginTop:"2%",
      overflowY:"scroll"
    },
    editorTitulo:{
      marginTop:"5%"
    }
  }));
export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openLogar, setOpenLogar] = React.useState(false);
  const [postagemInfo, setPostagemInfo] = React.useState([]);
  const [image, setImage] = React.useState([])
  const [mainImage, setMainImage] = React.useState(null)
  const [imagi, setImagi] = React.useState(null)
  const [urli, setUrli] = React.useState([])
  const [mainTitutlo, setMainTitulo] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [sinopse, setSinopse] = React.useState('')
  const [progress, setProgress] = React.useState(0)
  const [progressMainImage, setProgressMainImage] = React.useState(0)
  const [urlMainImage, setUrlMainImage] = React.useState('')
  const [vetorSecoes, setVetorSecoes] = React.useState([
    <EditorTexto images={image} sendImage={salvarImagem} postagemInfo={postagemInfo}  salvar={salvarPostagem}/>
  ])
  function handleOpen(){
    setOpen(true);
  }
  function handleClose(){
    localStorage.removeItem('logado')
    setOpen(false);
  }
  function handleOpenLogar(){
    setOpenLogar(true);
  }
  function handleCloseLogar(){
    setOpenLogar(false);
  }
  function salvarMainImagem(image,url){
    setProgressMainImage(0)
    setMainImage(image)
    const uploadTask = firebase.storage().ref(`${image.name}`).put(image)
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            setProgressMainImage(progress)
        },(error)=>{
           console.log(error)
       },()=>{
           firebase.storage().ref().child(image.name).getDownloadURL().then(url=>setUrlMainImage(url))
       })
    
  }
  async function salvarImagem(imagem,images){
    let bool = true
    for(let i= 0; i<images.length;i++){
      if(images[i].name == imagem.name){
        alert("imagem ja salva")
        bool = false
      }
    }if(vetorSecoes.length<image.length+1){
      bool = false
      alert("Nao pode alterar a imagem")
    }
    if(bool){
      images.push(imagem)
      setImage(images)
      alert("imagem salva")
      setProgress(0)
        firebase.storage().ref(`${imagem.name}`).put(imagem).on('state_changed', (snapshot) => {
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
         setProgress(progress);
       }, (error) => {
         console.log(error);
       }, () => {
         firebase.storage().ref().child(imagem.name).getDownloadURL().then((function(url){
           let aux = [...urli]
           aux.push(url)
           setUrli(aux)
         }));
       })
      console.log(images)}
  }
  function handleMainTitulo(e){
    setMainTitulo(e.target.value)
  }
  async function enviar(){
    if(postagemInfo.length==0){
      alert("Escreva algo")
    }
    else if(image.length<1 ||mainImage == null){
      alert("selecione as imagens")
    }
    else{
      const objTitulos = {}
      const objFotos = {}
       const objTextos = {}
       for(let i = 0; i<postagemInfo.length; i++){
        objTitulos[`titulo${i+1}`] = postagemInfo[i].titulo
        objTextos[`texto${i+1}`] = postagemInfo[i].texto
        objFotos[`foto${i+1}`] = urli[i]
       }
       var newKeyPost = (await firebase.database().ref(`posts/feed/`).child("feed").push()).key;
       var updates = {}
       updates[`/posts/feed/`+ newKeyPost] = {titulo:mainTitutlo,imagem:urlMainImage,id:newKeyPost,sinopse:sinopse,fotos:objFotos,titulos:objTitulos,textos:objTextos}
       await firebase.database().ref().update(updates)
       window.location.reload()
       console.log(objFotos)
    }
  }
  function handleChange(e){
    if(e.target.files[0]){
        const imagem = e.target.files[0]
        setImagi(imagem)
    }
  }

  function salvarPostagem(postagem,secoes,titulo,texto){
      if(titulo.length<2 || texto.length<2){
        alert("escreva algo para salvar")
      }else{
      let vetAux = [...postagem]
      vetAux.push({titulo:titulo,texto:texto})
      setPostagemInfo(vetAux)
      let vetAux2 = secoes == "init" ? [...vetorSecoes] : [...secoes]
      vetAux2.push(<EditorTexto images={image} sendImage={salvarImagem} secoes={vetAux2} postagemInfo={vetAux} salvar={salvarPostagem}/>)
      setVetorSecoes(vetAux2)
      }
  }
  function handleLogar(){
    handleOpenLogar()
  }
  
  return (
    
    <div className='body'>
      <Banner/>
      <MenuBar logar={handleLogar}/>
      <div className="page">
        <div style={{marginTop:"5%"}}><CatPosts/></div> 
          <ReviewsRecentes openModal={handleOpen}/>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <div>
            <h1>Selecione uma imagem para ser a principal</h1>
            <ImageUpload direct={true} func={salvarMainImagem}/> 
            <img src={urlMainImage} width="300px" height="300px"/>
            <progress value={progressMainImage} max="100"/>
        
          </div>
          <div>
            <h1>Escreva um titulo para ser o principal</h1>
            <input onChange={handleMainTitulo}/>
          </div>
          <div>
            <h1>Escreva uma sinopse</h1>
            <input onChange={e=>setSinopse(e.target.value)}/>
          </div>
          {vetorSecoes.map((secao,key)=>(
            <div key={key}>
              {secao}
          </div>
          ))}
          <progress value={progress} max="100"/>
          <button onClick={()=>enviar()}>Enviar</button>
          {/*<div>
            <input type="file" onChange={handleChange}/>
            <button onClick={()=>salvarImagem(imagi)}>Enviar</button>
            <br/>
          </div>*/}
        </div>
      </Modal>
      <Modal
        open={openLogar}
        onClose={handleCloseLogar}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <div>
          <input onChange={e=>setUsername(e.target.value)} placeholder="username"/>
          <input onChange={e=>setSenha(e.target.value)} placeholder="senha"/>
          <button onClick={()=>{
            if(username ==='teste' && senha === 'teste'){
             localStorage.setItem("logado","logado") 
            }
          }}>confimar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

