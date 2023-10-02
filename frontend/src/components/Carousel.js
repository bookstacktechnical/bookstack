import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/dkupt2kgy/image/upload/v1694199906/ajit4533_Disney_cartoon_of_a_scrapbook_with_a_leaf_pasted_in_it_2f9b30f6-5140-465d-be02-736fd657bf61_gshe2t.png" alt="Image 1" />
        </div>
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/dkupt2kgy/image/upload/v1694199618/leaf_ljd4ki.png" alt="Image 2" />
        </div>
        <div className="carousel-item">
          <img src="https://res.cloudinary.com/dkupt2kgy/image/upload/v1694197304/mrwind_h8afao.png" alt="Image 3" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;
