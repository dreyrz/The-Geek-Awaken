import React from 'react';

import Banner from "./components/banner"
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import ReviewsRecentes from './components/reviewsR'

function App() {
  return (
    <div>
        <Banner/>
        <MenuBar/>
        <div style={{marginTop:"5%"}}><CatPosts/></div>
        <div style={{marginTop:"5%"}}>
            <h2>Reviews Recentes</h2>
        </div>
        <div style={{marginTop:"5%"}}>
          <ReviewsRecentes/>
        </div>
    </div>
  );
}

export default App;
