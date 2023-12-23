import React from 'react';
import Card from '../components/Card/Card';
import Slider from '../components/Slider/Slider';
// Array of image objects for the slider
const sliderImages = [
  { src: 'path-to-your-image1.png', alt: 'Description of image 1' },
  { src: 'path-to-your-image2.png', alt: 'Description of image 2' },
  { src: 'path-to-your-image3.png', alt: 'Description of image 3' },
  { src: 'path-to-your-image3.png', alt: 'Description of image 4' },
  // Add more images as needed
];

const Home = () => {
    return(
      <div>
        <Slider images={sliderImages} />
          <div className="card-container">
            <Card title="Card Title 1" content="Content for card 1" />
            <Card title="Card Title 2" content="Content for card 2" />
            <Card title="Card Title 2" content="Content for card 3" />
            <Card title="Card Title 2" content="Content for card 4" />
            {/* More cards as needed */}
          </div>
      </div>
    );
  };
  
export default Home;