import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { img_500 } from './Config';
import { NavLink } from "react-router-dom";
import { settings } from "../Services/Settings";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import { useState } from "react";

const TopRatedMovie = () => {
  const {data, error, isLoading} = useTopRatedMovie()
  const [isHovered, setIsHovered] = useState(false);

  if(isLoading) return <p>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </p>

  if(error) return <p>{error.message}</p>;


const handleHover = (backDropPath: string) => {
    const othersElement = document.querySelector('.others-two')as HTMLDivElement
    if (othersElement) {
        othersElement.style.backgroundImage = `url(${img_500 + backDropPath})`;
        setIsHovered(true)
    }
}

const handleLeave = () => {
    const othersElement = document.querySelector('.others-two')as HTMLDivElement
    if (othersElement) {
        othersElement.style.backgroundImage = ''
        setIsHovered(false)
    }
};

  return (
    <>
        <div className={`others-two ${isHovered ? 'hovered' : ''}`}>
          <div className="d-flex justify-content-between align-items-center gap-5 width-80">
            <h1 className=" text-white fw-800 mb-3 title-space">Top Rated Movies </h1>
            <NavLink to='/topratedmovies'>
              <p className="text-white fs-4 text-nowrap title-para">See all</p>
            </NavLink>
          </div>
          <Slider {...settings} className="whole-slider"> 
            {data.results.map((i) => (
              <div key={i.id} className='slider'>
                <img src={img_500 + i.backdrop_path} alt={i.name || i.name} onMouseEnter={() => handleHover(i.backdrop_path)} onMouseLeave={handleLeave}/>
              </div>
            ))}
          </Slider>
        </div>
    </>         
  )
}

export default TopRatedMovie;