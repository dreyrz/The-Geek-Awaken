import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import Banner from "./components/banner"


function App() {
  return (
    <div>
        <Banner/>
        <MenuBar/>
        <div style={{marginTop:"5%"}}><CatPosts/></div>
        <div style={{marginTop:"5%"}}><h2>Reviews Recentes:</h2></div>
    </div>
  );
}

export default App;
