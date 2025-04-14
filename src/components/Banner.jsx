import Carousel from 'react-bootstrap/Carousel';
import '../assets/css/Banner.css';

// Importa las imágenes directamente
import banner1 from '../assets/img/Fade_banner/Banner_1.png';
import banner2 from '../assets/img/Fade_banner/Banner_2.jpg';
import banner3 from '../assets/img/Fade_banner/Banner_3.png';

function Banner() {
  return (
    <Carousel className="banner-carousel" interval={2000} indicators={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="Fashion collection"
        />
        {/* Eliminar o comentar el caption si solo quieres mostrar imágenes */}
        {/* <Carousel.Caption className="text-left">
          <div className="banner-content">
            <div className="new-arrival">
              <div className="yellow-bar"></div>
              <span>NEW</span>
            </div>
            <h1>ARRIVAL FASHION WOMEN</h1>
            <p>BLAZER FOR WOMEN</p>
            <div className="banner-date">21/01/2029</div>
            <div className="discount-badge">50% OFF</div>
          </div>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Summer collection"
        />
        {/* Eliminar o comentar el caption si solo quieres mostrar imágenes */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner3}
          alt="Winter essentials"
        />
        {/* Eliminar o comentar el caption si solo quieres mostrar imágenes */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;