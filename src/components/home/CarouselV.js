import ReactPlayer from 'react-player'
import Carousel from "react-bootstrap/Carousel";
// import Carrusel0 from "../../Assets/Intro.mp4";

export const CarouselV = () => {
  return (
    <Carousel controls={false} className="mt-4" >
      <Carousel.Item  >
      <div>
        <ReactPlayer
          url="https://youtu.be/brj2QkrjInY"
          className='react-player'
          playing
          loop={true}
          volume={0.1}
          controls={true}
        />
      </div>             
      </Carousel.Item>
    </Carousel>
  );
};
