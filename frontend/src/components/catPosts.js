import React from 'react'
import "./styles.css"
import imagem from "../assets/WhatsApp Image 2020-05-29 at 17.22.47.jpeg"

export default function CatPosts(props){
    const vetorCats = [{image:imagem,title:'THE GOD OF HIGH SCHOOL',id:"imagem1"},
                        {image:imagem,title:'THE GOD OF HIGH SCHOOL',id:"imagem2"},
                        {image:imagem,title:'THE GOD OF HIGH SCHOOL',id:"imagem3"},
                        {image:imagem,title:'THE GOD OF HIGH SCHOOL',id:"imagem4"}]

    function handleClick(id){
        window.location=`/post?id=${id}`
    }

    return(
        <div className="container">
            {vetorCats.map((cat,key)=>(
                <div onClick={()=>handleClick(cat.id)} className="cats" key={key}>
                    <img className="image" src={cat.image}/>
                    <div className="title"><h3>{cat.title}</h3></div>
                </div>
            ))}
        </div>
    )
}