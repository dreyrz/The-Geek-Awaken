import React from 'react'
import ImageIcon from '@material-ui/icons/Image';

export default function ImageUploadComponent(props){
    const [image, setImage] = React.useState(null)
    const [url, setUrl] = React.useState('')

    function handleChange(e){
        if(e.target.files[0]){
            const imagem = e.target.files[0]
            setImage(imagem)
        }
    }
    function handleUpload(){
       /*const uploadTask = firebase.storage().ref(`${image.name}`).put(image)
       uploadTask.on('state_changed',(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
            setProgress(progress)
        },(error)=>{
           console.log(error)
       },()=>{
           firebase.storage().ref().child(image.name).getDownloadURL().then(url=>setUrl(url))
       })*/
       if(props.direct){
        props.func(image,url)

       }
       else{
        props.sendImage(image,url,props.images)

       }
    }

    return(
        <div style={{float:'left', display:'flex',flexDirection:'column',marginTop:'2.5%',marginLeft:'30%'}}>
            <label style={{cursor:'pointer'}} >
                <input id='inputImage' type="file" multiple onChange={handleChange}/>
                <ImageIcon style={{fontSize:'45'}} />
            </label>
            
            <button onClick={()=>handleUpload()}>Enviar</button>
        </div>
        
    )
}