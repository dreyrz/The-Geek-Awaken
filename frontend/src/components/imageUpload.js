import React from 'react'

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
        <div>
            <input type="file" onChange={handleChange}/>
            <button onClick={()=>handleUpload()}>Enviar</button>
            <br/>
        </div>
    )
}