import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import ImageUploadComponent from "./imageUpload"

export default function EditorTexto(props){
const [salvo, setSalvo] = React.useState(false)
const [image, setImage] = React.useState(null)
const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty(),);
const [editorStateTexto, setEditorStateTexto] = React.useState(() => EditorState.createEmpty(),);
const blocksTitulo = convertToRaw(editorState.getCurrentContent()).blocks;
const tituloValue = blocksTitulo.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
const blocksTexto = convertToRaw(editorStateTexto.getCurrentContent()).blocks;
const textoValue = blocksTexto.map(block => (!block.text.trim() && '\n') || block.text).join('\n');


function toggleInlineStyle(inlineStyle) {
    setEditorStateTexto(RichUtils.toggleInlineStyle(editorStateTexto, inlineStyle));
}
function handleChange(e){
  if(e.target.files[0]){
      const imagem = e.target.files[0]
      setImage(imagem)
  }
}
function handleImageNew(){
  props.sendImage(image, props.images)
}
function toggleBlockTypeStyle(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
}
function salvar(){
    props.salvar(props.postagemInfo,props.secoes === undefined ? "init":props.secoes,tituloValue,textoValue)
    tituloValue.length<2 ? setSalvo(false):setSalvo(true)
    textoValue.length<2 ? setSalvo(false):setSalvo(true)
}
const body = (
    <div className="editor-container" >
      <h1 style={{marginBottom:'3%'}}>Post</h1>
      <div>
          <button onClick={()=>toggleBlockTypeStyle("header-one")}>Título Grande</button>
          <button onClick={()=>toggleBlockTypeStyle("header-three")}>Título Medio</button>
          <button onClick={()=>toggleBlockTypeStyle("header-five")}>Título Pequeno</button>
      </div>
      <div>
          <Editor
            placeholder="Título"
            editorState={editorState}
            onChange={setEditorState} id='editorTitulo' />
      </div>
      <div>
          {//<ImageUploadComponent url={props.url} images={props.images} sendImage={props.sendImage}/>}
          }
        <div>
          <input type="file" onChange={handleChange} style={{marginTop:'1%'}} />
          <button onClick={handleImageNew}>Enviar</button>
          <br/>
        </div>
      </div>
      <div style={{marginTop:'3%'}} >
          <button onClick={()=>toggleInlineStyle("BOLD")}>Bold</button>
          <button onClick={()=>toggleInlineStyle("ITALIC")}>Italico</button>
          <button onClick={()=>toggleInlineStyle("UNDERLINE")}>Sublinhar</button>
          <Editor 
            placeholder="Texto"
            editorState={editorStateTexto}
            onChange={setEditorStateTexto} />
      </div>
        <button
            style={{
              marginLeft:'12%',border:'0',backgroundColor:'#5c5c5c',color:'white',
              width:'16%',height:'40px', borderRadius:'4px',
              display: salvo === false? "block":"none"
            }} 
            onClick={()=>salvar()}>Salvar Seção
        </button>
    </div>
  );
return body

}