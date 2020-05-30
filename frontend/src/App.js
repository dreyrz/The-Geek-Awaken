import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"

function App() {
  return (
    <div>
        <MenuBar/>
        <div style={{marginTop:"5%"}}><CatPosts/></div>
        <div style={{marginTop:"5%"}}><h2>Reviews Recentes:</h2></div>
    </div>
  );
}

export default App;
