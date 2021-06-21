import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' 
import { Carousel } from 'react-responsive-carousel'


function AboutPopup() {


  return (
    <>
      <Carousel>
        <div className="carousel-div" id="pop-up">
          <img src="https://i.imgur.com/UsKJU4G.jpg" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img  src="https://i.imgur.com/2P8aKJc.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img  src="https://i.imgur.com/auf8L04.jpg" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
    </>
  )
}


export default AboutPopup