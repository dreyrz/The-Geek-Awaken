import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import Banner from "./components/banner"
import firebase from "./firebase"
import ReviewsRecentes from './components/reviewsR'

function App() {
  return (
    <div>
        <Banner/>
        <MenuBar/>
        <div style={{marginTop:"5%"}}><CatPosts banco={firebase}/></div>
        <div><ReviewsRecentes/></div>
    </div>
  );
}

export default App;
