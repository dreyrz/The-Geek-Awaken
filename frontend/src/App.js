import React from 'react';
import MenuBar from "./components/menuBar"
import CatPosts from "./components/catPosts"
import Banner from "./components/banner"
import ReviewsRecentes from './components/reviewsR'

function App() {
  return (
    
    <div className='body'>
      <Banner/>
      <MenuBar/>
      <div className="page">
        <div style={{marginTop:"5%"}}><CatPosts/></div> 
          <ReviewsRecentes/>
      </div>
    </div>
  );
}

export default App;
