import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import ReviewsRecentes from './components/reviewsR'
import Modal from '@material-ui/core/Modal';
import EditorTexto from './components/editorTexto';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import firebase from './firebase'
import ImageUpload from './components/imageUpload'
import './global.css';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: "90%",
      height:'90%',
      borderRadius:'15px',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center', 
      textAlign:'center',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    modalEditPost:{
      width:"350px",
      height:"180px",
      borderRadius:'15px',
      backgroundColor: theme.palette.background.paper,
      marginTop: '12%',
      marginLeft:'25%',
      padding:"5%"

    },
    editorTitulo:{
      marginTop:"5%"
    }
  }));
export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openLogar, setOpenLogar] = React.useState(false);
  const [openEditPost, setOpenEditPost] = React.useState(false);
  const [postagemInfo, setPostagemInfo] = React.useState([]);
  const [image, setImage] = React.useState([])
  const [mainImage, setMainImage] = React.useState(null)
  const [postFrontKey, setPostFrontKey] = React.useState(null)
  const [postsRecentes, setPostsRecentes] = React.useState([])
  const [postChoose, setPostChoose]= React.useState('')
  const [postChooseInfo, setPostChooseInfo]= React.useState('')
  const [categoria, setCategoria]= React.useState('')
  const [categorias, setCategorias]= React.useState([])
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
    localStorage.setItem('url',JSON.stringify([]))
  }
  function handleClose(){
    localStorage.removeItem('logado')
    setOpen(false);
    setCategorias([])
    setCategorias('')
  }
  function handleOpenLogar(){
    setOpenLogar(true);
  }
  function handleCloseLogar(){
    setOpenLogar(false);
  }
  function handleOpenEditPost(key){
    setOpenEditPost(true);
    setPostFrontKey(key+1)
  }
  function handleCloseEditPost(){
    setOpenEditPost(false);
    setPostChoose('')
  }
  function handleChange(event){
    setPostChoose(event.target.value)
    for(let t = 0;t<postsRecentes.length;t++){
      if(postsRecentes[t].titulo == event.target.value){
        setPostChooseInfo(postsRecentes[t])
      }
    }
  };
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
          let aux = JSON.parse(localStorage.getItem('url'))
           aux.push(url)
           localStorage.setItem('url',JSON.stringify(aux))
         }));
       })
    }
  }
  function handleMainTitulo(e){
    setMainTitulo(e.target.value)
  }
  function handleCategoria(e){
    setCategoria(e.target.value)
  }
  async function enviar(){
    if(postagemInfo.length==0){
      alert("Escreva algo")
    }
    else if(image.length<1 ||mainImage == null){
      alert("selecione as imagens")
    }
    else if(categorias.length===0){
      alert("Escreva uma categoria")
    }
    else{
      const uerielis = JSON.parse(localStorage.getItem('url'))
      const objTitulos = {}
      const objFotos = {}
       const objTextos = {}
       for(let i = 0; i<postagemInfo.length; i++){
        objTitulos[`titulo${i+1}`] = postagemInfo[i].titulo
        objTextos[`texto${i+1}`] = postagemInfo[i].texto
        objFotos[`foto${i+1}`] = uerielis[i]
       }
       var newKeyPost = (await firebase.database().ref(`posts/feed/`).child("feed").push()).key;
       var updates = {}
       updates[`/posts/feed/`+ newKeyPost] = {titulo:mainTitutlo,imagem:urlMainImage,id:newKeyPost,sinopse:sinopse,fotos:objFotos,titulos:objTitulos,textos:objTextos}
       await firebase.database().ref().update(updates)
    let vetorPostsFeedID = []
        await firebase.database().ref(`posts/categorias`).once('value').then(function(snapshot){
            Object.keys(snapshot.val()).forEach(function(postFeed){
                vetorPostsFeedID.push(postFeed)
            })
        })
        let auxCategoria = []
        for(let t = 0; t<categorias.length;t++){
          auxCategoria.push({nome:categorias[t],existe:false})
        }
        for(let i = 0; i<auxCategoria.length;i++){
          let achou = false
          for(let x=0;x<vetorPostsFeedID.length;x++){
            if(auxCategoria[i].nome == vetorPostsFeedID[x]){
              achou = true
              console.log("entrou if")
              var upar = {}
              upar[`/posts/categorias/${auxCategoria[i].nome}/`+ mainTitutlo] = {titulo:mainTitutlo,imagem:urlMainImage,id:mainTitutlo,sinopse:sinopse,fotos:objFotos,titulos:objTitulos,textos:objTextos}
              await firebase.database().ref().update(upar)
            }
          }
          if(achou===false){
            console.log("else")
            var upar = {}
            upar[`/posts/categorias/${auxCategoria[i].nome}/`+ mainTitutlo] = {titulo:mainTitutlo,imagem:urlMainImage,id:mainTitutlo,sinopse:sinopse,fotos:objFotos,titulos:objTitulos,textos:objTextos}
            await firebase.database().ref().update(upar)
          }
        }
       window.location.reload()
    }
  }

  function salvarPostagem(postagem,secoes,titulo,texto){
      if(titulo.length<2 || texto.length<2){
        alert("Escreva algo para salvar")
      }else{
        setProgress(0)
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
    
    <div className='body' >
      <MenuBar logar={handleLogar}/>
      <div className="page">
        <div><CatPosts posts={postsRecentes} openModal={handleOpenEditPost}/></div> 
        <ReviewsRecentes posts={postsRecentes} openModal={handleOpen}/>
        
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
          <div className={classes.modal}>
            <div id='modalStyle'>
              <h1>Imagem do card/carrossel</h1>
              <ImageUpload direct={true} func={salvarMainImagem}/> 
              <img src={urlMainImage} width="100px" height="100px" style={{margin:'2%'}} />
              <progress value={progressMainImage} max="40"/>
              <h1 style={{marginTop:'3%'}} >Título do card/carrossel</h1>
              <input onChange={handleMainTitulo} placeholder='Título do card/carrossel' 
              style={{height:'60px',width:'60%',fontSize:'20px',padding:'1%'}} 
              maxLength='30'/>
              <h1 style={{marginTop:'3%'}} >Categorias</h1>
              <input onChange={handleCategoria} placeholder='Nome da categoria' 
              style={{height:'60px',width:'60%',fontSize:'20px',padding:'1%'}} 
              maxLength='30'/>
              {categorias.map((categoria,key)=>(
                <p key={key}>{categoria}</p>
              ))}
              <button onClick={()=>{
                let aux = [...categorias]
                aux.push(categoria)
                setCategoria('')
                setCategorias(aux)
              }}>Adicionar</button>
              <h1 style={{marginTop:'3%'}} >Sinopse do card/carrossel</h1>
              <textarea onChange={e=>setSinopse(e.target.value)} placeholder='Sinopse do card/carrossel' 
              style={{height:'70px',width:'60%',fontSize:'20px',resize:'none',padding:'1%'}} 
              maxLength='180' />
            
            {vetorSecoes.map((secao,key)=>(
              <div key={key}>
                {secao}
            </div>
            ))}
            <progress value={progress} max="100"/>
            <button onClick={()=>enviar()}>Enviar</button>
            </div>
          </div>
      </Modal>
      <Modal
        open={openLogar}
        onClose={handleCloseLogar}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.modal}>
          <div id='modalLogin'>
            <input onChange={e=>setUsername(e.target.value)} placeholder="Username"/>
            <input onChange={e=>setSenha(e.target.value)}  type='password' placeholder="Senha"/>
            <button onClick={()=>{
              if(username === 'editor' && senha === 'logar'){
              localStorage.setItem("logado","logado") 
              handleCloseLogar()
              }
            }}>Confimar</button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openEditPost}
        onClose={handleCloseEditPost}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.modalEditPost}>
        <FormControl style={{width:"80%"}}>
        <InputLabel htmlFor='postChoose-native-simple'>Escolha um Post</InputLabel>
        <Select
          native
          value={postChoose}
          onChange={handleChange}
          inputProps={{
            name: 'postChoose',
            id: 'postChoose-native-simple',
          }}
        >
        <option aria-label="None" value="" />
        {postsRecentes.map((post,key)=>(
          <option key={key} aria-label="None" value={post.titulo}>{post.titulo}</option>
        ))}
        </Select>
      </FormControl>
        <button onClick={async()=>(
          await firebase.database().ref(`posts/postsFront/postFront${postFrontKey}`).set({
            fotos: postChooseInfo.fotos,
            imagem:postChooseInfo.imagem,
            sinopse:postChooseInfo.sinopse,
            textos:postChooseInfo.textos,
            titulos:postChooseInfo.titulos,
            titulo:postChooseInfo.titulo
          }).then(handleCloseEditPost())
         
        )}>Modificar</button>
          
        </div>
      </Modal>
    </div>
  );
}

// handle change dinamico
/* const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };*/