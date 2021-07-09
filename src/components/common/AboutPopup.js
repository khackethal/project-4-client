import 'react-responsive-carousel/lib/styles/carousel.min.css' 
import { Carousel } from 'react-responsive-carousel'


function AboutPopup() {


  return (
    <>
      <Carousel>
        <div>
          <img src="https://i.imgur.com/UsKJU4G.jpg" />
        </div>
        <div>
          <img  src="https://i.imgur.com/2P8aKJc.jpg" />
        </div>
        <div>
          <img  src="https://i.imgur.com/auf8L04.jpg" />
        </div>
      </Carousel>
    </>
  )
}


export default AboutPopup