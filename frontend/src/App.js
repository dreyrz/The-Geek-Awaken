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
  const [postagemInfo, setPostagemInfo] = React.useState([]);
  const [image, setImage] = React.useState(null)
  const [mainImage, setMainImage] = React.useState(null)
  const [url, setUrl] = React.useState('')
  const [mainTitutlo, setMainTitulo] = React.useState('')
  const [sinopse, setSinopse] = React.useState('')
  const [progress, setProgress] = React.useState(0)
  const [progressMainImage, setProgressMainImage] = React.useState(0)
  const [urlMainImage, setUrlMainImage] = React.useState('')
  const [vetorSecoes, setVetorSecoes] = React.useState([
    <EditorTexto url={url} sendImage={salvarImagem} postagemInfo={postagemInfo}  salvar={salvarPostagem}/>
  ])

  function handleOpen(){
    setOpen(true);
  }
  function handleClose(){
    setOpen(false);
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
  function salvarImagem(image,url){
    setProgress(0)
    setImage(image)
    const uploadTask = firebase.storage().ref(`${image.name}`).put(image)
        uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            setProgress(progress)
        },(error)=>{
           console.log(error)
       },()=>{
           firebase.storage().ref().child(image.name).getDownloadURL().then(url=>setUrl(url))
       })
    
  }
  function handleMainTitulo(e){
    console.log(e.target.value)
    setMainTitulo(e.target.value)
  }
  async function enviar(){
    if(postagemInfo.length==0){
      alert("Escreva algo")
    }else if(image == null || mainImage == null){
      alert("Escolha uma imagem")
    }
    else{
       var newKeyPost = (await firebase.database().ref(`posts/feed/`).child("feed").push()).key;
       var updates = {}
       updates[`/posts/feed/`+ newKeyPost] = {titulo:mainTitutlo,imagem:urlMainImage,id:newKeyPost,sinopse:sinopse,fotos:{imagem1:1},titulos:{titulo1:1},textos:{texto1:1}}
       firebase.database().ref().update(updates)
       window.location.reload()
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
      vetAux2.push(<EditorTexto sendImage={salvarImagem} secoes={vetAux2} postagemInfo={vetAux} salvar={salvarPostagem}/>)
      console.log(vetAux)
      setVetorSecoes(vetAux2)
      }

  }
  
  return (
    
    <div className='body'>
      <Banner/>
      <MenuBar/>
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
        </div>
      </Modal>
    </div>
  );
}

