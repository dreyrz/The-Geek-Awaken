import React from 'react';

import Banner from "./components/banner"
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import ReviewsRecentes from './components/reviewsR'

function App() {
  return (
    
    <div className='body'      >
      
      <Banner/>
      <MenuBar/>
      <div className="page">
        <div style={{marginTop:"1%"}}><CatPosts/></div> 
        <div>
          <ReviewsRecentes/>
        </div>
      </div>
    </div>
  );
}

export default App;
