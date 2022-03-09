import ReactPlayer from 'react-player'
import Carousel from "react-bootstrap/Carousel";
import Carrusel0 from "../../Assets/Intro.mp4";

export const CarouselV = () => {
  return (
    <Carousel controls={false} className="mt-4" >
      <Carousel.Item  >
      <div>
        <ReactPlayer
          url={Carrusel0}          
          className='react-player'
          playing={true}
          volume={0.05}
          width='100%'
          height='100%'
          controls={true}
        />
      </div>             
      </Carousel.Item>
    </Carousel>
  );
};
